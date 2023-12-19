const request = require('supertest');
const app = require('../../server');
const pool = require('../../src/utils/database');
const bcrypt = require('bcryptjs');

jest.mock('../../src/utils/database', () => ({
    query: jest.fn().mockImplementation((query, values) => {
        if (query.includes('INSERT INTO Users')) {
            return Promise.resolve({ rows: [{ user_id: 1 }], rowCount: 1 });
        }
        return Promise.resolve({ rows: [], rowCount: 0 });
    }),
}));

jest.mock('bcryptjs', () => ({
    ...jest.requireActual('bcryptjs'),
    compare: jest.fn().mockResolvedValue(true),
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

describe('POST /api/users/login', () => {
    it('should log in a user successfully', async () => {
        pool.query.mockResolvedValueOnce({
            rows: [{ user_id: 1, password: 'hashedPassword' }],
            rowCount: 1
        });

        const userCredentials = {
            email: 'test@example.com',
            password: 'password123'
        };

        const response = await request(app)
            .post('/api/users/login')
            .send(userCredentials);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token');
    });
});
