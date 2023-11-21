import express from 'express';
import {
	getDataFromAPI,
	postProject,
	getProjects,
	deleteProject,
	toggleCompleted,
} from './controllers/controller.js';

const router = express.Router();

router.post('/breakdown', getDataFromAPI);
router.post('/projects', postProject);
router.get('/projects', getProjects);
router.delete('/projects', deleteProject);
router.put('/projects/toggleCompleted', toggleCompleted);
export default router;
