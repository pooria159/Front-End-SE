import AnncPanel from "../components/HomePage/AnncPannel";
import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent, waitFor, getByRole, screen, getAllByText, getByDisplayValue } from '@testing-library/react';


// Renders the component without crashing
it('should render the component without crashing', () => {
    render(<AnncPanel />);
});

// Displays a header with the title "Travelers' Announcements"
it('should display a header with the title "Travelers\' Announcements"', () => {
    render(<AnncPanel />);
    const header = screen.getByRole('heading', { name: "Travelers' Announcements" });
    expect(header).toBeInTheDocument();
});



