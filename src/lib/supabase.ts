import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'YOUR_SUPABASE_URL'
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface User {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  role: 'user' | 'admin'
  created_at: string
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: 'robux-login' | 'robux-gamepass' | 'items' | 'passes' | 'joki'
  stock: number
  popular?: boolean
  delivery_time?: string
  created_at: string
  updated_at: string
}

export interface Order {
  id: string
  user_id: string
  order_number: string
  total_amount: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  payment_method: 'qris' | 'bank_transfer' | 'e_wallet'
  payment_status: 'pending' | 'paid' | 'failed'
  customer_name: string
  customer_email: string
  customer_phone: string
  shipping_address: string
  order_items: OrderItem[]
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  quantity: number
  price: number
  product: Product
}

export interface Wishlist {
  id: string
  user_id: string
  product_id: string
  created_at: string
  product: Product
} 