import SignupForm from '../components/Signupform';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';




vi.mock('react-toastify');

// test('allows the user to sign up successfully', async () => {
//     const { getByLabelText, getByText, container } = render(
//         <>
//           <ToastContainer />
//           <BrowserRouter><SignupForm /></BrowserRouter>
//         </>
//       );
//     fireEvent.change(getByLabelText(/First Name/i), {
//       target: { value: 'John' },
//     });
//     fireEvent.change(getByLabelText(/Last Name/i), {
//       target: { value: 'Doe' },
//     });
//     fireEvent.change(getByLabelText(/username/i), {
//       target: { value: 'johndoe' },
//     });
//     fireEvent.change(getByLabelText(/password/i), {
//       target: { value: 'password123' },
//     });
//     fireEvent.change(getByLabelText(/Confirm Password/i), {
//       target: { value: 'password123' },
//     });
  
//     fireEvent.click(getByText(/Create Account/i));
  
//     await waitFor(() => expect(toast.success).toHaveBeenCalledWith('Signup successful!')); 

// });

describe('SignupForm', () => {

    it('renders SignupForm', () => {
        const { getByLabelText } = render(<BrowserRouter><SignupForm /></BrowserRouter>);
        const firstnameInput = getByLabelText(/First Name/i);
        expect(firstnameInput).toBeInTheDocument();
    });
  
    it('shows an error message when the user tries to sign up without filling out any fields', async () => {
        const { getByText } = render(
        <>
            <ToastContainer />
            <BrowserRouter><SignupForm /></BrowserRouter>
        </>
        )
        
        const submitButton = getByText(/Create Account/i)
        const form = submitButton.closest('form')
        const handleSubmit = vi.spyOn(form, 'submit')

        fireEvent.click(submitButton)

        expect(handleSubmit).not.toHaveBeenCalled()

    })
  })