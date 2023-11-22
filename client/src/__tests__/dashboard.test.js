import React from 'react';
import { render, screen, cleanup, fireEvent} from '@testing-library/react';
import { ProjectDashboard } from '../components/dashboard/project-dashboard';
import { TaskDashboard } from '../components/dashboard/task-dashboard';
import { FilterBy } from '../components/dashboard/filter-by-date';
import Timeline from '@mui/lab/Timeline';
import { mockProjects, noProjects } from '../__mocks__/mocks';

test('Project dashboard should render with no projects', () => {
  render(<ProjectDashboard projects={noProjects} />);
  expect(screen.getByText(/no projects/i)).toBeInTheDocument();
})

test('Project dashboard should render with displayed projects', () => {
  render(<ProjectDashboard projects={mockProjects} setProjects={jest.fn()} />);
  expect(screen.getByRole('heading', {level: 2, name: /project one/i}));
  expect(screen.getByRole('heading', {level: 2, name: /completed project/i}));
})

test('Dashboard should have the Filter dropdown', () => {
  render(<ProjectDashboard projects={noProjects} />);
  const filterSelect = screen.getByRole('option', {name: /today/i});
  expect(filterSelect).toBeInTheDocument();
})