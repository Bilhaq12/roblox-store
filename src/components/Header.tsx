import React, { useState } from 'react';
import { ShoppingCart, User, Menu, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  cartCount: number;
}

const Header: React.FC<HeaderProps> = ({ cartCount }) => {
  const { user, signOut } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    setShowUserMenu(false);
  };

  return (
    <header className="bg-gradient-to-r from-roblox-red to-roblox-purple text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span className="text-roblox-red font-bold text-xl">R</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">Roblox Store</h1>
              <p className="text-xs opacity-80">Jual Beli Item Roblox</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-roblox-yellow transition-colors">
              Beranda
            </Link>
            <Link to="/products" className="hover:text-roblox-yellow transition-colors">
              Produk
            </Link>
            <Link to="/about" className="hover:text-roblox-yellow transition-colors">
              Tentang
            </Link>
            <Link to="/contact" className="hover:text-roblox-yellow transition-colors">
              Kontak
            </Link>
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link to="/cart" className="relative">
              <ShoppingCart className="w-6 h-6 hover:text-roblox-yellow transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-roblox-yellow text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
            
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 hover:text-roblox-yellow transition-colors"
                >
                  <User className="w-6 h-6" />
                  <span className="hidden md:block text-sm">
                    {user.user_metadata?.full_name || user.email}
                  </span>
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Profil
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Pesanan
                    </Link>
                    <Link
                      to="/wishlist"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Wishlist
                    </Link>
                    {user.user_metadata?.role === 'admin' && (
                      <>
                        <hr className="my-2" />
                        <Link
                          to="/admin/panel"
                          className="block px-4 py-2 text-blue-600 hover:bg-blue-50 font-medium"
                          onClick={() => setShowUserMenu(false)}
                        >
                          🔧 Admin Panel
                        </Link>
                      </>
                    )}
                    <hr className="my-2" />
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 flex items-center space-x-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Keluar</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="flex items-center space-x-2 hover:text-roblox-yellow transition-colors">
                <User className="w-6 h-6" />
                <span className="hidden md:block text-sm">Masuk</span>
              </Link>
            )}
            
            <button className="md:hidden">
              <Menu className="w-6 h-6 hover:text-roblox-yellow transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 