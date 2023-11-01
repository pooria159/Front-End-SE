import { test } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import EditProfileHost from '../components/Profile-Host/Edit_profile_Host'

test('renders Textarea and checks value update', () => {
  const { getByPlaceholderText } = render(<EditProfileHost />)

  // Check if Textarea is rendered
  const textarea = getByPlaceholderText('bio...')
  expect(textarea).toBeInTheDocument()

  // Check if Textarea value updates on change
  fireEvent.change(textarea, { target: { value: 'New bio' } })
  expect(textarea.value).toBe('New bio')
})



test('renders input', () => {
  const { getByPlaceholderText } = render(<EditProfileHost />)

  // Check if input is rendered
  const input = getByPlaceholderText('First Name')
  expect(input).toBeInTheDocument()

  fireEvent.change(input, { target: { value: 'New First Name' } })
  expect(input.value).toBe('NewFirstName')
})

test('renders input', () => {
    const { getByPlaceholderText } = render(<EditProfileHost />)
  
    // Check if input is rendered
    const input = getByPlaceholderText('Last Name')
    expect(input).toBeInTheDocument()
  
    fireEvent.change(input, { target: { value: 'New Last Name' } })
    expect(input.value).toBe('NewLastName')
  })


  test('renders input', () => {
    const { getByPlaceholderText } = render(<EditProfileHost />)
  
    // Check if input is rendered
    const input = getByPlaceholderText('09216321669')
    expect(input).toBeInTheDocument()
  
    fireEvent.change(input, { target: { value: '09216321663' } })
    expect(input.value).toBe('09216321663')
  })


  test('renders input', () => {
    const { getByPlaceholderText } = render(<EditProfileHost />)
  
    // Check if input is rendered
    const input = getByPlaceholderText('2')
    expect(input).toBeInTheDocument()
  
    fireEvent.change(input, { target: { value: '3' } })
    expect(input.value).toBe('3')
  })


