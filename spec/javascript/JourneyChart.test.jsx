import React from 'react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import JourneyChart from '../../app/javascript/react/components/JourneyChart'

// Stand in for Google Charts so the data handed to it can be asserted directly
// (and so the real loader isn't fetched in jsdom).
const chartData = []
vi.mock('react-google-charts', () => ({
  Chart: ({ data, options }) => {
    chartData.push({ title: options.title, data })
    return <div data-testid="chart">{options.title}</div>
  },
}))

function jsonResponse(body) {
  return Promise.resolve({ ok: true, json: () => Promise.resolve(body) })
}

const scheduleFor = (tripId, arrivalTime) => ({
  relationships: { trip: { data: { id: tripId } } },
  attributes: { arrival_time: arrivalTime },
})

const renderChart = () => render(
  <JourneyChart id={23} direction={1} line="10" origin={10015} destination={25} />
)

describe('JourneyChart', () => {
  beforeEach(() => {
    chartData.length = 0
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('shows an empty state instead of crashing when there is nothing to plot', async () => {
    vi.stubGlobal('fetch', vi.fn((url) => {
      if (url.includes('/trips')) return jsonResponse({ trips: [] })
      // No overlapping trip ids, so no schedule pairs come out of the match
      if (url.includes('/api/v1/mbta/schedules')) return jsonResponse({ data: [] })
      return Promise.reject(new Error(`Unhandled fetch: ${url}`))
    }))

    renderChart()
    fireEvent.click(await screen.findByDisplayValue('Get Charts'))

    expect(await screen.findByText(/No data available for “Your Trips”/)).toBeInTheDocument()
    expect(screen.getByText(/No data available for “Scheduled Trips”/)).toBeInTheDocument()
    // A header-only dataset is what used to make Google Charts throw
    expect(chartData).toHaveLength(0)
  })

  it('drops trips whose times cannot be plotted', async () => {
    vi.stubGlobal('fetch', vi.fn((url) => {
      if (url.includes('/trips')) return jsonResponse({ trips: [
        { id: 1, arrival: '2026-08-13T07:30:00-04:00', total_trip_time: 33 },
        { id: 2, arrival: '1:24PM', total_trip_time: 20 },   // legacy non-ISO row -> NaN hour
        { id: 3, arrival: '2026-08-13T09:15:00-04:00', total_trip_time: null }, // unparseable duration
      ] })
      if (url.includes('/api/v1/mbta/schedules')) return jsonResponse({ data: [] })
      return Promise.reject(new Error(`Unhandled fetch: ${url}`))
    }))

    renderChart()
    fireEvent.click(await screen.findByDisplayValue('Get Charts'))

    await waitFor(() => expect(chartData.some((c) => c.title === 'Your Trips')).toBe(true))
    const yourTrips = chartData.find((c) => c.title === 'Your Trips')
    const [header, ...rows] = yourTrips.data
    // Column types are declared rather than inferred from the rows
    expect(header).toEqual([{ label: 'Time', type: 'number' }, { label: 'Duration', type: 'number' }])
    expect(rows).toEqual([[7, 33]])
  })

  it('plots scheduled trips as [hour, duration] to match the axis labels', async () => {
    vi.stubGlobal('fetch', vi.fn((url) => {
      if (url.includes('/trips')) return jsonResponse({ trips: [] })
      if (url.includes(`stop=10015`)) {
        return jsonResponse({ data: [scheduleFor('t1', '2026-08-13T08:00:00-04:00')] })
      }
      if (url.includes(`stop=25`)) {
        return jsonResponse({ data: [scheduleFor('t1', '2026-08-13T08:42:00-04:00')] })
      }
      return Promise.reject(new Error(`Unhandled fetch: ${url}`))
    }))

    renderChart()
    fireEvent.click(await screen.findByDisplayValue('Get Charts'))

    await waitFor(() => expect(chartData.some((c) => c.title === 'Scheduled Trips')).toBe(true))
    const scheduled = chartData.find((c) => c.title === 'Scheduled Trips')
    const rows = scheduled.data.slice(1)
    // 8am departure, 42 minute trip - hour on the x axis, duration on the y
    expect(rows).toEqual([[8, 42]])
  })
})
