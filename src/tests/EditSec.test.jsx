import EditSec from '../components/Profile/EditSec';
import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent, waitFor, getByRole,screen, getAllByText, getByDisplayValue } from '@testing-library/react';
import { vitest } from 'vitest';


    // The form data is not null, so the initial values are set correctly for the input fields.
    it('should set initial values correctly when form data is not null', () => {
        // Arrange
        const formData = {
          UserName: "JohnDoe",
          Email: "johndoe@example.com",
          Gender: 1,
          Country: "USA",
          State: "California",
          City: "Los Angeles",
          PhoneNumber: "1234567890",
          Address: "123 Main St",
          Intrests: ["Computer", "Nature"],
          IsSmokingAllowed: true,
          IsPetFriendly: false,
          IsKidFriendly: true,
          RoomNumber: 2,
          Bio: "Lorem ipsum dolor sit amet"
        };
        const updateFormData = vitest.fn();
  
        // Act
        render(<EditSec formData={formData} updateFormData={updateFormData} />);
  
        // Assert
        const usernameInput = screen.getByLabelText("Username: (Can't be changed)");
        expect(usernameInput.value).toBe(formData.UserName);
        const emailInput = screen.getByLabelText("Email: (Can't be changed)");
        expect(emailInput.value).toBe(formData.Email);
      });