import React, { useState } from 'react';
import { X, AlertCircle, CheckCircle } from 'lucide-react';
import { Product } from '../lib/supabase';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartCheckoutFormProps {
  cartItems: CartItem[];
  totalAmount: number;
  onClose: () => void;
  onProceed: (formData: CartCheckoutFormData) => void;
}

export interface CartCheckoutFormData {
  nick: string;
  password: string;
  whatsapp: string;
}

const CartCheckoutForm: React.FC<CartCheckoutFormProps> = ({
  cartItems,
  totalAmount,
  onClose,
  onProceed
}) => {
  const [formData, setFormData] = useState<CartCheckoutFormData>({
    nick: '',
    password: '',
    whatsapp: ''
  });
  const [errors, setErrors] = useState<Partial<CartCheckoutFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check if password is required (any item is robux-login or joki)
  const isPasswordRequired = cartItems.some(item => 
    item.product.category === 'robux-login' || item.product.category === 'joki'
  );

  const validateForm = (): boolean => {
    const newErrors: Partial<CartCheckoutFormData> = {};

    // Validate Nick (required for all products)
    if (!formData.nick.trim()) {
      newErrors.nick = 'Nick Roblox wajib diisi';
    } else if (formData.nick.trim().length < 3) {
      newErrors.nick = 'Nick Roblox minimal 3 karakter';
    }

    // Validate Password (required if any item needs it)
    if (isPasswordRequired && !formData.password.trim()) {
      newErrors.password = 'Password wajib diisi untuk produk ini';
    } else if (isPasswordRequired && formData.password.trim().length < 6) {
      newErrors.password = 'Password minimal 6 karakter';
    }

    // Validate WhatsApp
    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = 'Nomor WhatsApp wajib diisi';
    } else {
      // Basic WhatsApp number validation (Indonesian format)
      const whatsappRegex = /^(\+62|62|0)8[1-9][0-9]{6,9}$/;
      if (!whatsappRegex.test(formData.whatsapp.replace(/\s/g, ''))) {
        newErrors.whatsapp = 'Format nomor WhatsApp tidak valid';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Format WhatsApp number
      const formattedWhatsapp = formData.whatsapp.replace(/\s/g, '');
      const finalFormData = {
        ...formData,
        whatsapp: formattedWhatsapp
      };
      
      onProceed(finalFormData);
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof CartCheckoutFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Checkout Keranjang
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Cart Items Summary */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
            Item dalam Keranjang ({cartItems.length})
          </h3>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {cartItems.map((item, index) => (
              <div key={index} className="flex items-center space-x-3 text-sm">
                <div className="w-8 h-8 bg-gradient-to-br from-roblox-red to-roblox-purple rounded flex items-center justify-center">
                  <span className="text-white font-bold text-xs">R</span>
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 dark:text-white font-medium">
                    {item.product.name}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {item.product.category} • Qty: {item.quantity}
                  </p>
                </div>
                <p className="text-roblox-red font-semibold">
                  Rp {(item.product.price * item.quantity).toLocaleString('id-ID')}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Nick Roblox */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Nick Roblox <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.nick}
              onChange={(e) => handleInputChange('nick', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-roblox-red focus:border-transparent transition-colors ${
                errors.nick 
                  ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                  : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
              }`}
              placeholder="Masukkan nick Roblox Anda"
            />
            {errors.nick && (
              <div className="flex items-center mt-1 text-red-600 dark:text-red-400 text-sm">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.nick}
              </div>
            )}
          </div>

          {/* Password (conditional) */}
          {isPasswordRequired && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-roblox-red focus:border-transparent transition-colors ${
                  errors.password 
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                }`}
                placeholder="Masukkan password akun"
              />
              {errors.password && (
                <div className="flex items-center mt-1 text-red-600 dark:text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.password}
                </div>
              )}
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Password diperlukan untuk produk VIP/Login & Joki
              </p>
            </div>
          )}

          {/* WhatsApp */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Nomor WhatsApp <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={formData.whatsapp}
              onChange={(e) => handleInputChange('whatsapp', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-roblox-red focus:border-transparent transition-colors ${
                errors.whatsapp 
                  ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                  : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
              }`}
              placeholder="Contoh: 081234567890"
            />
            {errors.whatsapp && (
              <div className="flex items-center mt-1 text-red-600 dark:text-red-400 text-sm">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.whatsapp}
              </div>
            )}
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Kami akan menghubungi Anda via WhatsApp untuk konfirmasi
            </p>
          </div>

          {/* Summary */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              Ringkasan Pesanan
            </h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Total Item:</span>
                <span className="text-gray-900 dark:text-white">
                  {cartItems.reduce((total, item) => total + item.quantity, 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Jenis Produk:</span>
                <span className="text-gray-900 dark:text-white">
                  {cartItems.length} jenis
                </span>
              </div>
              <hr className="border-gray-300 dark:border-gray-600" />
              <div className="flex justify-between font-semibold">
                <span className="text-gray-900 dark:text-white">Total:</span>
                <span className="text-roblox-red">Rp {totalAmount.toLocaleString('id-ID')}</span>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-roblox-red to-roblox-purple text-white rounded-lg hover:from-roblox-red/90 hover:to-roblox-purple/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Memproses...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Lanjut ke Pembayaran
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CartCheckoutForm; 