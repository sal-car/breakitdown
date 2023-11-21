import { ProjectType, TaskType } from '../types/types';

const BASE_URL = 'http://localhost:3005';

export const getBreakdown = async (project: ProjectType): Promise<any> => {
	try {
		const response = await fetch(BASE_URL + '/breakdown', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(project),
		});
		return await response.json();
	} catch (error) {
		console.error('getBreakdown: Error fetching API data from server', error);
	}
};

export const sendToServer = async (project: ProjectType): Promise<any> => {
	try {
		const response = await fetch(BASE_URL + '/projects', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(project),
		});
		return await response.json();
	} catch (error) {
		console.error('sendToServer: Error sending project to server', error);
	}
};

export const getProjectsFromServer = async (): Promise<ProjectType[]> => {
	try {
		const response = await fetch(BASE_URL + '/projects', {
			method: 'GET',
		});
		return await response.json();
	} catch (error) {
		console.error('getProjectsFromServer: Error fetching projects', error);
		return [];
	}
};

export const deleteProject = async (project: ProjectType): Promise<any> => {
	try {
		const response = await fetch(BASE_URL + '/projects', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(project),
		});
		return await response.json();
	} catch (error) {
		console.error('deleteProject: Error deleting project', error);
	}
};

export const toggleCompleted = async (task: TaskType): Promise<Response> => {
	try {
		return await fetch(BASE_URL + '/projects/toggleCompleted', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ projectId: task.parent, taskId: task.id }),
		});
	} catch (error) {
		console.error('Error in toggleCompleted:', error);
		throw error;
	}
};

export default getBreakdown;
