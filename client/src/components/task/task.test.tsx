import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Task } from './task';
import { ProjectsContext } from '../../context/project-context';

const mockSetProjects = jest.fn();

const mockProjects = [
	{
		id: '1',
		project: 'Project A',
		date: new Date(),
		description: '',
		tasks: [
			{
				id: 'task-1',
				task: 'Task 1',
				date: new Date(),
				parent: '1',
				completed: false,
			},
		],
	},
];

const mockTask = {
	id: 'task-1',
	task: 'Task 1',
	date: new Date(),
	parent: '1',
	completed: false,
};

describe('Task Component', () => {
	it('renders task details correctly', () => {
		render(
			<ProjectsContext.Provider
				value={{ projects: mockProjects, setProjects: mockSetProjects }}
			>
				<Task task={mockTask} />
			</ProjectsContext.Provider>
		);

		expect(screen.getByText('Task 1')).toBeInTheDocument();
		expect(screen.getByText(/AM|PM/)).toBeInTheDocument();
	});

	it('checkbox is unchecked for incomplete task', () => {
		render(
			<ProjectsContext.Provider
				value={{ projects: mockProjects, setProjects: mockSetProjects }}
			>
				<Task task={mockTask} />
			</ProjectsContext.Provider>
		);

		expect(screen.getByRole('checkbox')).not.toBeChecked();
	});

	it('calls setProjects on checkbox change', () => {
		render(
			<ProjectsContext.Provider
				value={{ projects: mockProjects, setProjects: mockSetProjects }}
			>
				<Task task={mockTask} />
			</ProjectsContext.Provider>
		);

		const checkbox = screen.getByRole('checkbox');
		fireEvent.click(checkbox);
		expect(mockSetProjects).toHaveBeenCalled();
	});

	it('renders parent project name', () => {
		render(
			<ProjectsContext.Provider
				value={{ projects: mockProjects, setProjects: mockSetProjects }}
			>
				<Task task={mockTask} />
			</ProjectsContext.Provider>
		);

		expect(screen.getByText('Project A')).toBeInTheDocument();
	});
});
