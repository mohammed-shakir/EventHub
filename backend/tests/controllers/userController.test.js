const request = require('supertest');
const app = require('../../server');

jest.mock('../../src/utils/database', () => ({
    query: jest.fn().mockImplementation((query, values) => {
        if (query.includes('INSERT INTO Users')) {
            return Promise.resolve({ rows: [{ user_id: 1 }], rowCount: 1 });
        }
        return Promise.resolve({ rows: [], rowCount: 0 });
    }),
}));

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
});
