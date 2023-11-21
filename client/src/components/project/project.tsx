// import { ProjectType, TaskType } from '../types/types';
import React, { useEffect, useState } from 'react';

interface ProjectProps {
	project: ProjectType;
	onProjectClick: (projectId: string) => void;
	handleDeleteClick: (projectId: string) => void;
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

export const Project: React.FC<ProjectProps> = ({
	project,
	onProjectClick,
	handleDeleteClick,
}) => {
	const [progress, setProgress] = useState<string>('1%');

	useEffect(() => {
		const calculateProgress = (): string => {
			const totalTasks = project.tasks.length;
			const completedTasks = project.tasks.filter(
				(task: TaskType) => task.completed
			).length;
			return totalTasks === 0
				? '1%'
				: `${(completedTasks / totalTasks) * 100}%`;
		};

		setProgress(calculateProgress());
	}, [project]);

	const convertToTitleCase = (str: string): string => {
		return str
			? str.toLowerCase().replace(/\b\w/g, (s) => s.toUpperCase())
			: '';
	};

	const nextTask =
		project.tasks.find((task: TaskType) => !task.completed)?.task ||
		'Nothing, all done! 🌴';

	return (
		<div className="bg-white/80 shadow-md rounded-lg w-70 pb-5 h-fit">
			<div className="flex justify-between px-4 mb-3 py-0 pt-3">
				<h2 className="tracking-tight text-xl pt-3 font-medium leading-tight text-gray-800">
					{convertToTitleCase(project.project)}
				</h2>
				<button
					onClick={() => handleDeleteClick(project.id)}
					className="text-red-500 hover:text-red-700 transition-colors duration-300"
					style={{ position: 'relative', top: 0, right: 0 }}
				>
					Delete
				</button>
			</div>

			<div className="project-info px-5 flex flex-col">
				<div className={`mt-6 mb-5 ${project.tasks.length ? '' : 'hidden'}`}>
					<p className="font-xl mb-0 font-semibold tracking-wider text-gray-800">
						Next Task:
					</p>
					<p className="next-task text-gray-800 m-0">{nextTask}</p>
				</div>

				<div className={`mb-5 mt-6 ${project.description ? '' : 'hidden'}`}>
					<p className="font-xl font-semibold tracking-wider text-gray-800">
						Description
					</p>
					<p>{project.description}</p>
				</div>

				<div
					role="progressbar"
					style={{ width: progress }}
					className="bg-green-500 rounded-full h-2.5 justify-self-end"
				></div>
			</div>
		</div>
	);
};
