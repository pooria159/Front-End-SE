import Modal_Offer from "../components/OfferPage/Modal_Offer";
import { BrowserRouter } from "react-router-dom";
import {
  render,
  fireEvent,
  waitFor,
  getByRole,
  screen,
  getAllByText,
  getByDisplayValue,
} from "@testing-library/react";
import { vitest, vi } from 'vitest';
import { test } from 'vitest'
import { toast } from 'react-toastify';



    test('should not render the component when offers is empty', () => {
        const isVisible = true;
        const onClose = vi.fn();
        const offers = [];
        const cardId = 1;
        const hostId = 2;


        expect(screen.queryByText('John')).not.toBeInTheDocument();
        expect(screen.queryByText('Jane')).not.toBeInTheDocument();
      });








