import { ProjectType, TaskType } from '../../types/types';
import React, { useState, useEffect, useContext } from 'react';
import { Project } from './project';
import { deleteProject } from '../../services/api-service';
import { TimelineBox } from '../timeline/timeline';
import FilterByDate from '../dashboard/filter-by-date';
import { ProjectsContext } from '../../context/project-context';

const ProjectDashboard: React.FC = () => {
	const [projectModal, setProjectModal] = useState<boolean>(false);
	const [clickedProject, setClickedProject] = useState<ProjectType | null>(
		null
	);
	const [showOption, setShowOption] = useState<boolean>(false);
	const { projects, setProjects } = useContext(ProjectsContext);

	useEffect(() => {}, [projects]);

	const handleProjectClick = (project: ProjectType) => {
		setProjectModal(!projectModal);
		setClickedProject(project);
	};

	const handleDeleteClick = async (id: string) => {
		const projectToDelete = projects.find((project) => project.id === id);
		if (projectToDelete) {
			setProjects(projects.filter((project) => project.id !== id));
			await deleteProject(projectToDelete);
		}
	};

	return (
		<div className="main grid grid-cols-12 w-full h-full">
			<div className="Dashboard bg-white/60 rounded-3xl shadow-lg p-5 col-span-9 ml-5 h-fit">
				<div className="info">
					<div className="dashboard-header flex justify-between gap-10 mb-5">
						<h1 className="text-2xl font-semibold text-gray-800">Projects</h1>
						<FilterByDate
							setShowingProjects={setProjects}
							projects={projects}
						/>
					</div>
					<button
						onClick={() => setShowOption(!showOption)}
						className="mb-2 text-m font-semibold text-gray-900"
					>
						{showOption ? '☝️ Show less' : '👉 Show more'}
					</button>
				</div>
				<div
					className={`main-dashboard grid xl:grid-cols-4 overflow-hidden lg:grid-cols-3 md:grid-cols-2 sm-grid-cols-1 gap-5`}
					style={{
						height: showOption ? '300px' : '230px',
						transition: 'height 0.5s ease-out',
					}}
				>
					{projects.length ? (
						projects.map((project) => (
							<Project
								key={project.id}
								project={project}
								onProjectClick={() => handleProjectClick(project)}
								handleDeleteClick={() => handleDeleteClick(project.id)}
							/>
						))
					) : (
						<div className="flex justify-center w-full">
							<p>No projects here</p>
						</div>
					)}
				</div>
			</div>
			<div className="col-span-3 mr-5">
				<TimelineBox projects={projects} />
			</div>
		</div>
	);
};

export default ProjectDashboard;
