import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { getProjectsFromServer } from '../services/api-service';
import { ProjectType } from '../types/types';

interface ProjectsContextType {
	projects: ProjectType[];
	setProjects: React.Dispatch<React.SetStateAction<ProjectType[]>>;
}

export const ProjectsContext = createContext<ProjectsContextType>({
	projects: [],
	setProjects: () => {},
});

interface ProjectsProviderProps {
	children: ReactNode;
}

export const ProjectsProvider: React.FC<ProjectsProviderProps> = ({
	children,
}) => {
	const [projects, setProjects] = useState<ProjectType[]>([]);

	useEffect(() => {
		const fetchProjects = async () => {
			try {
				const projectsFromServer = await getProjectsFromServer();
				setProjects(projectsFromServer);
			} catch (error) {
				console.error('Failed to fetch projects', error);
			}
		};

		fetchProjects();
	}, []);

	return (
		<ProjectsContext.Provider value={{ projects, setProjects }}>
			{children}
		</ProjectsContext.Provider>
	);
};
