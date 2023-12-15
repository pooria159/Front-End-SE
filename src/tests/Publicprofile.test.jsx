import PublicProfile from "../components/PublicProfilePage/PublicProfile";
import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent, waitFor, getByRole,screen, getAllByText, getByDisplayValue} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vitest } from 'vitest';



test("should render the component without crashing", () => {
  render(<BrowserRouter><PublicProfile /></BrowserRouter>);
});

