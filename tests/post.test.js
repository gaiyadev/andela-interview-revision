const request = require('supertest');
const connectDB = require('../database/db');
const app = require('../app');

beforeAll(async () => {
    await connectDB(); // Connect to the database before running the tests
});

describe('Posts Endpoints', () => {
    it('should get all posts', async () => {
        const res = await request(app).get('/posts')
        expect(res.status).toEqual(200);
        expect(res.body).toBeDefined();
        expect(res.body).toHaveProperty('data');
        expect(Array.isArray(res.body.data)).toBe(true);
    });

//

    it('should get one post', async () => {
        const res = await request(app).get('/posts/649f61a554ad2b878e595b6c')
        expect(res.status).toEqual(200);
        expect(res.body).toBeDefined();
        expect(res.body).toHaveProperty('data');
        expect(res.body.data).toHaveProperty('title');
        expect(res.body.data).toHaveProperty('_id');
        expect(res.body.data).toHaveProperty('body');

    });

    it('should create a new post', async () => {
        const res = await request(app)
            .post('/posts')
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QiLCJpZCI6IjY0OWY1YWFkYTdhYzY2MWVmMTE1Mjg5ZiIsImlhdCI6MTY4ODMxNTAxNn0.joc_9tBrRaiwzhzDAYnjViNkc62L8l-F3Sd4Umnzp9w')
            .send({
                title: "from testing",
                body: "testing"})
        expect(res.statusCode).toEqual(201)
        expect(res.body).toHaveProperty('data')
    })
});
