import React from 'react';
import { render, screen } from '@testing-library/react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { TimelineBox } from './timeline';

describe('TimelineBox Component', () => {
	it('renders a list of projects on a timeline', () => {
		const mockProjects = [
			{
				id: '1',
				project: 'Project 1',
				date: new Date('2021-01-01'),
				description: '',
				tasks: [],
			},
			{
				id: '2',
				project: 'Project 2',
				date: new Date('2021-02-01'),
				description: '',
				tasks: [],
			},
		];

		render(<TimelineBox projects={mockProjects} />);

		const firstProject = screen.getByText('Project 1');
		const secondProject = screen.getByText('Project 2');

		expect(firstProject).toBeInTheDocument();
		expect(secondProject).toBeInTheDocument();
	});
});
