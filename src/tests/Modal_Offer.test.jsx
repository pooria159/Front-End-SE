import ModalTimeLine from "../components/OfferPage/Modal_Offer";
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


    test('should display a message when offers array is empty', () => {
      const isVisible = true;
      const onClose = vi.fn();
      const offers = [];
      const cardId = 1;
      const hostId = 2;

      render(<ModalTimeLine isVisible={isVisible} onClose={onClose} offers={offers} cardId={cardId} hostId={hostId} />);

      expect(screen.getByText('No one has requested to be hosted')).toBeInTheDocument();
    });


        test('should not render when isVisible is false', () => {
          const isVisible = false;
          const onClose = vi.fn();
          const offers = [{ HostUsername: 'John', Image: 'john.jpg' }];
          const cardId = 1;
          const hostId = 2;
    
          render(<ModalTimeLine isVisible={isVisible} onClose={onClose} offers={offers} cardId={cardId} hostId={hostId} />);
          expect(screen.queryByTestId('Modal')).not.toBeInTheDocument();
        });

    test('should not render when offers array is empty', () => {
      const isVisible = true;
      const onClose = vi.fn();
      const offers = [];
      const cardId = 1;
      const hostId = 2;

      render(<ModalTimeLine isVisible={isVisible} onClose={onClose} offers={offers} cardId={cardId} hostId={hostId} />);

      expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    });


    test('should not render when offers array is null or undefined', () => {
      const isVisible = true;
      const onClose = vi.fn();
      const offers = null || 0;
      const cardId = 1;
      const hostId = 2;

      render(<ModalTimeLine isVisible={isVisible} onClose={onClose} offers={offers} cardId={cardId} hostId={hostId} />);

      expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    });





    test('should display a message when offers array is null or undefined', () => {
      const isVisible = true;
      const onClose = vi.fn();
      const offers = null || undefined || 0;
      const cardId = 1;
      const hostId = 2;

      render(<ModalTimeLine isVisible={isVisible} onClose={onClose} offers={offers} cardId={cardId} hostId={hostId} />);

      expect(screen.getByText('No one has requested to be hosted')).toBeInTheDocument();
    });




    test('should not render the component when the hostId prop is null or undefined', () => {
      const isVisible = true;
      const onClose = vi.fn();
      const offers = [{ HostUsername: 'John', Image: 'john.jpg' }];
      const cardId = 1;
      const hostId = null || undefined || 0;

      expect(screen.queryByTestId('Modal')).not.toBeInTheDocument();
    });



