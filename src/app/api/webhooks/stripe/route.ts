import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { headers } from 'next/headers'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-03-31.basil'
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: Request) {
  try {
    const body = await request.text()
    const headersList = await headers()
    const signature = headersList.get('stripe-signature')

    if (!signature) {
      return NextResponse.json(
        { error: 'No signature found' },
        { status: 400 }
      )
    }

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        webhookSecret
      )
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      )
    }

    const supabase = createRouteHandlerClient({ cookies })

    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        const { metadata } = paymentIntent

        if (!metadata) break

        const { user_id, order_items, shipping_address } = metadata

        // Create order in database
        const { data, error } = await supabase.rpc('create_order', {
          p_user_id: user_id,
          p_items: JSON.parse(order_items),
          p_shipping_address: JSON.parse(shipping_address),
          p_payment_intent_id: paymentIntent.id,
          p_stripe_customer_id: paymentIntent.customer as string
        })

        if (error) throw error

        // Update order status to processing
        await supabase
          .from('orders')
          .update({ status: 'processing' })
          .eq('id', data)

        break
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.error('Payment failed:', paymentIntent.id)
        // Handle failed payment (e.g., notify user, update order status)
        break
      }

      // Add more event handlers as needed
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
} 