import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="text-roblox-red font-bold text-xl">R</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Roblox Store</h3>
                <p className="text-sm text-gray-400">Jual Beli Item Roblox</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Platform jual beli item Roblox terpercaya dengan pembayaran QRIS yang aman dan mudah.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Tautan Cepat</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-white transition-colors">
                  Produk
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Kontak
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Kategori</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/products?category=robux-login" className="text-gray-400 hover:text-white transition-colors">
                  Robux Via Login
                </Link>
              </li>
              <li>
                <Link to="/products?category=robux-gamepass" className="text-gray-400 hover:text-white transition-colors">
                  Robux Gamepass
                </Link>
              </li>
              <li>
                <Link to="/products?category=items" className="text-gray-400 hover:text-white transition-colors">
                  Limited Items
                </Link>
              </li>
              <li>
                <Link to="/products?category=passes" className="text-gray-400 hover:text-white transition-colors">
                  Game Passes
                </Link>
              </li>
              <li>
                <Link to="/products?category=joki" className="text-gray-400 hover:text-white transition-colors">
                  Joki Services
                </Link>
              </li>
              <li>
                <a href="/products" className="text-gray-400 hover:text-white transition-colors">
                  Promo
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Kontak</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400">+62 812-3456-7890</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400">support@robloxstore.id</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400">Jakarta Selatan, Indonesia</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Roblox Store. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Kebijakan Privasi
              </a>
              <a href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Syarat & Ketentuan
              </a>
              <a href="/refund" className="text-gray-400 hover:text-white text-sm transition-colors">
                Kebijakan Pengembalian
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 