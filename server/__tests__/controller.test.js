import {getDataFromAPI, postProject, getProjects, deleteProject, setAsCompleted} from '../controllers/controller';
const request = require('supertest');
import router from '../router';

test('two plus two is four', () => {
  expect(2 + 2).toBe(4);
});

describe('Test the /projects endpoint', () => {
  test('It should test GET /projects', async () => {
    const response = await request(router).get('/projects');
    console.log(response);
    // expect(response.statusCode).toBe(200);
  });
});

