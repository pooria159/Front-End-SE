import { test } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import EditProfile from '../components/Profile/Edit_Profile'


test('renders Textarea and checks value update', () => {
  const { getByPlaceholderText } = render(<EditProfile />)

  // Check if Textarea is rendered
  const textarea = getByPlaceholderText('bio...')
  expect(textarea).toBeInTheDocument()

  // Check if Textarea value updates on change
  fireEvent.change(textarea, { target: { value: 'New bio' } })
  expect(textarea.value).toBe('New bio')
})



test('renders input', () => {
  const { getByPlaceholderText } = render(<EditProfile />)

  // Check if input is rendered
  const input = getByPlaceholderText('First Name')
  expect(input).toBeInTheDocument()

  fireEvent.change(input, { target: { value: 'New First Name' } })
  expect(input.value).toBe('NewFirstName')
})

test('renders input', () => {
    const { getByPlaceholderText } = render(<EditProfile />)
  
    // Check if input is rendered
    const input = getByPlaceholderText('Last Name')
    expect(input).toBeInTheDocument()
  
    fireEvent.change(input, { target: { value: 'New Last Name' } })
    expect(input.value).toBe('NewLastName')
  })



