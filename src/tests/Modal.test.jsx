import Modal from "../components/OfferPage/Modal";
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

test("should not render the modal component when isVisible prop is false", () => {
    const isVisible = false;
    const onClose = vi.fn();
    const isAccept = true;
    const index = 0;
    const removeCard = vi.fn();
    const CallBack = vi.fn();
  
    render(
      <Modal
        isVisible={isVisible}
        onClose={onClose}
        isAccept={isAccept}
        index={index}
        removeCard={removeCard}
        CallBack={CallBack}
      />
    );
  
    expect(screen.queryByTestId("modal-component")).toBeNull();
  });





    test("should render the modal component when isVisible prop is true", () => {
        const isVisible = true;
        const onClose = vi.fn();
        const isAccept = true;
        const index = 0;
        const removeCard = vi.fn();
        const CallBack = vi.fn();
      
        render(
          <Modal
            isVisible={isVisible}
            onClose={onClose}
            isAccept={isAccept}
            index={index}
            removeCard={removeCard}
            CallBack={CallBack}
          />
        );
      });


    // test('should render the warning message based on the isAccept prop', () => {
    //     const isVisible = true;
    //     const onClose = vi.fn();
    //     const isAccept = true;
    //     const index = 0;
    //     const removeCard = vi.fn();
    //     const CallBack = vi.fn();
  
    //     render(<Modal isVisible={isVisible} onClose={onClose} isAccept={isAccept} index={index} removeCard={removeCard} CallBack={CallBack} />);
  
    //     expect(screen.getByText('Are you sure you want start')).toBeInTheDocument();
    //   });


    test('should display the Yes and No buttons for confirmation', () => {
        const isVisible = true;
        const onClose = vi.fn();
        const isAccept = true;
        const index = 0;
        const removeCard = vi.fn();
        const CallBack = vi.fn();
  
        render(<Modal isVisible={isVisible} onClose={onClose} isAccept={isAccept} index={index} removeCard={removeCard} CallBack={CallBack} />);
  
        expect(screen.getByText('Yes')).toBeInTheDocument();
        expect(screen.getByText('No')).toBeInTheDocument();
      });


    test('should not render the modal component when isVisible prop is false', () => {
        const isVisible = false;
        const onClose = vi.fn();
        const isAccept = true;
        const index = 0;
        const removeCard = vi.fn();
        const CallBack = vi.fn();
  
        render(<Modal isVisible={isVisible} onClose={onClose} isAccept={isAccept} index={index} removeCard={removeCard} CallBack={CallBack} />);
        expect(screen.queryByTestId('modal-component')).not.toBeInTheDocument();
      });


    test('should not render the warning message when isAccept prop is false', () => {
        const isVisible = true;
        const onClose = vi.fn();
        const isAccept = false;
        const index = 0;
        const removeCard = vi.fn();
        const CallBack = vi.fn();
  
        render(<Modal isVisible={isVisible} onClose={onClose} isAccept={isAccept} index={index} removeCard={removeCard} CallBack={CallBack} />);
  
        expect(screen.queryByText('Are you sure you want start')).not.toBeInTheDocument();
      });


    test('should not display the Yes and No buttons when isAccept prop is false', () => {
        const isVisible = false;
        const onClose = vi.fn();
        const isAccept = false;
        const index = 0;
        const removeCard = vi.fn();
        const CallBack = vi.fn();
  
        render(<Modal isVisible={isVisible} onClose={onClose} isAccept={isAccept} index={index} removeCard={removeCard} CallBack={CallBack} />);
  
        expect(screen.queryByText('Yes')).not.toBeInTheDocument();
        expect(screen.queryByText('No')).not.toBeInTheDocument();
      });





test('should render the modal component when isVisible prop is true', () => {
    const isVisible = true;
    const onClose = vi.fn();
    const isAccept = true;
    const index = 0;
    const removeCard = vi.fn();
    const CallBack = vi.fn();

    render(<Modal isVisible={isVisible} onClose={onClose} isAccept={isAccept} index={index} removeCard={removeCard} CallBack={CallBack} />);
  });




