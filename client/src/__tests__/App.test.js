import { render, screen, cleanup } from '@testing-library/react';
import React from 'react';
import App from '../App';


test('Renders the `get started` button', () => {
  render(<App />);
  const element = screen.getByText(/get started/i);
  expect(element).toBeInTheDocument();
  cleanup();
});