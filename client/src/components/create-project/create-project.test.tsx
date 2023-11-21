import React from 'react';
import { render, fireEvent } from '@testing-library/react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { CreateProject } from './create-project';

// Ceck if the user can interact with the CreateProject component
describe('CreateProject Component', () => {
	it('allows user to enter project details', () => {
		const { getByPlaceholderText } = render(
			<CreateProject toggleCreateModal={() => {}} />
		);
		const input = getByPlaceholderText("What's the goal?");

		fireEvent.change(input, { target: { value: 'New Project' } });
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		expect(input.value).toBe('New Project');
	});
});

// Check if the user can add a step to the project
describe('CreateProject Component', () => {
	it('allows user to add a step', () => {
		const { getByText } = render(
			<CreateProject toggleCreateModal={() => {}} />
		);
		const addButton = getByText('Add step');
		fireEvent.click(addButton);
	});
});

jest.mock('../../services/api-service', () => ({
	sendToServer: jest.fn(),
}));

describe('CreateProject Component', () => {
	it('submits the form correctly', () => {
		const mockToggleCreateModal = jest.fn();
		const { getByText } = render(
			<CreateProject toggleCreateModal={mockToggleCreateModal} />
		);
		const saveButton = getByText('Save');
		fireEvent.click(saveButton);
	});
});
