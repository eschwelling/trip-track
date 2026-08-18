import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import FormMasterComponent from '../components/FormMasterComponent'
import JourneyShow from '../components/JourneyShow'
import NavBar from './NavBar'

const ScrollToTop = () => {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return null
}

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<NavBar />}>
          <Route path="/home" element={<FormMasterComponent />} />
          <Route path="/journeys/:id" element={<JourneyShow />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
