import MiddleSec from '../components/HomePage/MiddleSec';
import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent, waitFor, getByRole,screen, getAllByText, getByDisplayValue } from '@testing-library/react';

// journeyimg is not found in the assets folder
it('should not contain an image element with a src that is not found in the assets folder', () => {
    // Arrange
    const { container } = render(<MiddleSec />);

    // Act
    const imageElement = container.querySelector('img');

    // Assert
    expect(imageElement).toBeInTheDocument();
    expect(imageElement.src).not.toContain('sampleIMg');
});

// The function is called with no props
it('should render without error when called with no props', () => {
    // Arrange

    // Act
    const renderComponent = () => {
        render(<MiddleSec />);
    };

    // Assert
    expect(renderComponent).not.toThrow();
});