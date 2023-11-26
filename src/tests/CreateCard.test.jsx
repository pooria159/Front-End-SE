import CreateCardForm from '../components/ CreateCardForm';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { getByRole, getAllByText, getByDisplayValue } from '@testing-library/react';
import { button } from '@material-tailwind/react';


vi.mock('../hooks/useCreateCard');
vi.mock('react-toastify');

describe('CreateCardForm component', () => {
  test('renders CreateCardForm component correctly', () => {
    render(<BrowserRouter><CreateCardForm /></BrowserRouter>);
  });

test('updates form data state on description change', () => {
    render(<BrowserRouter><CreateCardForm /></BrowserRouter>);

    fireEvent.change(screen.getByLabelText(/Description/i), {
      target: { value: 'Test description' },
    });
    expect(screen.getByLabelText(/Description/i).value).toBe('Test description');
  
  });

});

    // The form renders correctly with all the required fields.
    it('should render form with all required fields', () => {
      // render(<CreateCardForm />);
      render(<BrowserRouter><CreateCardForm /></BrowserRouter>);
      expect(screen.getByText(/Country/i)).toBeInTheDocument();
      expect(screen.getByText(/State/i)).toBeInTheDocument();
      expect(screen.getByText(/City/i)).toBeInTheDocument();
      expect(screen.getByText(/Description/i)).toBeInTheDocument();
      expect(screen.getByText(/Start Date/i)).toBeInTheDocument();
      expect(screen.getByText(/End Date/i)).toBeInTheDocument();
      expect(screen.getByText(/TravelersCount/i)).toBeInTheDocument();
      expect(screen.getByText(/Preferred Languages/i)).toBeInTheDocument();
      // expect(button.getByText(/Create/i)).toBeInTheDocument();
      const createButton = screen.getByRole('button', { name: /Create/i });
      // Assert that the button is in the document
      expect(createButton).toBeInTheDocument();
    });

    // Submitting the form without filling in all required fields displays an error message.
    // it('should display error message when submitting form without filling in all required fields', () => {
    //   render(<BrowserRouter><CreateCardForm /></BrowserRouter>);
    //   render(<CreateCardForm />);
    //   const createButton = screen.getByRole('button', { name: /Create/i });
    //   fireEvent.click(createButton);
    //   expect(toast.error).toHaveBeenCalledWith('Please fill in all required fields.', {
    //     position: toast.POSITION.TOP_LEFT,
    //   });
    // });

