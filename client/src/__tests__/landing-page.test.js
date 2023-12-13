import React from 'react'
import {render, screen, cleanup} from '@testing-library/react'
import { LoginPage } from '../components/landing-page/login';
import { HeroSection } from '../components/landing-page/hero-section';


test('Renders Log in popup', () => {
  render(<LoginPage />);
  expect(screen.getByText(/email/i)).toBeInTheDocument();
  expect(screen.getByText(/password/i)).toBeInTheDocument();
  cleanup();
})

test('Renders background image', () => {
  render(<HeroSection />);
  expect(screen.getByTestId('splash-bg')).toBeInTheDocument();
  cleanup();
})