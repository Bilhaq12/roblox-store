import { supabase } from '../lib/supabase';
import { Product, Order, OrderItem, Wishlist } from '../lib/supabase';

// Product Services
export const productService = {
  // Get all products
  async getAll(): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Get popular products (first 6 products)
  async getPopular(): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(6);

    if (error) throw error;
    return data || [];
  },

  // Get products by category
  async getByCategory(category: string): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Get single product
  async getById(id: string): Promise<Product | null> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  // Create product (admin only)
  async create(product: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      .insert(product)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update product (admin only)
  async update(id: string, updates: Partial<Product>): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete product (admin only)
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};

// Order Services
export const orderService = {
  // Get user orders
  async getUserOrders(): Promise<Order[]> {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          *,
          product (*)
        )
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Get single order
  async getById(id: string): Promise<Order | null> {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          *,
          product (*)
        )
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  // Create order
  async create(order: {
    total_amount: number;
    payment_method: 'qris' | 'bank_transfer' | 'e_wallet';
    items: Array<{ product_id: string; quantity: number; price: number }>;
  }): Promise<Order> {
    // Start transaction
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert({
        total_amount: order.total_amount,
        payment_method: order.payment_method,
      })
      .select()
      .single();

    if (orderError) throw orderError;

    // Insert order items
    const orderItems = order.items.map(item => ({
      order_id: orderData.id,
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.price,
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) throw itemsError;

    return orderData;
  },

  // Update order status
  async updateStatus(id: string, status: Order['status']): Promise<Order> {
    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};

// Wishlist Services
export const wishlistService = {
  // Get user wishlist
  async getUserWishlist(): Promise<Wishlist[]> {
    const { data, error } = await supabase
      .from('wishlist')
      .select(`
        *,
        product (*)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Add to wishlist
  async add(productId: string): Promise<void> {
    const { error } = await supabase
      .from('wishlist')
      .insert({ product_id: productId });

    if (error) throw error;
  },

  // Remove from wishlist
  async remove(productId: string): Promise<void> {
    const { error } = await supabase
      .from('wishlist')
      .delete()
      .eq('product_id', productId);

    if (error) throw error;
  },

  // Check if product is in wishlist
  async isInWishlist(productId: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('wishlist')
      .select('id')
      .eq('product_id', productId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return !!data;
  }
};

// User Profile Services
export const userService = {
  // Get user profile
  async getProfile(): Promise<any> {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .single();

    if (error) {
      // If profile doesn't exist, return null instead of throwing error
      if (error.code === 'PGRST116') {
        return null;
      }
      throw error;
    }
    return data;
  },

  // Create user profile
  async createProfile(profileData: {
    id: string;
    full_name: string;
    role?: 'user' | 'admin';
  }): Promise<any> {
    const { data, error } = await supabase
      .from('user_profiles')
      .insert({
        id: profileData.id,
        full_name: profileData.full_name,
        role: profileData.role || 'user'
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update user profile
  async updateProfile(updates: {
    full_name?: string;
    avatar_url?: string;
    phone?: string;
    address?: string;
  }): Promise<any> {
    const { data, error } = await supabase
      .from('user_profiles')
      .update(updates)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}; 