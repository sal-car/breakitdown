// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
// 	render(<App />);
// 	const linkElement = screen.getByText(/learn react/i);
// 	expect(linkElement).toBeInTheDocument();
// });

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { ProjectsProvider } from './context/project-context';

jest.mock('./components/navigation/navigation', () => () => (
	<div>Navigation</div>
));

jest.mock('./services/api-service', () => ({
	getProjectsFromServer: jest.fn(() => Promise.resolve([])), // Mock empty projects array
}));

describe('App Component', () => {
	it('renders the navigation component', async () => {
		render(
			<ProjectsProvider>
				<App />
			</ProjectsProvider>
		);

		// Use waitFor to wait for any state updates or asynchronous operations
		await waitFor(() => {
			expect(screen.getByText('Navigation')).toBeInTheDocument();
		});
	});
});
