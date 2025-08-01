import React, { useState, useEffect } from 'react';
import { User, Settings, ShoppingBag, Heart, LogOut, Edit, Save, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { userService, orderService, wishlistService } from '../services/api';

interface UserProfile {
  id: string;
  full_name: string;
  role: 'user' | 'admin';
  created_at: string;
}

interface UserStats {
  totalOrders: number;
  totalSpent: number;
  wishlistCount: number;
}

const Profile: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [stats, setStats] = useState<UserStats>({
    totalOrders: 0,
    totalSpent: 0,
    wishlistCount: 0
  });

  const [tempData, setTempData] = useState({
    full_name: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) {
        console.log('No user found, redirecting to login');
        navigate('/login');
        return;
      }

      console.log('🔍 Fetching user data for:', user.id, user.email);

      try {
        setLoading(true);
        setProfileError(null);
        
        // Fetch user profile
        console.log('📡 Calling userService.getProfile()...');
        const profile = await userService.getProfile();
        console.log('📡 Profile response:', profile);
        
        if (profile) {
          console.log('✅ Profile found:', profile);
          setUserProfile(profile);
          setTempData({ full_name: profile.full_name || '' });
        } else {
          // Profile doesn't exist, create it
          console.log('⚠️ Profile not found, creating new profile...');
          console.log('📡 Calling userService.createProfile()...');
          const newProfile = await userService.createProfile({
            id: user.id,
            full_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
            role: 'user'
          });
          console.log('✅ New profile created:', newProfile);
          setUserProfile(newProfile);
          setTempData({ full_name: newProfile.full_name || '' });
        }

        // Fetch user stats
        try {
          console.log('📡 Fetching user stats...');
          const [orders, wishlist] = await Promise.all([
            orderService.getUserOrders(),
            wishlistService.getUserWishlist()
          ]);

          const totalSpent = orders.reduce((sum, order) => sum + Number(order.total_amount), 0);
          
          setStats({
            totalOrders: orders.length,
            totalSpent,
            wishlistCount: wishlist.length
          });
          console.log('✅ Stats loaded:', { orders: orders.length, wishlist: wishlist.length, totalSpent });
        } catch (statsError) {
          console.error('❌ Error fetching stats:', statsError);
          // Stats error is not critical, continue with default values
        }

      } catch (error) {
        console.error('❌ Error fetching user data:', error);
        console.error('❌ Error details:', {
          message: (error as any)?.message,
          code: (error as any)?.code,
          details: (error as any)?.details,
          hint: (error as any)?.hint
        });
        setProfileError(`Failed to load profile data: ${(error as any)?.message || 'Unknown error'}. Please try refreshing the page.`);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user, navigate]);

  const handleEdit = () => {
    setTempData({ full_name: userProfile?.full_name || '' });
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!user) return;

    try {
      await userService.updateProfile({ full_name: tempData.full_name });
      setUserProfile(prev => prev ? { ...prev, full_name: tempData.full_name } : null);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleCancel = () => {
    setTempData({ full_name: userProfile?.full_name || '' });
    setIsEditing(false);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-roblox-red mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Please log in to view your profile.</p>
          <Link to="/login" className="text-roblox-red hover:underline">Login here</Link>
        </div>
      </div>
    );
  }

  if (profileError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Profile Error</h1>
          <p className="text-gray-600 mb-4">{profileError}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-roblox-red text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  // Show basic profile even if userProfile is null
  const displayName = userProfile?.full_name || user.user_metadata?.full_name || user.email?.split('@')[0] || 'User';
  const memberSince = userProfile?.created_at ? new Date(userProfile.created_at).getFullYear() : new Date().getFullYear();
  const userRole = userProfile?.role || 'user';

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
                <h3 className="text-xl font-semibold text-gray-800">{displayName}</h3>
                <p className="text-gray-600">Member sejak {memberSince}</p>
                {userRole === 'admin' && (
                  <span className="inline-block bg-roblox-red text-white px-2 py-1 rounded text-sm mt-2">
                    Admin
                  </span>
                )}
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
                {userRole === 'admin' && (
                  <>
                    <Link
                      to="/admin"
                      className="flex items-center space-x-3 p-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Settings className="w-5 h-5" />
                      <span>Admin Panel</span>
                    </Link>
                    <Link
                      to="/admin/chat"
                      className="flex items-center space-x-3 p-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Settings className="w-5 h-5" />
                      <span>Admin Chat</span>
                    </Link>
                  </>
                )}
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
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
                {userProfile && !isEditing ? (
                  <button
                    onClick={handleEdit}
                    className="flex items-center space-x-2 bg-roblox-blue text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                ) : userProfile && isEditing ? (
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
                ) : null}
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Lengkap
                  </label>
                  {userProfile && isEditing ? (
                    <input
                      type="text"
                      value={tempData.full_name}
                      onChange={(e) => setTempData({ full_name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-roblox-red focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-800">{displayName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <p className="text-gray-800">{user.email}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role
                  </label>
                  <p className="text-gray-800 capitalize">{userRole}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tanggal Bergabung
                  </label>
                  <p className="text-gray-800">
                    {userProfile?.created_at ? 
                      new Date(userProfile.created_at).toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }) : 
                      'Baru saja bergabung'
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="text-3xl font-bold text-roblox-red mb-2">{stats.totalOrders}</div>
                <div className="text-gray-600">Total Pesanan</div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="text-3xl font-bold text-roblox-blue mb-2">
                  Rp {stats.totalSpent.toLocaleString('id-ID')}
                </div>
                <div className="text-gray-600">Total Pembelian</div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="text-3xl font-bold text-roblox-green mb-2">{stats.wishlistCount}</div>
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