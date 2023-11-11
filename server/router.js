import express from 'express';
import {getDataFromAPI, postProject, getProjects, deleteProject} from './controllers/controller.js'

const router = express.Router()

router.post('/breakdown', getDataFromAPI);
router.post('/projects', postProject);
router.get('/projects', getProjects);
router.delete('/projects', deleteProject)
export default router;


