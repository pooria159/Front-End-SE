import LoginForm from '../components/Loginform';
import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent, waitFor, getByRole,screen, getAllByText, getByDisplayValue } from '@testing-library/react';
import { useLogin } from '../hooks/useLogin';



test('renders login form correctly', () => {
  render(<BrowserRouter><LoginForm /></BrowserRouter>);

  expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
});

test('updates email and password state on input change', () => {
  render(<BrowserRouter><LoginForm /></BrowserRouter>);

  fireEvent.change(screen.getByLabelText(/email address/i), {
    target: { value: 'test@example.com' },
  });
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: 'password123' },
  });

  expect(screen.getByLabelText(/email address/i).value).toBe('test@example.com');
  expect(screen.getByLabelText(/password/i).value).toBe('password123');
});

test('displays error message for empty password field', async () => {
  render(<BrowserRouter><LoginForm /></BrowserRouter>);


  // Do not enter anything in the password field
  fireEvent.change(screen.getByLabelText(/email address/i), {
    target: { value: 'test@example.com' },
  });
  const signInButton = getByRole('button', { name: /Sign in/i, type: 'submit' });
  fireEvent.click(signInButton);

  const errorMessage = await screen.findByText(/please fill out this field./i);
  expect(errorMessage).toBeInTheDocument();
});




