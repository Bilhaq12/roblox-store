import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Heart, Star, Shield, Zap, Users, Truck, CheckCircle } from 'lucide-react';
import { Product } from '../lib/supabase';
import { productService } from '../services/api';
import Modal from '../components/Modal';
import CheckoutForm, { CheckoutFormData } from '../components/CheckoutForm';

interface ProductDetailProps {
  onAddToCart: (product: Product) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ onAddToCart }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      if (!id) return;
      
      const productData = await productService.getById(id);
      if (productData) {
        setProduct(productData);
        
        // Fetch related products
        const allProducts = await productService.getAll();
        const related = allProducts
          .filter(p => p.category === productData.category && p.id !== productData.id)
          .slice(0, 4);
        setRelatedProducts(related);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-roblox-red"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Produk Tidak Ditemukan
              </h3>
              <p className="text-gray-600 mb-6">
                Produk yang Anda cari tidak tersedia
              </p>
              <Link
                to="/products"
                className="bg-roblox-red text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
              >
                Kembali ke Produk
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    // Add multiple quantities to cart
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product);
    }
  };

  const handleBuyNow = () => {
    setShowCheckoutForm(true);
  };

  const handleCheckoutProceed = (formData: CheckoutFormData) => {
    // Here you would typically create an order with the form data
    console.log('Checkout form data:', formData);
    console.log('Product:', product);
    console.log('Quantity:', quantity);
    
    // For now, we'll just add to cart and redirect to cart
    handleAddToCart();
    setShowCheckoutForm(false);
    navigate('/cart');
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

  // Mock additional images for demo
  const productImages = [
    product.image,
    'https://via.placeholder.com/400x300/FF3B30/FFFFFF?text=Detail+1',
    'https://via.placeholder.com/400x300/007AFF/FFFFFF?text=Detail+2',
    'https://via.placeholder.com/400x300/34C759/FFFFFF?text=Detail+3'
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            to="/products"
            className="inline-flex items-center space-x-2 text-roblox-red hover:text-red-700"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Produk</span>
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-4">
              {/* Main Image */}
              <div className="mb-4">
                <img
                  src={productImages[selectedImage]}
                  alt={product.name}
                  className="w-full h-96 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => setShowImageModal(true)}
                />
              </div>

              {/* Thumbnail Images */}
              <div className="flex space-x-2">
                {productImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className={`w-20 h-20 object-cover rounded cursor-pointer ${
                      selectedImage === index ? 'ring-2 ring-roblox-red' : 'hover:opacity-75'
                    }`}
                    onClick={() => setSelectedImage(index)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6">
              {/* Category Badge */}
              <div className="mb-4">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold text-white ${getCategoryColor(product.category)}`}>
                  {product.category}
                </span>
                {product.popular && (
                  <span className="ml-2 inline-block px-3 py-1 rounded-full text-sm font-semibold bg-roblox-yellow text-black">
                    ⭐ Popular
                  </span>
                )}
              </div>

              {/* Product Title */}
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

              {/* Price */}
              <div className="mb-6">
                <span className="text-4xl font-bold text-roblox-red">{formatPrice(product.price)}</span>
              </div>

              {/* Delivery Time */}
              {product.delivery_time && (
                <div className="mb-6">
                  <div className="flex items-center space-x-2 bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <span className="text-blue-600">⏱️</span>
                    <div>
                      <p className="text-sm font-medium text-blue-800">Waktu Pengiriman</p>
                      <p className="text-sm text-blue-600">{product.delivery_time}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Deskripsi</h3>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Stok:</span>
                  <span className={`font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {product.stock > 0 ? `${product.stock} tersedia` : 'Habis'}
                  </span>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Jumlah:</label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                    className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
                  >
                    -
                  </button>
                  <span className="w-16 text-center font-semibold">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= product.stock}
                    className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleBuyNow}
                  disabled={product.stock === 0}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                    product.stock > 0
                      ? 'bg-gradient-to-r from-roblox-red to-roblox-purple text-white hover:from-red-700 hover:to-purple-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <CheckCircle className="inline w-5 h-5 mr-2" />
                  {product.stock > 0 ? 'Beli Sekarang' : 'Stok Habis'}
                </button>
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors border-2 ${
                    product.stock > 0
                      ? 'border-roblox-red text-roblox-red hover:bg-roblox-red hover:text-white'
                      : 'border-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart className="inline w-5 h-5 mr-2" />
                  {product.stock > 0 ? 'Tambah ke Keranjang' : 'Stok Habis'}
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Fitur</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-gray-600">100% Aman</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Zap className="w-5 h-5 text-yellow-600" />
                  <span className="text-sm text-gray-600">Pengiriman Cepat</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span className="text-sm text-gray-600">Customer Service 24/7</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-gray-600">Garansi</span>
                </div>
              </div>
            </div>

            {/* How to Order */}
            <div className="bg-blue-50 rounded-lg p-6 mt-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-4">Cara Memesan</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                    1
                  </div>
                  <span className="text-sm text-blue-700">Pilih produk dan jumlah yang diinginkan</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                    2
                  </div>
                  <span className="text-sm text-blue-700">Klik "Tambah ke Keranjang"</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                    3
                  </div>
                  <span className="text-sm text-blue-700">Lanjutkan ke keranjang dan checkout</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                    4
                  </div>
                  <span className="text-sm text-blue-700">Bayar dengan QRIS dan item akan dikirim instan</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Produk Terkait</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-2">{relatedProduct.name}</h3>
                    <p className="text-roblox-red font-bold mb-2">{formatPrice(relatedProduct.price)}</p>
                    <button
                      onClick={() => navigate(`/product/${relatedProduct.id}`)}
                      className="w-full bg-roblox-red text-white py-2 px-4 rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors"
                    >
                      Lihat Detail
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Image Modal */}
      <Modal
        isOpen={showImageModal}
        onClose={() => setShowImageModal(false)}
        title={product.name}
        size="lg"
      >
        <div className="text-center">
          <img
            src={productImages[selectedImage]}
            alt={product.name}
            className="w-full h-auto rounded-lg"
          />
          <div className="flex justify-center space-x-2 mt-4">
            {productImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.name} ${index + 1}`}
                className={`w-16 h-12 object-cover rounded cursor-pointer ${
                  selectedImage === index ? 'ring-2 ring-roblox-red' : ''
                }`}
                onClick={() => setSelectedImage(index)}
              />
            ))}
          </div>
        </div>
      </Modal>

      {/* Checkout Form */}
      {showCheckoutForm && (
        <CheckoutForm
          product={product}
          quantity={quantity}
          totalAmount={product.price * quantity}
          onClose={() => setShowCheckoutForm(false)}
          onProceed={handleCheckoutProceed}
        />
      )}
    </div>
  );
};

export default ProductDetail; 