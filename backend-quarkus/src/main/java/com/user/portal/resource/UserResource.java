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
        
        User existingUser = User.find("email", user.email).firstResult();
        if (existingUser != null) {
            return Response.status(Response.Status.CONFLICT)
                    .entity(Map.of("error", "Email already used"))
                    .build();
        }

        
        user.password = BCrypt.hashpw(user.password, BCrypt.gensalt());
        user.persist();
        
        return Response.status(201).entity(Map.of("id", user.id)).build();
    }

    @POST
    @Path("/login")
    public Response login(User credentials) {
        System.out.println(credentials);
        User user = User.find("email", credentials.email).firstResult();
        if (user != null && BCrypt.checkpw(credentials.password, user.password)) {
            // Requirement 3: Include isValidated claim in JWT
            String token = Jwt.issuer("https://auth-portal.com")
                .upn(user.email)
                .claim("email", user.email) 
                .claim("isValidated", user.isValidated)
                .claim("userId", user.id)
                .signWithSecret("PrasunAssignmentSecretKeyForSundaram2026!");
            return Response.ok(Map.of("token", token)).build();
        }
        return Response.status(401).build();
    }

@PATCH
@Path("/validate-by-email/{email}")
@Consumes("*/*") // Allow requests without a specific JSON body
@Transactional
public Response validateByEmail(@PathParam("email") String email) {
    System.out.println(">>> BACKEND: Validating by Email: " + email);

    User user = User.find("email", email).firstResult();
    
    if (user == null) {
        return Response.status(404)
                       .entity(Map.of("error", "User " + email + " not found"))
                       .build();
    }

    user.isValidated = true; // Requirement 2: Validation logic
    return Response.ok(Map.of("message", "Validated")).build();
}
}