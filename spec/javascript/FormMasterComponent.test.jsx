import React from 'react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import FormMasterComponent from '../../app/javascript/react/components/FormMasterComponent'

const journeysData = {
  journeys: [
    {
      id: 23,
      origin: { id: 1330, mbta_id: 10015, name: 'Harrison Ave @ E Newton St' },
      destination: { id: 7302, mbta_id: 25, name: 'E Broadway @ L St' },
      line: { id: 36, name: 'City Point - Copley via Boston Medical Center', short_name: '10', mbta_id: '10' },
    },
    {
      id: 27,
      origin: { id: 4354, mbta_id: 1860, name: 'Walter St @ Hewlett St' },
      destination: { id: 2989, mbta_id: 642, name: 'Washington St @ Tollgate Way' },
      line: { id: 71, name: 'Reservoir - Forest Hills', short_name: '51', mbta_id: '51' },
    },
  ],
}

const linesData = [
  { id: 1, name: 'Red Line', short_name: '', description: 'Rapid Transit', mbta_id: 'Red' },
  { id: 5, name: 'Green Line C', short_name: 'C', description: 'Rapid Transit', mbta_id: 'Green-C' },
]

const userData = { id: 1, email: 'test@test.org', user_name: 'test1' }

function jsonResponse(body) {
  return Promise.resolve({ ok: true, json: () => Promise.resolve(body) })
}

function mockFetch(url) {
  if (url.startsWith('/api/v1/journeys')) return jsonResponse(journeysData)
  if (url.startsWith('/api/v1/lines')) return jsonResponse(linesData)
  if (url.startsWith('/api/v1/users')) return jsonResponse(userData)
  return Promise.reject(new Error(`Unhandled fetch in test: ${url}`))
}

describe('FormMasterComponent', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn(mockFetch))
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('renders the form and commute list headers', async () => {
    render(<MemoryRouter><FormMasterComponent /></MemoryRouter>)

    expect(await screen.findByText('Please select your commute')).toBeInTheDocument()
    expect(screen.getByText('Your Commutes:')).toBeInTheDocument()
  })

  it('renders the journey selection form fields', async () => {
    render(<MemoryRouter><FormMasterComponent /></MemoryRouter>)

    await screen.findByText('Please select your commute')
    expect(screen.getByText('Inbound')).toBeInTheDocument()
    expect(screen.getByText('Outbound')).toBeInTheDocument()
  })

  it('renders a journey tile for each saved journey', async () => {
    render(<MemoryRouter><FormMasterComponent /></MemoryRouter>)

    expect(await screen.findByText('City Point - Copley via Boston Medical Center - 10')).toBeInTheDocument()
    expect(screen.getByText('To: Washington St @ Tollgate Way')).toBeInTheDocument()
  })
})
