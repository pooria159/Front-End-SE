import CarouselDefault from '../components/CarouselPage/Carousel';
import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent, waitFor, getByRole,screen, getAllByText, getByDisplayValue} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vitest } from 'vitest';
import test1 from "/test1.jpg";
import test2 from "/test2.jpg";
import test3 from "/test3.jpg";



    test('should render a carousel with default images', () => {
        render(<CarouselDefault />);
        const carouselImages = screen.getAllByRole('img');
        expect(carouselImages.length).toBe(3);
      });

    test('should display correctly when given an array of one image', () => {
        render(<CarouselDefault slides={[test1]} />);
        const carouselImages = screen.getAllByRole('img');
        expect(carouselImages.length).toBe(3);
        expect(carouselImages[0]).toHaveAttribute('src', test1);
      });
    test('should display correctly when given an array of two images', () => {
        render(<CarouselDefault slides={[test1, test2]} />);
        const carouselImages = screen.getAllByRole('img');
        expect(carouselImages.length).toBe(3);
        expect(carouselImages[0]).toHaveAttribute('src', test1);
        expect(carouselImages[1]).toHaveAttribute('src', test2);
      });

    test('should display correctly when given an empty array of images', () => {
        render(<CarouselDefault slides={[]} />);
        const carouselImages = screen.queryAllByRole('photo');
        expect(carouselImages.length).toBe(0);
      });


    test('should display correctly when given an array of three images', () => {
        render(<CarouselDefault slides={[test1, test2, test3]} />);
        const carouselImages = screen.getAllByRole('img');
        expect(carouselImages.length).toBe(3);
        expect(carouselImages[0]).toHaveAttribute('src', test1);
        expect(carouselImages[1]).toHaveAttribute('src', test2);
        expect(carouselImages[2]).toHaveAttribute('src', test3);
      });

    test('should display the correct image when clicking on the corresponding circle', () => {
        render(<CarouselDefault slides={[test1, test2, test3]} />);
        const carouselImages = screen.getAllByRole('img');
        const carouselCircles = screen.getAllByRole('button');
        userEvent.click(carouselCircles[1]);
        expect(carouselImages[0]).toHaveAttribute('src', test1);
        expect(carouselImages[1]).toHaveAttribute('src', test2);
        expect(carouselImages[2]).toHaveAttribute('src', test3);
      });


    test('should render a carousel with only unique images from the slides array', () => {
        render(<CarouselDefault slides={[test1, test2, test1, test3, test2]} />);
        const carouselImages = screen.getAllByRole('img');
        expect(carouselImages.length).toBe(3);
        expect(carouselImages[0]).toHaveAttribute('src', test1);
        expect(carouselImages[1]).toHaveAttribute('src', test2);
        expect(carouselImages[2]).toHaveAttribute('src', test3);
      });


    test('should handle an empty array of slides correctly', () => {
        render(<CarouselDefault slides={[]} />);
        const carouselImages = screen.queryAllByRole('photo');
        expect(carouselImages.length).toBe(0);
      });


    test('should handle a large number of slides correctly', () => {
        const slides = Array.from({ length: 100 }, (_, i) => `test${i + 1}`);
        render(<CarouselDefault slides={slides} />);
        const carouselImages = screen.getAllByRole('img');
        expect(carouselImages.length).toBe(3);
        expect(carouselImages[0]).toHaveAttribute('src', test1);
        expect(carouselImages[1]).toHaveAttribute('src', test2);
        expect(carouselImages[2]).toHaveAttribute('src', test3);
      });

