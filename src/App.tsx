import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Notification from './components/Notification';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import About from './pages/About';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import Wishlist from './pages/Wishlist';
import ProductDetail from './pages/ProductDetail';
import Orders from './pages/Orders';
import Login from './pages/Login';
import AdminDashboard from './pages/Admin/Dashboard';
import ProductManagement from './pages/Admin/ProductManagement';
import ProductForm from './pages/Admin/ProductForm';
import AdminPanel from './pages/AdminPanel';
import OrderTracking from './pages/OrderTracking';
import { Product } from './lib/supabase';
import useLocalStorage from './hooks/useLocalStorage';

interface CartItem {
  product: Product;
  quantity: number;
}

function App() {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('cart-items', []);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
    isVisible: boolean;
  }>({
    type: 'success',
    message: '',
    isVisible: false
  });

  const addToCart = (product: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { product, quantity: 1 }];
      }
    });
    
    // Show notification
    setNotification({
      type: 'success',
      message: `${product.name} berhasil ditambahkan ke keranjang!`,
      isVisible: true
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const removeItem = (productId: string) => {
    setCartItems(prevItems =>
      prevItems.filter(item => item.product.id !== productId)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const closeNotification = () => {
    setNotification(prev => ({ ...prev, isVisible: false }));
  };

  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300">
            <Header cartCount={cartCount} />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home onAddToCart={addToCart} />} />
                <Route path="/products" element={<Products onAddToCart={addToCart} />} />
                <Route path="/product/:id" element={<ProductDetail onAddToCart={addToCart} />} />
                <Route path="/cart" element={
                  <Cart
                    cartItems={cartItems}
                    onUpdateQuantity={updateQuantity}
                    onRemoveItem={removeItem}
                    onClearCart={clearCart}
                  />
                } />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/order/:orderId" element={<OrderTracking />} />
                <Route path="/login" element={<Login />} />
                
                {/* Admin Routes */}
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/panel" element={<AdminPanel />} />
                <Route path="/admin/products" element={<ProductManagement />} />
                <Route path="/admin/products/new" element={<ProductForm />} />
                <Route path="/admin/products/:id/edit" element={<ProductForm />} />
              </Routes>
            </main>
            <Footer />
            <Notification
              type={notification.type}
              message={notification.message}
              isVisible={notification.isVisible}
              onClose={closeNotification}
            />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
