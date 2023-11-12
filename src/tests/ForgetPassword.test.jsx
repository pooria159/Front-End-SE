import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ForgetPassword from '../components/Forgetpasswordform';
import { useForgetPassword } from '../hooks/useForgetPassword';

vi.mock('../hooks/useForgetPassword'); // Mocking the useForgetPassword hook

describe('ForgetPassword component', () => {
  test('renders ForgetPassword component correctly', () => {
    render(<BrowserRouter><ForgetPassword /></BrowserRouter>);

    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
  });

  test('updates email state on input change', () => {
    render(<BrowserRouter><ForgetPassword /></BrowserRouter>);

    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: 'test@example.com' },
    });

    expect(screen.getByLabelText(/Email Address/i).value).toBe('test@example.com');
  });

//   test('submits the form correctly', async () => {
//     const mockedUseForgetPassword = useForgetPassword as jest.MockedFunction<typeof useForgetPassword>;
//     mockedUseForgetPassword.mockResolvedValue({ status: 200 });

//     render(<BrowserRouter><ForgetPassword /></BrowserRouter>);

//     fireEvent.change(screen.getByLabelText(/Email Address/i), {
//       target: { value: 'test@example.com' },
//     });

//     fireEvent.submit(screen.getByRole('button', { name: /Get link/i }));

//     // You might want to wait for the asynchronous operation to complete
//     await waitFor(() => {
//       expect(mockedUseForgetPassword).toHaveBeenCalledWith({ email: 'test@example.com' });
//       // Add more assertions based on your component behavior
//     });
//   });
});
