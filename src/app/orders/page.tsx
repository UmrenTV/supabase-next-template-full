import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Metadata } from 'next'
import { OrderList } from '@/components/orders/OrderList'

export const metadata: Metadata = {
  title: 'Order History - Next.js Template',
  description: 'View your order history and track your purchases'
}

export default async function OrdersPage() {
  const supabase = createServerComponentClient({ cookies })
  
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/auth/login')
  }

  const { data: orders } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (
        *
      )
    `)
    .order('created_at', { ascending: false })

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Order History</h1>
      <OrderList orders={orders || []} />
    </div>
  )
} 