import './App.css';
import { CreateProject } from './components/create-project/create-project';
import ProjectDashboard from './components/project/project-dashboard';
import { useState, useEffect } from 'react';
import Navigation from './components/navigation/navigation';
import { TaskDashboard } from './components/task/task-dashboard';
import { getProjectsFromServer } from './services/api-service';
import { ProjectsProvider } from './context/project-context';
import { ProjectType, TaskType } from './types/types';

function App() {
	const [projects, setProjects] = useState<ProjectType[]>([]);
	const [openCreateModal, setOpenCreateModal] = useState(true);
	const [openProjectDashboard, setOpenProjectDashboard] = useState(true);
	const [openTaskDashboard, setOpenTaskDashboard] = useState(true);

	const toggleCreateModal = () => {
		setOpenCreateModal(!openCreateModal);
	};

	useEffect(() => {
		const fetchOldProjects = async () => {
			try {
				const response = await getProjectsFromServer();
				setProjects(response);
			} catch (error) {
				console.log('Error when rendering projects: ', error);
			}
		};

		fetchOldProjects();
	}, []);

	return (
		<ProjectsProvider>
			<div className="App p-0 m-0 min-h-[100vh]">
				<Navigation toggleCreateModal={toggleCreateModal} />
				{openProjectDashboard && <ProjectDashboard />}
				{openTaskDashboard && <TaskDashboard />}
				{openCreateModal && (
					<CreateProject toggleCreateModal={toggleCreateModal} />
				)}
			</div>
		</ProjectsProvider>
	);
}

export default App;
