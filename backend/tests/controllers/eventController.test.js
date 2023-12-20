const request = require('supertest');
const app = require('../../server');
const { closeDatabase } = require('../../src/utils/database');

let token;
let eventId;

beforeAll(async () => {
    const newUser = {
        email: 'organizer@example.com',
        password: 'organizerPassword',
        first_name: 'Test',
        last_name: 'User',
        user_role: 'Organizer'
    };

    const responseRegister = await request(app)
        .post('/api/users/register')
        .send(newUser);

    expect(responseRegister.statusCode).toBe(201);

    const loginUser = {
        email: 'organizer@example.com',
        password: 'organizerPassword'
    };

    const responseLogin = await request(app)
        .post('/api/users/login')
        .send(loginUser);

    expect(responseLogin.statusCode).toBe(200);
    token = responseLogin.body.token;
});

afterAll(async () => {
    const deleteEventResponse = await request(app)
        .delete(`/api/events/${eventId}`)
        .set('Authorization', `Bearer ${token}`);
    expect(deleteEventResponse.statusCode).toBe(200);

    const deleteUserResponse = await request(app)
        .delete('/api/users/profile')
        .set('Authorization', `Bearer ${token}`);
    expect(deleteUserResponse.statusCode).toBe(200);

    await closeDatabase();
});

describe('EventController Tests', () => {
    describe('POST /api/events/addEvent', () => {
        it('should add a new event successfully', async () => {
            const newEvent = {
                title: 'Test Event',
                description: 'This is a test event',
                start_time: new Date().toISOString(),
                end_time: new Date().toISOString(),
                location: 'Test Location',
                category_id: 1
            };

            const response = await request(app)
                .post('/api/events/addEvent')
                .set('Authorization', `Bearer ${token}`)
                .send(newEvent);

            expect(response.statusCode).toBe(200);

            eventId = response.body.eventId;
            expect(eventId).toBeDefined();
        });
    });

    describe('GET /api/events', () => {
        it('should retrieve all events', async () => {
            const response = await request(app)
                .get('/api/events')
                .set('Authorization', `Bearer ${token}`);

            expect(response.statusCode).toBe(200);
            expect(Array.isArray(response.body)).toBeTruthy();
        });
    });
});