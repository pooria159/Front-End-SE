import Blog from '../components/CreateBlog/Blog';
import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent, waitFor, getByRole,screen, getAllByText, getByDisplayValue} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vitest } from 'vitest';

// Renders a form with input fields for title, cover photo, about journey, and buttons for cancel and create.
it('should render a form with input fields and buttons', () => {
    render(<Blog />);
    expect(screen.getByLabelText('Title')).toBeInTheDocument();
    expect(screen.getByLabelText('About journey')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Create' })).toBeInTheDocument();
});

// Allows user to input a title for the blog post
it('should allow user to input a title for the blog post', () => {
    render(<Blog />);
    const titleInput = screen.getByLabelText('Title');
    fireEvent.change(titleInput, { target: { value: 'Test Title' } });
    expect(titleInput.value).toBe('Test Title');
});

