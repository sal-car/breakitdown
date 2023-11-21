import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Project } from './project';

describe('Project Component', () => {
	const mockProject = {
		id: '1',
		project: 'Project Alpha',
		date: new Date('2021-01-01'),
		description: 'This is a test project',
		tasks: [
			{
				id: 't1',
				task: 'Task 1',
				date: new Date(),
				parent: '1',
				completed: true,
			},
			{
				id: 't2',
				task: 'Task 2',
				date: new Date(),
				parent: '1',
				completed: false,
			},
		],
	};

	const mockOnProjectClick = jest.fn();
	const mockHandleDeleteClick = jest.fn();

	it('renders project details', () => {
		render(
			<Project
				project={mockProject}
				onProjectClick={mockOnProjectClick}
				handleDeleteClick={mockHandleDeleteClick}
			/>
		);

		expect(screen.getByText('Project Alpha')).toBeInTheDocument();
		expect(screen.getByText('This is a test project')).toBeInTheDocument();
		expect(screen.getByText('Task 2')).toBeInTheDocument();
	});

	it('calculates and displays progress correctly', () => {
		render(
			<Project
				project={mockProject}
				onProjectClick={mockOnProjectClick}
				handleDeleteClick={mockHandleDeleteClick}
			/>
		);

		const progressBar = screen.getByRole('progressbar');
		expect(progressBar).toHaveStyle('width: 50%');
	});

	it('calls handleDeleteClick when delete button is clicked', () => {
		render(
			<Project
				project={mockProject}
				onProjectClick={mockOnProjectClick}
				handleDeleteClick={mockHandleDeleteClick}
			/>
		);

		const deleteButton = screen.getByText('Delete');
		fireEvent.click(deleteButton);
		expect(mockHandleDeleteClick).toHaveBeenCalledWith('1');
	});
});
