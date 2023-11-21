import React from 'react';
// import { ProjectType } from '../types/types';

interface TaskType {
	task: string;
	id: string;
	date: Date;
	parent: string;
	completed: boolean;
}

interface ProjectType {
	project: string;
	date: Date;
	description: string;
	id: string;
	tasks: TaskType[];
}

type FilterByDateProps = {
	setShowingProjects: React.Dispatch<React.SetStateAction<ProjectType[]>>;
	projects: ProjectType[];
};

const FilterByDate: React.FC<FilterByDateProps> = ({
	setShowingProjects,
	projects,
}) => {
	const filterProjects = (e: React.ChangeEvent<HTMLSelectElement>) => {
		let today = new Date();

		switch (e.target.value) {
			case 'all':
				setShowingProjects([...projects]);
				break;

			case 'today':
				const todaysProjects = projects.filter((project) => {
					return (
						new Date(project.date).getDate() === today.getDate() &&
						new Date(project.date).getMonth() === today.getMonth() &&
						new Date(project.date).getFullYear() === today.getFullYear()
					);
				});

				setShowingProjects([...todaysProjects]);
				break;

			case 'this-week':
				let week = [today];
				let counter = 1;

				for (let i = today.getDay() + 1; i <= 6; i++) {
					let nextDay = new Date(today);
					nextDay.setDate(today.getDate() + counter);
					week.push(nextDay);
					counter++;
				}

				const thisWeeksProjects = projects.filter((project) => {
					let projectDate = new Date(project.date);

					return week.some((date) => {
						return (
							projectDate.getFullYear() === date.getFullYear() &&
							projectDate.getMonth() === date.getMonth() &&
							projectDate.getDate() === date.getDate()
						);
					});
				});

				setShowingProjects([...thisWeeksProjects]);
				break;

			case 'this-month':
				const thisMonthsProjects = projects.filter((project) => {
					return (
						new Date(project.date).getMonth() === today.getMonth() &&
						new Date(project.date).getFullYear() === today.getFullYear()
					);
				});

				setShowingProjects([...thisMonthsProjects]);
				break;

			default:
				break;
		}
	};

	return (
		<form>
			<select
				className="bg-white/0 font-semibold text-gray-900 rounded-lg outline-none w-full p-3"
				onChange={filterProjects}
				name="filter"
			>
				<option value="all">All</option>
				<option value="today">Today</option>
				<option value="this-week">This week</option>
				<option value="this-month">This month</option>
			</select>
		</form>
	);
};

export default FilterByDate;
