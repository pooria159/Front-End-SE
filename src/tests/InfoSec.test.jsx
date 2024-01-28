import InfoSec from '../components/Profile/InfoSec';
import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent, waitFor, getByRole,screen, getAllByText, getByDisplayValue } from '@testing-library/react';

// Renders the component with the given formData.
it('should render the component with the given formData', () => {
    // Arrange
    const formData = {
        UserName: 'JohnDoe',
        Email: 'johndoe@example.com',
        Gender: 1,
        JoiningDate: '2022-01-01',
        Country: 'USA',
        State: 'California',
        City: 'Los Angeles',
        Address: '123 Main St',
        IsSmokingAllowed: true,
        RoomNumber: '101',
        PhoneNumber: '123-456-7890',
        IsPetFriendly: false,
        IsKidFriendly: true,
        Bio: 'Lorem ipsum dolor sit amet'
    };

    // Act
    render(<InfoSec formData={formData} />);

    // Assert
    expect(screen.getByText('Username:')).toBeInTheDocument();
    expect(screen.getByText('Email:')).toBeInTheDocument();
    expect(screen.getByText('Gender:')).toBeInTheDocument();
    expect(screen.getByText('Joining Date:')).toBeInTheDocument();
    expect(screen.getByText('Country:')).toBeInTheDocument();
    expect(screen.getByText('State:')).toBeInTheDocument();
    expect(screen.getByText('City:')).toBeInTheDocument();
    expect(screen.getByText('Address:')).toBeInTheDocument();
    expect(screen.getByText('Smoking Allowed:')).toBeInTheDocument();
    expect(screen.getByText('Room Number:')).toBeInTheDocument();
    expect(screen.getByText('Phone Number:')).toBeInTheDocument();
    expect(screen.getByText('Interests:')).toBeInTheDocument();
    expect(screen.getByText('Pet Friendly:')).toBeInTheDocument();
    expect(screen.getByText('Kids Friendly:')).toBeInTheDocument();
    expect(screen.getByText('Bio')).toBeInTheDocument();
});

