import MyCard from '../components/Profile/MyCard';
import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent, waitFor, getByRole,screen, getAllByText, getByDisplayValue } from '@testing-library/react';


// it('should render a card with the given data', () => {
//     const data = {
//       PreferredLanguages: ["English", "Spanish"],
//       DestinationState: "California",
//       DestinationCity: "Los Angeles",
//       DestinationCountry: "United States",
//       StartDate: "2022-08-01",
//       EndDate: "2022-08-15",
//       UserUsername: "Baktash",
//       Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nunc a aliquet tincidunt, nunc enim aliquam nunc, auctor aliquet nunc nunc auctor.",
//     };

//     render(<BrowserRouter><MyCard data={data} /></BrowserRouter>);

    expect(screen.getByText('State: California')).toBeInTheDocument();
    expect(screen.getByText('City: Los Angeles')).toBeInTheDocument();
    expect(screen.getByText('Country: United States')).toBeInTheDocument();
    expect(screen.getByText('Start Date: 2022-08-01')).toBeInTheDocument();
    expect(screen.getByText('End Date: 2022-08-15')).toBeInTheDocument();
  });


// Displays the preferred languages of the host
it('should display the preferred languages of the host', () => {
    const data = {
        PreferredLanguages: ["English", "Spanish"],
        DestinationState: "California",
        DestinationCity: "Los Angeles",
        DestinationCountry: "United States",
        StartDate: "2022-08-01",
        EndDate: "2022-08-15",
        UserUsername: "Baktash",
        Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nunc a aliquet tincidunt, nunc enim aliquam nunc, auctor aliquet nunc nunc auctor.",
    };

    render(<BrowserRouter><MyCard data={data} /></BrowserRouter>);

    expect(screen.getByText('Languages: English, Spanish')).toBeInTheDocument();
});





