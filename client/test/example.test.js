import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import DroneCard from '../src/components/DroneCard'

const mockDrone = {
  id: 1,
  name: 'DJI Air 3S',
  price: 999,
  image: 'drone.jpg',
  rating: 4.5,
  reviews: 128
}

describe('DroneCard Component', () => {
  it('renders drone card with correct information', () => {
    render(
      <BrowserRouter>
        <DroneCard drone={mockDrone} />
      </BrowserRouter>
    )
    
    expect(screen.getByText(mockDrone.name)).toBeInTheDocument()
    expect(screen.getByText(`$${mockDrone.price}`)).toBeInTheDocument()
  })

  it('displays rating and reviews', () => {
    render(
      <BrowserRouter>
        <DroneCard drone={mockDrone} />
      </BrowserRouter>
    )
    
    expect(screen.getByText(`${mockDrone.reviews} reviews`)).toBeInTheDocument()
  })
})
