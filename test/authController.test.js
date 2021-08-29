const app = require('../app');
const request = require('supertest');

jest.mock('../controllers/authController');

beforeEach(() => {
    jest.setTimeout(60000);
})

describe('AuthController Test Suite', () => {
    // test('getSignUp Page route should return a status code of 200', async () => {
    //     let response = await request(app).get('/auth/signup');
    //     expect(response.statusCode).toBe(200)
    // })
    test('postSignUp post request should return a user with unique id', async () => {
        let user = {
            name: 'Mahir Asief',
            phone: '019898567111215',
            address: 'test addressss',
            nid: 'test nidsss',
            role: 'farmer',
            email: 'test@test1.com',
            password: 'testpasssss'
        };

        let response = await request(app).post('/auth/signup').send(user);
        console.log(response);
        let id = response.body;
        expect(id).toBe('2')
    })
})