import CreateCardForm from '../components/ CreateCardForm';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

vi.mock('../hooks/useCreateCard');
vi.mock('react-toastify');

describe('CreateCardForm component', () => {
  test('renders CreateCardForm component correctly', () => {
    render(<BrowserRouter><CreateCardForm /></BrowserRouter>);
  });

test('updates form data state on description change', () => {
    render(<BrowserRouter><CreateCardForm /></BrowserRouter>);
q
    fireEvent.change(screen.getByLabelText(/Description/i), {
      target: { value: 'Test description' },
    });
    expect(screen.getByLabelText(/Description/i).value).toBe('Test description');

    // fireEvent.change(screen.getByLabelText(/Start Date/i), {
    //     target: { value: '2023-12-01' },
    //   });
    
    //   // Check if the Start Date field value has been updated
    //   expect(screen.getByLabelText(/Start Date/i).value).toBe('2023-12-01');
    
  
  });
  

//   test('displays error message when required fields are not filled', () => {
//     render(<BrowserRouter><CreateCardForm /></BrowserRouter>);

//     const submitButton = screen.getByText(/Create!/i);
//     fireEvent.click(submitButton);

//     expect(screen.getByText(/Please fill in all required fields/i)).toBeInTheDocument();
//   });

//   test('submits the form correctly', async () => {
//     const mockedUseCreateCard = useCreateCard as jest.MockedFunction<typeof useCreateCard>;
//     mockedUseCreateCard.mockResolvedValue({ status: 200, data: { message: 'Card created successfully!' } });

//     render(<BrowserRouter><CreateCardForm /></BrowserRouter>);

//     // Populate form data
//     fireEvent.change(screen.getByLabelText(/Description/i), {
//       target: { value: 'Test description' },
//     });
//     // Add similar fireEvent.change calls for other input fields

//     const submitButton = screen.getByText(/Create!/i);
//     fireEvent.click(submitButton);

//     // You might want to wait for the asynchronous operation to complete
//     await waitFor(() => {
//       expect(mockedUseCreateCard).toHaveBeenCalledWith(/* expected form data */);
//       // Add more assertions based on your component behavior
//     });
//   });
});
