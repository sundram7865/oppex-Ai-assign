package com.user.portal.resource;

import com.user.portal.model.User;
import io.smallrye.jwt.build.Jwt;
import org.mindrot.jbcrypt.BCrypt;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;
import java.util.Map;

@Path("/api/users")
@Produces("application/json")
@Consumes("application/json")
public class UserResource {

    @POST
    @Path("/signup")
    @Transactional
    public Response signup(User user) {
        // Step 1: Check if user exists (Requirement: Design and cleanliness)
        User existingUser = User.find("email", user.email).firstResult();
        if (existingUser != null) {
            return Response.status(Response.Status.CONFLICT)
                    .entity(Map.of("error", "Email already used"))
                    .build();
        }

        // Step 2: Salted Hashing (Requirement 1)
        user.password = BCrypt.hashpw(user.password, BCrypt.gensalt());
        user.persist();
        
        return Response.status(201).entity(Map.of("id", user.id)).build();
    }

    @POST
    @Path("/login")
    public Response login(User credentials) {
        User user = User.find("email", credentials.email).firstResult();
        if (user != null && BCrypt.checkpw(credentials.password, user.password)) {
            String token = Jwt.issuer("https://auth-portal.com")
                .upn(user.email)
                .claim("isValidated", user.isValidated)
                .claim("userId", user.id)
                .signWithSecret("PrasunAssignmentSecretKeyForSundaram2026!");
            return Response.ok(Map.of("token", token)).build();
        }
        return Response.status(401).build();
    }

    @PATCH
    @Path("/validate/{id}")
    @Transactional
    public Response validate(@PathParam("id") Long id) {
        User user = User.findById(id);
        if (user == null) return Response.status(404).build();
        user.isValidated = true; // Email validation logic
        return Response.ok(Map.of("message", "Validated")).build();
    }
}