import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ResetPassword from '../components/ResetPasswordForm';
import { useResetPassword } from '../hooks/useResetPassword';

vi.mock('../hooks/useResetPassword');
vi.mock('react-toastify');

describe('ResetPassword component', () => {
  test('renders ResetPassword component correctly', () => {
    render(<BrowserRouter><ResetPassword /></BrowserRouter>);

    expect(screen.getByLabelText(/New Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm New Password/i)).toBeInTheDocument();
  });

  test('updates password and confirmPassword state on input change', () => {
    render(<BrowserRouter><ResetPassword /></BrowserRouter>);

    fireEvent.change(screen.getByLabelText(/New Password/i), {
      target: { value: 'newPassword123' },
    });
    fireEvent.change(screen.getByLabelText(/Confirm New Password/i), {
      target: { value: 'newPassword123' },
    });

    expect(screen.getByLabelText(/New Password/i).value).toBe('newPassword123');
    expect(screen.getByLabelText(/Confirm New Password/i).value).toBe('newPassword123');
  });

//   test('submits the form correctly', async () => {
//     const mockedUseResetPassword = useResetPassword as jest.MockedFunction<typeof useResetPassword>;
//     mockedUseResetPassword.mockResolvedValue({ data: { message: 'Password updated successfully' } });

//     render(<BrowserRouter><ResetPassword /></BrowserRouter>);

//     fireEvent.change(screen.getByLabelText(/New Password/i), {
//       target: { value: 'newPassword123' },
//     });
//     fireEvent.change(screen.getByLabelText(/Confirm New Password/i), {
//       target: { value: 'newPassword123' },
//     });

//     fireEvent.submit(screen.getByRole('button', { name: /Reset Password/i }));

//     // You might want to wait for the asynchronous operation to complete
//     await waitFor(() => {
//       expect(mockedUseResetPassword).toHaveBeenCalledWith(expect.any(String), 'newPassword123');
//       // Add more assertions based on your component behavior
//     });
//   });

test('form is not submitted when passwords do not match', () => {
    render(<BrowserRouter><ResetPassword /></BrowserRouter>);

    fireEvent.change(screen.getByLabelText(/New Password/i), {
      target: { value: 'newPassword123' },
    });
    fireEvent.change(screen.getByLabelText(/Confirm New Password/i), {
      target: { value: 'mismatchedPassword' },
    });

    const submitButton = screen.getByRole('button', { name: /Reset Password/i });
    const form = submitButton.closest('form')
    const handleSubmit = vi.spyOn(form, 'submit')
    fireEvent.click(submitButton);
    expect(handleSubmit).not.toHaveBeenCalled()

  });
});
//remaining: test when passwords do not match

