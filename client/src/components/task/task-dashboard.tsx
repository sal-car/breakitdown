import { ProjectType, TaskType } from '../../types/types';

import { useEffect, useState, useContext, ChangeEvent } from 'react';
import { Task } from './task';
import { ProjectsContext } from '../../context/project-context';

export const TaskDashboard: React.FC = () => {
	const [tasks, setTasks] = useState<TaskType[]>([]);
	const { projects } = useContext(ProjectsContext);

	useEffect(() => {
		setTasks(getTaskList());
	}, [projects]);

	const getTaskList = (): TaskType[] =>
		projects
			.filter((project) => project.tasks?.length)
			.flatMap((project) => project.tasks)
			.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

	const filterByProject = (e: ChangeEvent<HTMLSelectElement>) => {
		const selectedOption = e.target.value;
		const taskList = getTaskList();

		const filteredTasks =
			selectedOption === 'all'
				? taskList
				: taskList.filter((task) => task.parent === selectedOption);

		setTasks(filteredTasks);
	};

	return (
		<div className="TaskDashboard bg-white/60 rounded-3xl shadow-lg p-5 col-span-9 ml-5 h-fit w-2/3">
			<div className="header flex justify-between gap-10 mb-5">
				<h1 className="text-2xl font-semibold text-gray-800">Tasks</h1>
				<form>
					<select
						name="project-select"
						className="bg-white/0 font-semibold text-gray-900 rounded-lg outline-none  w-full"
						onChange={filterByProject}
					>
						<option value="all">All projects</option>
						{projects.map((project) => (
							<option key={project.id} value={project.id}>
								{project.project}{' '}
							</option>
						))}
					</select>
				</form>
			</div>
			<div className="list-dashboard flex flex-col gap-5">
				{tasks.length > 0 ? (
					tasks.map((task) => (
						<Task
							key={task.id}
							// projects={projects}
							task={task}
							// setTasks={setTasks}
							// tasks={tasks}
						/>
					))
				) : (
					<div className="flex justify-center">
						<p>Woops, no tasks here!</p>
					</div>
				)}
			</div>
		</div>
	);
};
