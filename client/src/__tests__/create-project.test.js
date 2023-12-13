import React from 'react'
import {fireEvent, render, screen, cleanup } from '@testing-library/react'
import { CreateProject } from '../components/create-project/create-project'

test('Renders Create Project modal', () => {
  render(<CreateProject />);
  expect(screen.getByText(/create project/i)).toBeInTheDocument();
  expect(screen.getByText(/deadline/i)).toBeInTheDocument();
  expect(screen.getByText(/description/i)).toBeInTheDocument();
  cleanup();
})

test('Add step button onClick should render new divs', () => {
  render(<CreateProject />);
  const addStepButton = screen.getByRole('button', {name: /add step/i})
  expect(addStepButton).toBeInTheDocument();
  fireEvent.click(addStepButton);
  expect(screen.getByPlaceholderText(/step 1/i))
  cleanup();
})