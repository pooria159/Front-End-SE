import BlogModal from '../components/CreateBlog/BlogModal';
import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent, waitFor, getByRole,screen, getAllByText, getByDisplayValue} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vitest } from 'vitest';

// Renders a modal with a form to create a blog post when isVisible is true
it('should render a modal with a form when isVisible is true', () => {
    // Arrange
    const isVisible = true;
    const onClose = vi.fn();
    const Data = {
        CardId: 123,
    };

    // Act
    render(<BlogModal isVisible={isVisible} onClose={onClose} Data={Data} />);

    // Assert
    expect(screen.getByText('Create your own blog post')).toBeInTheDocument();
    expect(screen.getByLabelText('Title')).toBeInTheDocument();
    expect(screen.getByLabelText('About journey')).toBeInTheDocument();
});
