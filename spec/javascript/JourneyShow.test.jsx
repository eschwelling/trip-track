import React from 'react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import JourneyShow from '../../app/javascript/react/components/JourneyShow'

const journeyData = {
  journey: {
    id: 23,
    origin: { id: 1330, mbta_id: 10015, name: 'Harrison Ave @ E Newton St' },
    destination: { id: 7302, mbta_id: 25, name: 'E Broadway @ L St' },
    line: { id: 36, name: 'City Point - Copley via Boston Medical Center', short_name: '10' },
    direction_id: 1,
    user: { id: 1, user_name: 'test1' },
    notes: [
      { id: 1, date: 'November 11 18 02:43PM', body: 'long lines today! good trip tho.', user_id: 1, photo_path: { url: null } },
    ],
  },
}

const tripsData = { trips: [] }

const originPredictions = {
  data: [
    {
      id: 'p1',
      attributes: { arrival_time: '2020-01-01T10:00:00-05:00', direction_id: 1 },
      relationships: { trip: { data: { id: 't1' } }, route: { data: { id: '10' } }, stop: { data: { id: '10015' } } },
    },
  ],
}

const destinationPredictions = {
  data: [
    {
      id: 'p2',
      attributes: { arrival_time: '2020-01-01T10:20:00-05:00', direction_id: 1 },
      relationships: { trip: { data: { id: 't1' } }, route: { data: { id: '10' } }, stop: { data: { id: '25' } } },
    },
  ],
}

function jsonResponse(body) {
  return Promise.resolve({ ok: true, json: () => Promise.resolve(body) })
}

function mockFetch(url, options = {}) {
  if (url.startsWith('/api/v1/journeys/23/trips')) {
    if (options.method === 'POST') return jsonResponse({ trip: {} })
    return jsonResponse(tripsData)
  }
  if (url.startsWith('/api/v1/journeys/23')) return jsonResponse(journeyData)
  if (url.includes('/api/v1/mbta/predictions') && url.includes('stop=10015')) return jsonResponse(originPredictions)
  if (url.includes('/api/v1/mbta/predictions') && url.includes('stop=25')) return jsonResponse(destinationPredictions)
  return Promise.reject(new Error(`Unhandled fetch in test: ${url}`))
}

function renderJourneyShow() {
  return render(
    <MemoryRouter initialEntries={['/journeys/23']}>
      <Routes>
        <Route path="/journeys/:id" element={<JourneyShow />} />
      </Routes>
    </MemoryRouter>
  )
}

describe('JourneyShow', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn(mockFetch))
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('renders journey information', async () => {
    renderJourneyShow()

    expect(await screen.findByText('E Broadway @ L St')).toBeInTheDocument()
    expect(screen.getByText('Harrison Ave @ E Newton St')).toBeInTheDocument()
  })

  it('renders the chart trigger once trips load', async () => {
    renderJourneyShow()

    expect(await screen.findByDisplayValue('Get Charts')).toBeInTheDocument()
  })

  it('renders note tiles for the journey', async () => {
    renderJourneyShow()

    expect(await screen.findByText('long lines today! good trip tho.')).toBeInTheDocument()
  })

  it('renders a duration prediction once arrival and destination predictions match', async () => {
    renderJourneyShow()

    expect(await screen.findByText('20 minutes')).toBeInTheDocument()
  })
})
