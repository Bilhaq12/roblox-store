import React from 'react';
import { ShoppingCart, Star, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '../lib/supabase';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
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
        return 'bg-roblox-red';
      case 'robux-gamepass':
        return 'bg-roblox-blue';
      case 'items':
        return 'bg-roblox-purple';
      case 'passes':
        return 'bg-roblox-green';
      case 'joki':
        return 'bg-roblox-yellow';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 animate-fade-in hover:scale-105">
      {/* Product Image */}
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        {product.popular && (
          <div className="absolute top-2 left-2 bg-roblox-yellow text-black px-2 py-1 rounded-full text-xs font-bold flex items-center">
            <Star className="w-3 h-3 mr-1" />
            Popular
          </div>
        )}
        <div className={`absolute top-2 right-2 ${getCategoryColor(product.category)} text-white px-2 py-1 rounded-full text-xs font-bold`}>
          {product.category.toUpperCase()}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        
        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-roblox-red">{formatPrice(product.price)}</span>
          <span className="text-sm text-gray-500">Stok: {product.stock}</span>
        </div>

        {/* Delivery Time */}
                    {product.delivery_time && (
              <div className="mb-4">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  ⏱️ {product.delivery_time}
                </span>
              </div>
            )}

        {/* Action Buttons */}
        <div className="space-y-2">
          <button
            onClick={() => onAddToCart(product)}
            disabled={product.stock === 0}
            className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2 ${
              product.stock > 0
                ? 'bg-roblox-red text-white hover:bg-red-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>{product.stock > 0 ? 'Tambah ke Keranjang' : 'Stok Habis'}</span>
          </button>
          
          <Link
            to={`/product/${product.id}`}
            className="w-full py-2 px-4 border border-roblox-red text-roblox-red rounded-lg font-semibold hover:bg-red-50 transition-colors flex items-center justify-center space-x-2"
          >
            <Eye className="w-4 h-4" />
            <span>Lihat Detail</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 