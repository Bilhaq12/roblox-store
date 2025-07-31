import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  ShoppingCart, 
  Trash2, 
  Package,
  Eye
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { wishlistService, productService } from '../services/api';
import { Wishlist, Product } from '../lib/supabase';

const WishlistPage: React.FC = () => {
  const { user } = useAuth();
  const [wishlistItems, setWishlistItems] = useState<(Wishlist & { product: Product })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchWishlist();
    }
  }, [user]);

  const fetchWishlist = async () => {
    try {
      const items = await wishlistService.getUserWishlist();
      setWishlistItems(items);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (productId: string) => {
    try {
      await wishlistService.remove(productId);
      setWishlistItems(items => items.filter(item => item.product_id !== productId));
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'robux-login':
        return 'bg-red-100 text-red-800';
      case 'robux-gamepass':
        return 'bg-blue-100 text-blue-800';
      case 'items':
        return 'bg-purple-100 text-purple-800';
      case 'passes':
        return 'bg-green-100 text-green-800';
      case 'joki':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Login Required</h2>
          <p className="text-gray-600 mb-4">Silakan login untuk melihat wishlist Anda</p>
          <Link
            to="/login"
            className="bg-roblox-red text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Login
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-roblox-red"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-3xl font-bold text-gray-900">Wishlist</h1>
            <p className="text-gray-600">Produk yang Anda simpan untuk dibeli nanti</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {wishlistItems.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Wishlist Kosong</h2>
            <p className="text-gray-600 mb-6">
              Anda belum menambahkan produk ke wishlist. Mulai berbelanja sekarang!
            </p>
            <Link
              to="/products"
              className="bg-roblox-red text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Lihat Produk
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                {/* Product Image */}
                <div className="relative">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-48 object-cover"
                  />
                  <button
                    onClick={() => removeFromWishlist(item.product_id)}
                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                  <div className="absolute top-2 left-2">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(item.product.category)}`}>
                      {item.product.category}
                    </span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {item.product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {item.product.description}
                  </p>
                  
                  {/* Delivery Time */}
                  {item.product.delivery_time && (
                    <div className="mb-3">
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        ⏱️ {item.product.delivery_time}
                      </span>
                    </div>
                  )}

                  {/* Price and Stock */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xl font-bold text-roblox-red">
                      {formatPrice(item.product.price)}
                    </span>
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      item.product.stock > 0 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {item.product.stock > 0 ? `Stok: ${item.product.stock}` : 'Habis'}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <Link
                      to={`/product/${item.product.id}`}
                      className="flex-1 flex items-center justify-center px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Detail
                    </Link>
                    <button
                      disabled={item.product.stock === 0}
                      className="flex-1 flex items-center justify-center px-3 py-2 bg-roblox-red text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Beli
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage; 