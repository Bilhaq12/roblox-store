import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  ShoppingCart, 
  Users, 
  DollarSign, 
  TrendingUp,
  Settings,
  Plus,
  Eye
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { orderService, productService } from '../../services/api';

interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  totalUsers: number;
  totalRevenue: number;
}

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch basic stats (in real app, you'd have admin endpoints)
        const products = await productService.getAll();
        const orders = await orderService.getUserOrders(); // This will be admin orders in real app
        
        setStats({
          totalProducts: products.length,
          totalOrders: orders.length,
          totalUsers: 0, // Would need admin endpoint
          totalRevenue: orders.reduce((sum, order) => sum + order.total_amount, 0)
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const adminMenuItems = [
    {
      title: 'Kelola Produk',
      description: 'Tambah, edit, dan hapus produk',
      icon: Package,
      link: '/admin/products',
      color: 'bg-blue-500'
    },
    {
      title: 'Kelola Pesanan',
      description: 'Lihat dan update status pesanan',
      icon: ShoppingCart,
      link: '/admin/orders',
      color: 'bg-green-500'
    },
    {
      title: 'Kelola Pengguna',
      description: 'Kelola data pengguna',
      icon: Users,
      link: '/admin/users',
      color: 'bg-purple-500'
    },
    {
      title: 'Laporan',
      description: 'Laporan penjualan dan analitik',
      icon: TrendingUp,
      link: '/admin/reports',
      color: 'bg-orange-500'
    }
  ];

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
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Selamat datang, {user?.user_metadata?.full_name || user?.email}</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                ← Kembali ke Website
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <Package className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Produk</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalProducts}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <ShoppingCart className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Pesanan</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalOrders}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                <Users className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Pengguna</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalUsers}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-orange-100 text-orange-600">
                <DollarSign className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Pendapatan</p>
                <p className="text-2xl font-semibold text-gray-900">{formatPrice(stats.totalRevenue)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Aksi Cepat</h2>
          </div>
          <div className="p-6">
            <div className="flex flex-wrap gap-4">
              <Link
                to="/admin/products/new"
                className="flex items-center px-4 py-2 bg-roblox-red text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Tambah Produk
              </Link>
              <Link
                to="/admin/orders"
                className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Eye className="w-4 h-4 mr-2" />
                Lihat Pesanan
              </Link>
            </div>
          </div>
        </div>

        {/* Admin Menu */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {adminMenuItems.map((item) => (
            <Link
              key={item.title}
              to={item.link}
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className={`p-3 rounded-full ${item.color} text-white`}>
                  <item.icon className="w-6 h-6" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 