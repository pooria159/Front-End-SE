import Handlelogout from '../components/Handlelogout';
import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent, waitFor, getByRole,screen, getAllByText, getByDisplayValue } from '@testing-library/react';
import { vitest, vi } from 'vitest';
import { test } from 'vitest'
import { toast } from 'react-toastify';

test('should log out successfully when user is logged in', () => {
    // Arrange
    localStorage.setItem("islogin", "True");

    // Create spy functions
    const removeItemSpy = vi.fn();
    const toastSuccessSpy = vi.fn();
    const toastErrorSpy = vi.fn();

    // Replace the original functions with the spy functions
    localStorage.removeItem = removeItemSpy;
    toast.success = toastSuccessSpy;
    toast.error = toastErrorSpy;

    // Act
    const result = Handlelogout();

    // Assert
    waitFor(() => {
        expect(removeItemSpy).toHaveBeenCalledWith('islogin');
        expect(removeItemSpy).toHaveBeenCalledWith('refreshToken');
        expect(removeItemSpy).toHaveBeenCalledWith('token');
        expect(toastSuccessSpy).toHaveBeenCalledWith("Logged out successfully!");
        expect(result).toBe(true);
    });

    // Clean up
    localStorage.removeItem("islogin");
})

test('should not log out when user is not logged in', () => {
    // Arrange
    localStorage.removeItem("islogin");

    // Create spy functions
    const removeItemSpy = vi.fn();
    const toastErrorSpy = vi.fn();

    // Replace the original functions with the spy functions
    localStorage.removeItem = removeItemSpy;
    toast.error = toastErrorSpy;

    // Act
    const result = Handlelogout();

    // Assert
    expect(removeItemSpy).not.toHaveBeenCalled();
    expect(toastErrorSpy).toHaveBeenCalledWith("Can't log out, something bad happenned!");
    expect(result).toBe(false);
})