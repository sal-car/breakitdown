import getDataFromOpenAI from '../api.js';
import { db } from '../models/index.js';

export async function getDataFromAPI(req, res) {
	// TODO check if req.body has correct format
	try {
		const data = await getDataFromOpenAI(req.body);
		console.log('getDataFromAPI controller. data', data);
		res.status(200);
		res.send(data);
	} catch (err) {
		console.log(
			'getDataFromAPI controller. Error with getting data from API: ',
			err
		);
		res.sendStatus(500);
	}
}

export async function postProject(req, res) {
	try {
		const newProject = req.body;
		//console.log('postProject controller. newProject', newProject);
		const response = await db.create(newProject);
		//console.log('postProject controller. response', response);
		res.status(201);
		res.send(response);
	} catch (err) {
		console.log('postProject controller. err', err);
		res.sendStatus(500);
	}
}

export async function getProjects(req, res) {
	try {
		const response = await db.find({});
		res.status(201);
		res.send(response);
	} catch (err) {
		console.log('getProjects', err);
		res.status(500);
	}
}

export async function deleteProject(req, res) {
	console.log(req.body);
	try {
		const response = await db.deleteOne({ id: req.body.id });
		// console.log('deleteProject controller. deleted: ', response);
		res.status(201);
		res.send(response);
	} catch (error) {
		console.log(
			'deleteProject controller. Error when deleting project from db: ',
			error
		);
	}
}

export async function toggleCompleted(req, res) {
	try {
		const { projectId, taskId } = req.body;

		const project = await db.findOne({ id: projectId });

		if (!project) {
			return res.status(404).send('Project not found');
		}

		const task = project.tasks.find((t) => t.id === taskId);
		if (task) {
			task.completed = !task.completed;
		} else {
			return res.status(404).send('Task not found');
		}

		await project.save();
		res.status(200).json(project);
	} catch (error) {
		console.error('Error toggling task completion:', error);
		res.status(500).send('Internal Server Error');
	}
}
