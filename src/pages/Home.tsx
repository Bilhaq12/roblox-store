import React, { useEffect, useState } from 'react';
import { ArrowRight, Star, Shield, Zap, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { Product } from '../lib/supabase';
import { productService } from '../services/api';

interface HomeProps {
  onAddToCart: (product: Product) => void;
}

const Home: React.FC<HomeProps> = ({ onAddToCart }) => {
  const [popularProducts, setPopularProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularProducts = async () => {
      try {
        const products = await productService.getPopular();
        setPopularProducts(products);
      } catch (error) {
        console.error('Error fetching popular products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularProducts();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-roblox-red via-roblox-purple to-roblox-blue text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Jual Beli Item <span className="text-roblox-yellow">Roblox</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Temukan item Roblox terbaik dengan harga terjangkau dan pembayaran QRIS yang mudah
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="bg-roblox-yellow text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-400 transition-colors flex items-center justify-center space-x-2"
            >
              <span>Lihat Produk</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/about"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-roblox-red transition-colors"
            >
              Pelajari Lebih Lanjut
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Mengapa Memilih Kami?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-roblox-red text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Aman & Terpercaya</h3>
              <p className="text-gray-600">
                Transaksi aman dengan sistem pembayaran QRIS yang terjamin keamanannya
              </p>
            </div>
            <div className="text-center">
              <div className="bg-roblox-blue text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Proses Cepat</h3>
              <p className="text-gray-600">
                Item akan dikirim langsung ke akun Roblox Anda dalam waktu singkat
              </p>
            </div>
            <div className="text-center">
              <div className="bg-roblox-green text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Customer Service 24/7</h3>
              <p className="text-gray-600">
                Tim support kami siap membantu Anda kapan saja
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              <Star className="inline w-8 h-8 text-roblox-yellow mr-2" />
              Produk Populer
            </h2>
            <Link
              to="/products"
              className="text-roblox-red hover:text-red-700 font-semibold flex items-center space-x-1"
            >
              <span>Lihat Semua</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
              <div className="col-span-full text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-roblox-red mx-auto"></div>
                <p className="mt-2 text-gray-600">Memuat produk...</p>
              </div>
            ) : (
              popularProducts.map((product: Product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                />
              ))
            )}
          </div>
        </div>
      </section>

              {/* Categories Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              Kategori Produk
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            <Link
              to="/products?category=robux-login"
              className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow group"
            >
              <div className="bg-roblox-red text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl font-bold">R</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Robux Via Login</h3>
              <p className="text-gray-600">
                Robux via login dengan pengiriman instan
              </p>
            </Link>
            <Link
              to="/products?category=robux-gamepass"
              className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow group"
            >
              <div className="bg-roblox-blue text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl font-bold">G</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Robux Gamepass</h3>
              <p className="text-gray-600">
                Robux via gamepass dengan harga lebih murah
              </p>
            </Link>
            <Link
              to="/products?category=items"
              className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow group"
            >
              <div className="bg-roblox-blue text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl font-bold">I</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Limited Items</h3>
              <p className="text-gray-600">
                Item eksklusif dan langka yang sulit ditemukan
              </p>
            </Link>
            <Link
              to="/products?category=passes"
              className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow group"
            >
              <div className="bg-roblox-green text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl font-bold">P</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Game Passes</h3>
              <p className="text-gray-600">
                Akses eksklusif ke fitur-fitur khusus dalam game
              </p>
            </Link>
            <Link
              to="/products?category=joki"
              className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow group"
            >
              <div className="bg-roblox-yellow text-black w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl font-bold">J</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Joki Services</h3>
              <p className="text-gray-600">
                Layanan joki profesional untuk game Roblox
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-roblox-red to-roblox-purple text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Siap untuk Memulai?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Bergabunglah dengan ribuan pemain Roblox yang telah mempercayai kami
          </p>
          <Link
            to="/products"
            className="bg-roblox-yellow text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-400 transition-colors inline-flex items-center space-x-2"
          >
            <span>Mulai Belanja Sekarang</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home; 