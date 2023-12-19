const request = require('supertest');
const app = require('../../server');
const pool = require('../../src/utils/database');

describe('UserController Tests', () => {
    describe('POST /api/users/register', () => {
        it('should register a new user successfully', async () => {
            const newUser = {
                email: 'test@example.com',
                password: 'password123',
                first_name: 'Test',
                last_name: 'User',
                user_role: 'Regular'
            };

            const response = await request(app)
                .post('/api/users/register')
                .send(newUser);

            expect(response.statusCode).toBe(201);
        });
    });

    describe('POST /api/users/register', () => {
        it('should register a new user unsuccessfully', async () => {
            const newUser = {
                email: 'test@example.com',
                password: 'password123',
                first_name: 'Test',
                last_name: 'User',
                user_role: 'Regular'
            };

            const response = await request(app)
                .post('/api/users/register')
                .send(newUser);

            expect(response.statusCode).toBe(409);
        });
    });

    describe('POST /api/users/login', () => {
        it('should log in the user successfully', async () => {
            const loginUser = {
                email: 'test@example.com',
                password: 'password123',
            };

            const response = await request(app)
                .post('/api/users/login')
                .send(loginUser);

            expect(response.statusCode).toBe(200);
            token = response.body.token;
        });
    });

    describe('POST /api/users/login', () => {
        it('should log in the user unsuccessfully', async () => {
            const loginUser = {
                email: 'wonrg_user@example.com',
                password: 'password123',
            };

            const response = await request(app)
                .post('/api/users/login')
                .send(loginUser);

            expect(response.statusCode).toBe(404);
        });
    });

    describe('DELETE /api/users/profile', () => {
        it('should delete the registered user', async () => {
            const response = await request(app)
                .delete('/api/users/profile')
                .set('Authorization', `Bearer ${token}`);

            expect(response.statusCode).toBe(200);
        });
    });
});
