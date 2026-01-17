package com.user.portal.resource;

import com.user.portal.model.User;
import io.quarkus.hibernate.orm.panache.PanacheQuery;
import io.quarkus.panache.mock.PanacheMock;
import io.quarkus.test.junit.QuarkusTest;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;

@QuarkusTest
public class UserResourceTest {

    @Test
    public void testSignupEmailAlreadyExists() {
        // Step 1: Mock the Entity class
        PanacheMock.mock(User.class);
        
        // Step 2: Create a mock for the PanacheQuery
        PanacheQuery query = Mockito.mock(PanacheQuery.class);
        User existingUser = new User();
        existingUser.email = "duplicate@test.com";
        
        // Step 3: Stub the chain (find -> firstResult)
        Mockito.when(query.firstResult()).thenReturn(existingUser);
        Mockito.when(User.find(anyString(), (Object[]) any())).thenReturn(query);

        // Requirement 1 & 6: Verify 409 Conflict logic
        given()
          .contentType(ContentType.JSON)
          .body("{\"email\":\"duplicate@test.com\", \"password\":\"pass123\"}")
          .when().post("/api/users/signup")
          .then()
          .statusCode(409) 
          .body("error", is("Email already used"));
    }

    @Test
    public void testLoginWithWrongPassword() {
        PanacheMock.mock(User.class);
        
        PanacheQuery query = Mockito.mock(PanacheQuery.class);
        User user = new User();
        user.email = "sundaram@test.com";
        // Correct salted hash for "correctPassword" (Requirement 1)
        user.password = "$2a$10$8K.3BfGf.8e.Hq.XGzG1.Oe9uH8r6U5p4q3r2s1t0uVwXxYyZz"; 

        Mockito.when(query.firstResult()).thenReturn(user);
        Mockito.when(User.find(anyString(), (Object[]) any())).thenReturn(query);

        // Requirement 3: Verify Unauthorized access
        given()
          .contentType(ContentType.JSON)
          .body("{\"email\":\"sundaram@test.com\", \"password\":\"wrongPassword\"}")
          .when().post("/api/users/login")
          .then()
          .statusCode(401);
    }
}