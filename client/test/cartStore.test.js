import { describe, it, expect, beforeEach } from 'vitest'
import { useCartStore } from '../src/store/cartStore'

describe('Cart Store', () => {
  beforeEach(() => {
    useCartStore.setState({ items: [] })
  })

  it('should add item to cart', () => {
    const store = useCartStore.getState()
    const drone = { id: 1, name: 'Drone X', price: 1000 }
    store.addItem(drone)
    
    const { items } = useCartStore.getState()
    expect(items).toHaveLength(1)
    expect(items[0]).toEqual(drone)
  })

  it('should remove item from cart', () => {
    const store = useCartStore.getState()
    store.addItem({ id: 1, name: 'Drone X', price: 1000 })
    store.removeItem(1)
    
    const { items } = useCartStore.getState()
    expect(items).toHaveLength(0)
  })

  it('should calculate total correctly', () => {
    const store = useCartStore.getState()
    store.addItem({ id: 1, name: 'Drone X', price: 1000, quantity: 2 })
    store.addItem({ id: 2, name: 'Drone Y', price: 500, quantity: 1 })
    
    const { getTotal } = useCartStore.getState()
    expect(getTotal()).toBe(2500)
  })

  it('should clear cart', () => {
    const store = useCartStore.getState()
    store.addItem({ id: 1, name: 'Drone X', price: 1000 })
    store.clearCart()
    
    const { items } = useCartStore.getState()
    expect(items).toHaveLength(0)
  })
})
