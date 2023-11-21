import {getDataFromAPI, postProject, getProjects, deleteProject, setAsCompleted} from '../controllers/controller';
const request = require('supertest');
import mongoose from 'mongoose';
// Creating a new router???
import express from 'express';
const app = express();
const router = express.Router();
// Defining the routes??? (copy paste from controller)
// For some reason this works
router.post('/breakdown', getDataFromAPI);
router.post('/projects', postProject);
router.get('/projects', getProjects);
router.delete('/projects', deleteProject);
router.put('/projects', setAsCompleted);

beforeAll(async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
});
afterAll(async () => {
 await mongoose.connection.close();
});

describe('/projects endpoint', () => {
  it('It should GET /projects', async () => {
    const response = await request(app.use(router)).get('/projects');
    expect(response.statusCode).toBe(201);
  });
  it('It should POST a new project', async () => {
    const response = await request(app.use(router)).post('/projects');
    expect(response.statusCode).toBe(201);
  })
});

