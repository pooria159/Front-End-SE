import About from "../components/AboutUs/About";
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



