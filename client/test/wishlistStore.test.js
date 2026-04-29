import { describe, it, expect, beforeEach } from 'vitest'
import { useWishlistStore } from '../src/store/wishlistStore'

describe('Wishlist Store', () => {
  beforeEach(() => {
    useWishlistStore.setState({ items: [] })
  })

  it('should add item to wishlist', () => {
    const store = useWishlistStore.getState()
    const drone = { id: 1, name: 'Drone X', price: 1000 }
    store.addToWishlist(drone)
    
    const { items } = useWishlistStore.getState()
    expect(items).toHaveLength(1)
    expect(items[0]).toEqual(drone)
  })

  it('should remove item from wishlist', () => {
    const store = useWishlistStore.getState()
    store.addToWishlist({ id: 1, name: 'Drone X', price: 1000 })
    store.removeFromWishlist(1)
    
    const { items } = useWishlistStore.getState()
    expect(items).toHaveLength(0)
  })

  it('should check if item is in wishlist', () => {
    const store = useWishlistStore.getState()
    store.addToWishlist({ id: 1, name: 'Drone X', price: 1000 })
    
    const { isInWishlist } = useWishlistStore.getState()
    expect(isInWishlist(1)).toBe(true)
    expect(isInWishlist(999)).toBe(false)
  })

  it('should clear wishlist', () => {
    const store = useWishlistStore.getState()
    store.addToWishlist({ id: 1, name: 'Drone X', price: 1000 })
    store.clearWishlist()
    
    const { items } = useWishlistStore.getState()
    expect(items).toHaveLength(0)
  })
})
