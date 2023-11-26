import { render, screen } from "@testing-library/react";
import PublicProfile from "../components/PublicProfilePage/PublicProfile";
import { BrowserRouter } from 'react-router-dom';
import { test } from 'vitest'


it("should render the component without crashing", () => {
  render(<BrowserRouter><PublicProfile /></BrowserRouter>);
});


