import React, { useState } from 'react';
import { User, Settings, ShoppingBag, Heart, LogOut, Edit, Save, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    username: 'roblox_player123',
    email: 'player@example.com',
    phone: '+62 812-3456-7890',
    robloxUsername: 'CoolPlayer2024'
  });

  const [tempData, setTempData] = useState(userData);

  const handleEdit = () => {
    setTempData(userData);
    setIsEditing(true);
  };

  const handleSave = () => {
    setUserData(tempData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempData(userData);
    setIsEditing(false);
  };

  const handleChange = (field: string, value: string) => {
    setTempData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Profil Saya</h1>
          <p className="text-gray-600">Kelola akun dan pengaturan Anda</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-roblox-red to-roblox-purple rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">{userData.username}</h3>
                <p className="text-gray-600">Member sejak 2024</p>
              </div>

              <nav className="space-y-2">
                <Link
                  to="/profile"
                  className="flex items-center space-x-3 p-3 bg-roblox-red text-white rounded-lg"
                >
                  <User className="w-5 h-5" />
                  <span>Profil</span>
                </Link>
                <Link
                  to="/orders"
                  className="flex items-center space-x-3 p-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Pesanan Saya</span>
                </Link>
                <Link
                  to="/wishlist"
                  className="flex items-center space-x-3 p-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Heart className="w-5 h-5" />
                  <span>Wishlist</span>
                </Link>
                <Link
                  to="/settings"
                  className="flex items-center space-x-3 p-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Settings className="w-5 h-5" />
                  <span>Pengaturan</span>
                </Link>
                <button className="w-full flex items-center space-x-3 p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <LogOut className="w-5 h-5" />
                  <span>Keluar</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Informasi Profil</h2>
                {!isEditing ? (
                  <button
                    onClick={handleEdit}
                    className="flex items-center space-x-2 bg-roblox-blue text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSave}
                      className="flex items-center space-x-2 bg-roblox-green text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      <span>Simpan</span>
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex items-center space-x-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                      <span>Batal</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Username
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={tempData.username}
                      onChange={(e) => handleChange('username', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-roblox-red focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-800">{userData.username}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={tempData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-roblox-red focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-800">{userData.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nomor Telepon
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={tempData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-roblox-red focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-800">{userData.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Username Roblox
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={tempData.robloxUsername}
                      onChange={(e) => handleChange('robloxUsername', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-roblox-red focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-800">{userData.robloxUsername}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="text-3xl font-bold text-roblox-red mb-2">12</div>
                <div className="text-gray-600">Total Pesanan</div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="text-3xl font-bold text-roblox-blue mb-2">Rp 2.5M</div>
                <div className="text-gray-600">Total Pembelian</div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="text-3xl font-bold text-roblox-green mb-2">8</div>
                <div className="text-gray-600">Item di Wishlist</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 