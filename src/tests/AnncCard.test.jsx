import Card from '../components/HomePage/AnncCard';
import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent, waitFor, getByRole,screen, getAllByText, getByDisplayValue } from '@testing-library/react';

// Renders a card with the given data
it('should render a card with the given data', () => {
    // Arrange
    const data = {
        CardId: 1,
        UserUsername: "john_doe",
        NumberOfTravelers: 2,
        PreferredLanguages: ["English", "Spanish"],
        DestinationState: "California",
        DestinationCity: "Los Angeles",
        DestinationCountry: "United States",
        StartDate: "2022-01-01",
        EndDate: "2022-01-07",
        Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, urna id aliquet tincidunt, nunc nisl ultrices elit, id lacinia nunc nisl in nisi."
    };

    // Act
    render(
    <BrowserRouter>
        <Card data={data} />
    </BrowserRouter>
    );

    // Assert
    expect(screen.getByText(data.UserUsername)).toBeInTheDocument();
    expect(screen.getByText(`${data.NumberOfTravelers} Travelers`)).toBeInTheDocument();
    expect(screen.getByText("English")).toBeInTheDocument();
    expect(screen.getByText("Spanish")).toBeInTheDocument();
    expect(screen.getByText(`State: ${data.DestinationState}`)).toBeInTheDocument();
    expect(screen.getByText(`City: ${data.DestinationCity}`)).toBeInTheDocument();
    expect(screen.getByText(`Country: ${data.DestinationCountry}`)).toBeInTheDocument();
    expect(screen.getByText(`Start Date: ${data.StartDate}`)).toBeInTheDocument();
    expect(screen.getByText(`End Date: ${data.EndDate}`)).toBeInTheDocument();
    expect(screen.getByText(data.Description.substring(0, 90) + "...")).toBeInTheDocument();
});

