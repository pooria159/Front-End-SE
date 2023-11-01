import { test } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import EditProfile from '../components/Profile/Edit_Profile'
import { JSDOM } from 'jsdom'

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



  
  test('renders a disabled select field', () => {
    const dom = new JSDOM(`
      <Select
        id="country"
        name="country"
        isDisabled={!isEditMode}
        options= {countries && countries}
        value={selectedCountry}
        placeholder = "Selected country"
        onChange={(selectedCountry) => {
          setSelectedCountry(selectedCountry)
          setFormData({ ...formDataa, ["country"]:  selectedCountry.value});
        }}
        isSearchable
        required
        styles={style}
      />
    `)
  
    const select = dom.window.document.querySelector('Select')
    expect(select).toBeDisabled()
  })
  
  test('renders a placeholder in the select field', () => {
    const select = dom.window.document.querySelector('Select')
    expect(select.placeholder).toBe('Selected country')
  })
  
