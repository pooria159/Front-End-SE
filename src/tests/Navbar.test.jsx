import Navbar from '../components/Navbar';
import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent, waitFor, getByRole,screen, getAllByText, getByDisplayValue } from '@testing-library/react';


// Navbar renders without errors
it('should render Navbar without errors', () => {
    render(
        <BrowserRouter>
            <Navbar />
        </BrowserRouter>
    );
    // Assert that Navbar renders without throwing any errors
    expect(screen.queryByRole('navigation')).toBeInTheDocument();
});

// Navigation links are displayed correctly
it('should display navigation links correctly', () => {
    render(
        <BrowserRouter>
            <Navbar />
        </BrowserRouter>
    );
    // Assert that all navigation links are displayed correctly
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
});