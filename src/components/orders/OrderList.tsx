'use client'

import { format } from 'date-fns'
import { FaBox, FaCheck, FaTruck, FaTimes } from 'react-icons/fa'

interface OrderItem {
  id: string
  product_id: string
  quantity: number
  unit_price: number
  variant?: {
    size?: string
    color?: string
  }
}

interface Order {
  id: string
  status: 'pending' | 'processing' | 'completed' | 'cancelled'
  total_amount: number
  created_at: string
  shipping_address: {
    fullName: string
    addressLine1: string
    addressLine2?: string
    city: string
    state: string
    postalCode: string
    country: string
  }
  order_items: OrderItem[]
}

interface OrderListProps {
  orders: Order[]
}

const StatusIcon = ({ status }: { status: Order['status'] }) => {
  switch (status) {
    case 'pending':
      return <FaBox className="text-warning" />
    case 'processing':
      return <FaTruck className="text-info" />
    case 'completed':
      return <FaCheck className="text-success" />
    case 'cancelled':
      return <FaTimes className="text-error" />
    default:
      return null
  }
}

export function OrderList({ orders }: OrderListProps) {
  if (!orders.length) {
    return (
      <div className="text-center py-8">
        <p className="text-lg opacity-70">No orders found</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {orders.map(order => (
        <div key={order.id} className="card bg-base-200">
          <div className="card-body">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">
                  Order #{order.id.slice(0, 8)}
                </h3>
                <p className="text-sm opacity-70">
                  {format(new Date(order.created_at), 'PPP')}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <StatusIcon status={order.status} />
                <span className="capitalize">{order.status}</span>
              </div>
            </div>

            <div className="divider my-2"></div>

            <div className="space-y-4">
              {order.order_items.map(item => (
                <div key={item.id} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Product #{item.product_id}</p>
                    {item.variant && (
                      <p className="text-sm opacity-70">
                        {item.variant.size && `Size: ${item.variant.size}`}
                        {item.variant.size && item.variant.color && ' / '}
                        {item.variant.color && `Color: ${item.variant.color}`}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p>${item.unit_price.toFixed(2)} × {item.quantity}</p>
                    <p className="font-medium">
                      ${(item.unit_price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="divider my-2"></div>

            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Shipping Address:</p>
                <p className="text-sm opacity-70">
                  {order.shipping_address.fullName}
                </p>
                <p className="text-sm opacity-70">
                  {order.shipping_address.addressLine1}
                  {order.shipping_address.addressLine2 && (
                    <>, {order.shipping_address.addressLine2}</>
                  )}
                </p>
                <p className="text-sm opacity-70">
                  {order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.postalCode}
                </p>
                <p className="text-sm opacity-70">
                  {order.shipping_address.country}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm opacity-70">Total Amount</p>
                <p className="text-xl font-bold">
                  ${order.total_amount.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
} 