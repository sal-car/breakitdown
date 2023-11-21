import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TaskDashboard } from './task-dashboard';
import { ProjectsContext } from '../../context/project-context';
import { Task } from './task';

jest.mock('./task', () => {
	return {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		Task: ({ task }) => <div>{task.task}</div>,
	};
});

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
			{
				id: 'task-2',
				task: 'Task 2',
				date: new Date(),
				parent: '1',
				completed: false,
			},
		],
	},
	{
		id: '2',
		project: 'Project B',
		date: new Date(),
		description: '',
		tasks: [
			{
				id: 'task-3',
				task: 'Task 3',
				date: new Date(),
				parent: '2',
				completed: false,
			},
		],
	},
];

describe('TaskDashboard Component', () => {
	it('renders tasks correctly', () => {
		render(
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			<ProjectsContext.Provider value={{ projects: mockProjects }}>
				<TaskDashboard />
			</ProjectsContext.Provider>
		);

		expect(screen.getByText('Task 1')).toBeInTheDocument();
		expect(screen.getByText('Task 2')).toBeInTheDocument();
		expect(screen.getByText('Task 3')).toBeInTheDocument();
	});

	it('filters tasks based on project selection', () => {
		render(
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			<ProjectsContext.Provider value={{ projects: mockProjects }}>
				<TaskDashboard />
			</ProjectsContext.Provider>
		);

		// simulate selecting 'Project A'
		fireEvent.change(screen.getByRole('combobox'), { target: { value: '1' } });

		expect(screen.getByText('Task 1')).toBeInTheDocument();
		expect(screen.getByText('Task 2')).toBeInTheDocument();
		expect(screen.queryByText('Task 3')).not.toBeInTheDocument();
	});

	it('displays a message when no tasks are available', () => {
		render(
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			<ProjectsContext.Provider value={{ projects: [] }}>
				<TaskDashboard />
			</ProjectsContext.Provider>
		);

		expect(screen.getByText('Woops, no tasks here!')).toBeInTheDocument();
	});
});
