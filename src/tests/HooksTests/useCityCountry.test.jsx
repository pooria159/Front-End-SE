
import { useCityCountry } from '../../hooks/useCityCountry';
import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent, waitFor, getByRole,screen, getAllByText, getByDisplayValue} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vitest } from 'vitest';

import { expect, test } from 'vitest'


  test('should fetch countries', async () => {
    const countries = await useCityCountry("country");
    expect(countries).not.toBe(null);
  });
  test('should fetch states', async () => {
    const states = await useCityCountry("state", 'iran');
    expect(states).not.toBe(null);
  });

  test('should fetch cities', async () => {
    // const countries = await useCityCountry("country");
    const cities = await useCityCountry("city", 'tehran');
    expect(cities).not.toBe(null);
  });
