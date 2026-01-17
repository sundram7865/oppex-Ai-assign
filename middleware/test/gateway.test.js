import request from 'supertest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import app from '../src/server.js'; // Ensure your server.js exports 'app'

const mock = new MockAdapter(axios);

describe('Node.js Middleware Gateway Tests', () => {
    
    afterEach(() => {
        mock.reset();
    });

    test('POST /proxy/login should return 200 and a token on success', async () => {
        // Step 1: Mock the Quarkus response (Requirement 5 & 6)
        mock.onPost('http://localhost:8080/api/users/login').reply(200, {
            token: "mocked-jwt-token"
        });

        // Step 2: Test the Node Gateway endpoint
        const response = await request(app)
            .post('/proxy/login')
            .send({ email: "test@test.com", password: "password123" });

        expect(response.statusCode).toBe(200);
        expect(response.body.token).toBe("mocked-jwt-token");
    });

    test('POST /proxy/login should return 401 on failed auth', async () => {
        // Mock a 401 error from Quarkus
        mock.onPost('http://localhost:8080/api/users/login').reply(401);

        const response = await request(app)
            .post('/proxy/login')
            .send({ email: "wrong@test.com", password: "wrong" });

        expect(response.statusCode).toBe(401);
    });
});