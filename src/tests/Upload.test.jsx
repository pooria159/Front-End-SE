import Uploadimg from '../components/Profile/Upload';
import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent, waitFor, getByRole,screen, getAllByText, getByDisplayValue} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vitest } from 'vitest';


    test('should allow user to select up to three image files', () => {
        const { getByLabelText } = render(<Uploadimg />);
        const input = getByLabelText('Select a photo');
        fireEvent.change(input, { target: { files: [new File([], 'image1.jpg'), new File([], 'image2.jpg'), new File([], 'image3.jpg')] } });
        expect(input.files.length).toBe(3);
      });


    test('should display an error message if user tries to upload more than three photos', () => {
      const { getByLabelText, getByText } = render(<Uploadimg />);
      const input = getByLabelText('Select a photo');
      fireEvent.change(input, { target: { files: [new File([], 'image1.jpg'), new File([], 'image2.jpg'), new File([], 'image3.jpg'), new File([], 'image4.jpg')] } });
      const errorMessage = getByText('You cannot upload more than three photos');
      expect(errorMessage).toBeInTheDocument();
    });


    test('should display an error message if user tries to upload a non-image file', () => {
      const { getByLabelText, getByText } = render(<Uploadimg />);
      const input = getByLabelText('Select a photo');
      fireEvent.change(input, { target: { files: [new File([], 'document.pdf')] } });
      const errorMessage = getByText('Only pictures are acceptable');
      expect(errorMessage).toBeInTheDocument();
    });






    // test('should display multiple selected image files correctly', () => {
    //   const { getByLabelText, getAllByRole } = render(<Uploadimg />);
    //   const input = getByLabelText('Select a photo');
    //   fireEvent.change(input, { target: { files: [new File([], 'image1.jpg'), new File([], 'image2.jpg'), new File([], 'image3.jpg')] } });
    //   const images = screen.queryAllByRole('img');
    //   expect(images.length).toBe(0);
    // });