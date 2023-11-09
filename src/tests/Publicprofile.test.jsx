import { render, screen } from '@testing-library/react'
import Component from '../components/PublicProfilePage/PublicProfile'
import { test } from 'vitest'

test('renders correct name', async () => {
  const data = {
    FirstName: 'john',
    LastName: 'Rahimi'
  }

  render(Component, { props: { data } })

  const elements = screen.queryAllByText(`${data.FirstName} ${data.LastName}`)
  expect(elements).toHaveLength(0)
})
