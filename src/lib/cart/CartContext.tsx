'use client'

import { createContext, useContext, useReducer, useEffect } from 'react'
import { useAuth } from '@/lib/auth/AuthContext'
import { supabase } from '@/lib/supabase'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  variant?: {
    size?: string
    color?: string
  }
}

interface CartState {
  items: CartItem[]
  total: number
  loading: boolean
  error: string | null
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'LOAD_CART'; payload: CartItem[] }

const CartContext = createContext<{
  state: CartState
  addItem: (item: CartItem) => Promise<void>
  removeItem: (id: string) => Promise<void>
  updateQuantity: (id: string, quantity: number) => Promise<void>
  clearCart: () => Promise<void>
} | undefined>(undefined)

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id)
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
          total: state.total + (action.payload.price * action.payload.quantity)
        }
      }
      return {
        ...state,
        items: [...state.items, action.payload],
        total: state.total + (action.payload.price * action.payload.quantity)
      }
    }
    case 'REMOVE_ITEM':
      const itemToRemove = state.items.find(item => item.id === action.payload)
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
        total: state.total - (itemToRemove ? itemToRemove.price * itemToRemove.quantity : 0)
      }
    case 'UPDATE_QUANTITY': {
      const item = state.items.find(item => item.id === action.payload.id)
      if (!item) return state
      const quantityDiff = action.payload.quantity - item.quantity
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
        total: state.total + (item.price * quantityDiff)
      }
    }
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        total: 0
      }
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload
      }
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      }
    case 'LOAD_CART':
      return {
        ...state,
        items: action.payload,
        total: action.payload.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      }
    default:
      return state
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
    loading: true,
    error: null
  })

  useEffect(() => {
    if (user) {
      loadCart()
    }
  }, [user])

  const loadCart = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const { data, error } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', user?.id)

      if (error) throw error
      dispatch({ type: 'LOAD_CART', payload: data })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load cart' })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  const addItem = async (item: CartItem) => {
    try {
      if (user) {
        const { error } = await supabase
          .from('cart_items')
          .upsert({
            user_id: user.id,
            product_id: item.id,
            quantity: item.quantity,
            variant: item.variant
          })
        if (error) throw error
      }
      dispatch({ type: 'ADD_ITEM', payload: item })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to add item to cart' })
    }
  }

  const removeItem = async (id: string) => {
    try {
      if (user) {
        const { error } = await supabase
          .from('cart_items')
          .delete()
          .eq('user_id', user.id)
          .eq('product_id', id)
        if (error) throw error
      }
      dispatch({ type: 'REMOVE_ITEM', payload: id })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to remove item from cart' })
    }
  }

  const updateQuantity = async (id: string, quantity: number) => {
    try {
      if (user) {
        const { error } = await supabase
          .from('cart_items')
          .update({ quantity })
          .eq('user_id', user.id)
          .eq('product_id', id)
        if (error) throw error
      }
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to update quantity' })
    }
  }

  const clearCart = async () => {
    try {
      if (user) {
        const { error } = await supabase
          .from('cart_items')
          .delete()
          .eq('user_id', user.id)
        if (error) throw error
      }
      dispatch({ type: 'CLEAR_CART' })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to clear cart' })
    }
  }

  return (
    <CartContext.Provider value={{ state, addItem, removeItem, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
} 