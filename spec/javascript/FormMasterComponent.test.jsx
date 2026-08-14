import React from 'react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
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

// The server filters non-bus routes when asked for bus_only, so the client
// receives only bus lines.
const busLinesData = [
  { id: 36, name: 'City Point - Copley via Boston Medical Center', short_name: '10', description: 'Local Bus', mbta_id: '10' },
  { id: 71, name: 'Reservoir - Forest Hills', short_name: '51', description: 'Local Bus', mbta_id: '51' },
]

// The server resolves MBTA ids to local Stop records before replying, so the
// client never has to match them up itself.
const routeStopsData = {
  stops: [
    { id: 1330, mbta_id: 10015, name: 'Harrison Ave @ E Newton St' },
    { id: 7302, mbta_id: 25, name: 'E Broadway @ L St' },
  ],
}

function jsonResponse(body) {
  return Promise.resolve({ ok: true, json: () => Promise.resolve(body) })
}

function mockFetch(url, options = {}) {
  if (url.startsWith('/api/v1/mbta/stops')) return jsonResponse(routeStopsData)
  // Reaching for the whole stops table is the performance bug this replaced.
  if (url.startsWith('/api/v1/stops')) return Promise.reject(new Error('should not fetch the stops table'))
  if (url.startsWith('/api/v1/journeys')) {
    if (options.method === 'POST') return jsonResponse({ journey: {} })
    return jsonResponse(journeysData)
  }
  if (url.startsWith('/api/v1/lines')) return jsonResponse(busLinesData)
  return Promise.reject(new Error(`Unhandled fetch in test: ${url}`))
}

const renderForm = () => render(<MemoryRouter><FormMasterComponent /></MemoryRouter>)

// Resolves once the route's stops have been loaded into both selects.
async function waitForStops() {
  await screen.findAllByRole('option', { name: 'Harrison Ave @ E Newton St' })
  await waitFor(() => {
    expect(global.fetch.mock.calls.some(([url]) => url.startsWith('/api/v1/mbta/stops'))).toBe(true)
  })
  await new Promise((resolve) => setTimeout(resolve, 0))
}

describe('FormMasterComponent', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn(mockFetch))
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('renders the form and commute list headers', async () => {
    renderForm()

    expect(await screen.findByText('Please select your commute')).toBeInTheDocument()
    expect(screen.getByText('Your Commutes:')).toBeInTheDocument()
  })

  it('renders the journey selection form fields', async () => {
    renderForm()

    await screen.findByText('Please select your commute')
    expect(screen.getByText('Inbound')).toBeInTheDocument()
    expect(screen.getByText('Outbound')).toBeInTheDocument()
  })

  it('renders a journey tile for each saved journey', async () => {
    renderForm()

    expect(await screen.findByText('City Point - Copley via Boston Medical Center - 10')).toBeInTheDocument()
    expect(screen.getByText('To: Washington St @ Tollgate Way')).toBeInTheDocument()
  })

  it('populates the line and stop dropdowns on initial load', async () => {
    renderForm()

    expect(await screen.findByRole('option', { name: 'City Point - Copley via Boston Medical Center - Local Bus - 10' })).toBeInTheDocument()
    // Stops for the first bus line load without any user interaction
    const originOptions = await screen.findAllByRole('option', { name: 'Harrison Ave @ E Newton St' })
    expect(originOptions).toHaveLength(2) // once in the origin select, once in destination
    // Non-bus routes are excluded by the server rather than downloaded and filtered here
    expect(global.fetch).toHaveBeenCalledWith('/api/v1/lines?bus_only=true', expect.anything())
  })

  it('resolves the route stops in a single request and never downloads the stops table', async () => {
    renderForm()
    await waitForStops()

    expect(global.fetch.mock.calls.filter(([url]) => url.startsWith('/api/v1/mbta/stops'))).toHaveLength(1)
    expect(global.fetch.mock.calls.filter(([url]) => url.startsWith('/api/v1/stops'))).toHaveLength(0)
  })

  it('changes origin and destination without any network requests', async () => {
    renderForm()
    await waitForStops()

    const callsBefore = global.fetch.mock.calls.length
    fireEvent.change(screen.getByRole('combobox', { name: /origin/i }), { target: { value: '7302' } })
    fireEvent.change(screen.getByRole('combobox', { name: /destination/i }), { target: { value: '1330' } })

    expect(global.fetch.mock.calls).toHaveLength(callsBefore)
  })

  it('submits the default selections when the form is untouched', async () => {
    renderForm()
    await waitForStops()

    fireEvent.click(screen.getByDisplayValue('Choose Your Commute!'))

    await waitFor(() => {
      const post = global.fetch.mock.calls.find(([url, opts]) => url === '/api/v1/journeys' && opts && opts.method === 'POST')
      expect(post).toBeTruthy()
      const body = JSON.parse(post[1].body)
      // origin defaults to the first stop on the route, destination to the last
      expect(body.origin).toBe(1330)
      expect(body.destination).toBe(7302)
      expect(body.line).toBe(36)
      // The server derives the owner from the session
      expect(body.user).toBeUndefined()
    })
  })
})
