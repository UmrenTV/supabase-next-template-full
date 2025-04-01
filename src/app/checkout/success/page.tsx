import { Metadata } from 'next'
import Link from 'next/link'
import { FaCheckCircle } from 'react-icons/fa'

export const metadata: Metadata = {
  title: 'Order Confirmed - Next.js Template',
  description: 'Your order has been successfully placed'
}

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="text-success mb-4">
          <FaCheckCircle className="w-16 h-16 mx-auto" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Order Confirmed!</h1>
        <p className="text-lg mb-8 opacity-70">
          Thank you for your purchase. We'll send you an email with your order details.
        </p>
        <div className="space-y-4">
          <Link href="/orders" className="btn btn-primary w-full">
            View Order
          </Link>
          <Link href="/products" className="btn btn-ghost w-full">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
} 