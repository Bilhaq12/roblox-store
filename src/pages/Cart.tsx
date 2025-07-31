import React, { useState } from 'react';
import { Trash2, Plus, Minus, ArrowLeft, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '../lib/supabase';
import QRISPayment from '../components/QRISPayment';
import Modal from '../components/Modal';
import CartCheckoutForm, { CartCheckoutFormData } from '../components/CartCheckoutForm';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartProps {
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

const Cart: React.FC<CartProps> = ({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  const [showPayment, setShowPayment] = useState(false);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);
  const [orderId] = useState(`ORD-${Date.now()}`);
  const [checkoutData, setCheckoutData] = useState<CartCheckoutFormData | null>(null);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const calculateTotal = () => {
    return calculateSubtotal();
  };

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      onUpdateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = () => {
    setShowCheckoutForm(true);
  };

  const handleCheckoutProceed = (formData: CartCheckoutFormData) => {
    setCheckoutData(formData);
    setShowCheckoutForm(false);
    setShowPayment(true);
  };

  const handlePaymentComplete = () => {
    onClearCart();
    setShowPayment(false);
    // In a real app, you would redirect to a success page
    alert('Pembayaran berhasil! Pesanan Anda akan diproses segera.');
  };

  const handlePaymentCancel = () => {
    setShowPayment(false);
  };

  const handleClearCart = () => {
    onClearCart();
    setShowClearModal(false);
  };

  if (showPayment) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <QRISPayment
            amount={calculateTotal()}
            orderId={orderId}
            onPaymentComplete={handlePaymentComplete}
            onPaymentCancel={handlePaymentCancel}
          />
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto">
              <div className="text-gray-400 mb-4">
                <CreditCard className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Keranjang Belanja Kosong
              </h3>
              <p className="text-gray-600 mb-6">
                Belum ada item di keranjang belanja Anda
              </p>
              <Link
                to="/products"
                className="bg-roblox-red text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors inline-flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Mulai Belanja</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/products"
            className="inline-flex items-center space-x-2 text-roblox-red hover:text-red-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Produk</span>
          </Link>
          <h1 className="text-4xl font-bold text-gray-800">Keranjang Belanja</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">
                  Item ({cartItems.length})
                </h2>
              </div>
              <div className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="p-6">
                    <div className="flex items-center space-x-4">
                      {/* Product Image */}
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      
                      {/* Product Info */}
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {item.product.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2">
                          {item.product.description}
                        </p>
                        <p className="text-roblox-red font-bold">
                          {formatPrice(item.product.price)}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                          className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stock}
                          className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Ringkasan Pesanan
              </h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-semibold">{formatPrice(calculateSubtotal())}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total:</span>
                  <span className="text-xl font-bold text-roblox-red">
                    {formatPrice(calculateTotal())}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleCheckout}
                  className="w-full bg-roblox-red text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <CreditCard className="w-5 h-5" />
                  <span>Bayar dengan QRIS</span>
                </button>
                
                <button
                  onClick={() => setShowClearModal(true)}
                  className="w-full bg-gray-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
                >
                  Kosongkan Keranjang
                </button>
              </div>

              {/* Payment Info */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Pembayaran QRIS</h3>
                <p className="text-sm text-blue-600">
                  Pembayaran aman menggunakan QRIS. Scan QR code dengan aplikasi e-wallet atau mobile banking Anda.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Clear Cart Confirmation Modal */}
      <Modal
        isOpen={showClearModal}
        onClose={() => setShowClearModal(false)}
        title="Konfirmasi Kosongkan Keranjang"
        size="sm"
      >
        <div className="text-center">
          <p className="text-gray-600 mb-6">
            Apakah Anda yakin ingin mengosongkan keranjang belanja? Tindakan ini tidak dapat dibatalkan.
          </p>
          <div className="flex space-x-3">
            <button
              onClick={() => setShowClearModal(false)}
              className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
          >
              Batal
            </button>
            <button
              onClick={handleClearCart}
              className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Kosongkan
            </button>
          </div>
        </div>
      </Modal>

      {/* Cart Checkout Form */}
      {showCheckoutForm && (
        <CartCheckoutForm
          cartItems={cartItems}
          totalAmount={calculateTotal()}
          onClose={() => setShowCheckoutForm(false)}
          onProceed={handleCheckoutProceed}
        />
      )}
    </div>
  );
};

export default Cart; 