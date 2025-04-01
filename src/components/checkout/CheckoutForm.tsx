'use client'

import { useState } from 'react'
import { useCart } from '@/lib/cart/CartContext'
import { useAuth } from '@/lib/auth/AuthContext'
import { loadStripe } from '@stripe/stripe-js'
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface ShippingAddress {
  fullName: string
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  postalCode: string
  country: string
}

function CheckoutFormContent() {
  const stripe = useStripe()
  const elements = useElements()
  const { state: cart, clearCart } = useCart()
  const { user } = useAuth()
  const [error, setError] = useState<string | null>(null)
  const [processing, setProcessing] = useState(false)
  const [address, setAddress] = useState<ShippingAddress>({
    fullName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: ''
  })

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setAddress(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setProcessing(true)
    setError(null)

    try {
      const { error: submitError } = await elements.submit()
      if (submitError) throw submitError

      const response = await fetch('/api/checkout/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cart.items,
          shipping_address: address,
          user_id: user?.id
        }),
      })

      const { clientSecret, error: paymentError } = await response.json()
      if (paymentError) throw new Error(paymentError)

      const { error: confirmError } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/checkout/success`,
        },
      })

      if (confirmError) throw confirmError

      // Clear cart on successful payment
      await clearCart()
    } catch (error) {
      setError((error as Error).message)
    } finally {
      setProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Shipping Address</h3>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Full Name</span>
            </label>
            <input
              type="text"
              name="fullName"
              value={address.fullName}
              onChange={handleAddressChange}
              required
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Address Line 1</span>
            </label>
            <input
              type="text"
              name="addressLine1"
              value={address.addressLine1}
              onChange={handleAddressChange}
              required
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Address Line 2</span>
            </label>
            <input
              type="text"
              name="addressLine2"
              value={address.addressLine2}
              onChange={handleAddressChange}
              className="input input-bordered"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">City</span>
              </label>
              <input
                type="text"
                name="city"
                value={address.city}
                onChange={handleAddressChange}
                required
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">State</span>
              </label>
              <input
                type="text"
                name="state"
                value={address.state}
                onChange={handleAddressChange}
                required
                className="input input-bordered"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Postal Code</span>
              </label>
              <input
                type="text"
                name="postalCode"
                value={address.postalCode}
                onChange={handleAddressChange}
                required
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Country</span>
              </label>
              <input
                type="text"
                name="country"
                value={address.country}
                onChange={handleAddressChange}
                required
                className="input input-bordered"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Payment Details</h3>
          <PaymentElement />
        </div>
      </div>

      {error && (
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      )}

      <div className="flex justify-between items-center">
        <div>
          <p className="text-lg font-semibold">Total: ${cart.total.toFixed(2)}</p>
          <p className="text-sm opacity-70">Including taxes and shipping</p>
        </div>
        <button
          type="submit"
          disabled={!stripe || processing}
          className="btn btn-primary"
        >
          {processing ? 'Processing...' : 'Pay Now'}
        </button>
      </div>
    </form>
  )
}

export function CheckoutForm() {
  return (
    <Elements stripe={stripePromise}>
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-8">Checkout</h2>
        <CheckoutFormContent />
      </div>
    </Elements>
  )
} 