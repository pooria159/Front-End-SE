import { render, screen } from "@testing-library/react";
import PublicProfile from "../components/PublicProfilePage/PublicProfile";
import { BrowserRouter } from 'react-router-dom';
import { test } from 'vitest'


it("should render the component without crashing", () => {
  render(<BrowserRouter><PublicProfile /></BrowserRouter>);
});

// it("should display the user's profile picture", () => {

//   render(<BrowserRouter><PublicProfile /></BrowserRouter>);
//   const profilePicture = screen.getByAltText("profile picture");
//   expect(profilePicture).toBeInTheDocument();
// });





// it("should handle null data from useProfile hook", () => {
//   useProfile.mockResolvedValueOnce(null);
//   render(<PublicProfile />);
//   const fullName = screen.queryByText(/John Doe/);
//   expect(fullName).not.toBeInTheDocument();
// });

// it("should handle missing data fields from useProfile hook", () => {
//   useProfile.mockResolvedValueOnce({});
//   render(<PublicProfile />);
//   const fullName = screen.getByText(/John Doe/);
//   expect(fullName).toBeInTheDocument();
// });

// it("should handle missing profile picture", () => {
//   useProfile.mockResolvedValueOnce({ FirstName: "John", LastName: "Doe" });
//   render(<PublicProfile />);
//   const profilePicture = screen.queryByAltText("profile picture");
//   expect(profilePicture).not.toBeInTheDocument();
// });
