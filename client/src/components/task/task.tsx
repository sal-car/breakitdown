import React, { useContext } from 'react';
import Checkbox from '@mui/material/Checkbox';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import moment from 'moment';
import { toggleCompleted } from '../../services/api-service';
import { ProjectsContext } from '../../context/project-context';
// import { ProjectType, TaskType } from '../types/types';

interface TaskProps {
	task: TaskType;
}

export interface TaskType {
	task: string;
	id: string;
	date: Date;
	parent: string;
	completed: boolean;
}

export interface ProjectType {
	project: string;
	date: Date;
	description: string;
	id: string;
	tasks: TaskType[];
}

export const Task: React.FC<TaskProps> = ({ task }) => {
	const { projects, setProjects } = useContext(ProjectsContext);

	const formatDate = (): JSX.Element => (
		<>
			{moment(task.date).format('hh:mm A')}
			<br />
			{moment(task.date).format('MMM, DD, YYYY')}
		</>
	);

	const getParentProject = (): ProjectType | undefined => {
		return projects.find((project) => project.id === task.parent);
	};

	const handleCheckChange = async (taskId: string): Promise<void> => {
		const parentProject = getParentProject();
		if (!parentProject) return;

		const updatedTasks = parentProject.tasks.map((t) =>
			t.id === taskId ? { ...t, completed: !t.completed } : t
		);
		const updatedProjects = projects.map((p) =>
			p.id === parentProject.id ? { ...p, tasks: updatedTasks } : p
		);
		setProjects(updatedProjects);
		await saveCompletedStatus(task);
	};

	const saveCompletedStatus = async (task: TaskType): Promise<void> => {
		try {
			await toggleCompleted(task);
		} catch (error) {
			console.error('Error saving completed status:', error);
		}
	};

	return (
		<div className="Task border rounded-lg px-1">
			<div className="top flex items-center justify-between">
				<div className="left flex items-center">
					<Checkbox
						defaultChecked={task.completed}
						onChange={() => handleCheckChange(task.id)}
						checkedIcon={<CheckCircleIcon />}
						color="success"
					/>
					<h3 className="text-gray-800 font-semibold ml-2">{task.task}</h3>
				</div>
				<p className="mr-5 font-semibold text-gray-500">{formatDate()}</p>
			</div>
			<div className="bottom ml-14 mb-1">
				<p className="text-sm text-gray-500">{getParentProject()?.project}</p>
			</div>
		</div>
	);
};
