import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { CheckCircle, XCircle, Clock, Eye, Package, Users, DollarSign } from 'lucide-react';

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed';
  createdAt: string;
  items: Array<{
    productName: string;
    quantity: number;
    price: number;
  }>;
}

const AdminPanel: React.FC = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([
    {
      id: '1',
      orderNumber: 'ORD-1703123456789',
      customerName: 'John Doe',
      customerEmail: 'john@example.com',
      totalAmount: 75000,
      status: 'pending',
      paymentStatus: 'pending',
      createdAt: '2023-12-21T10:30:00Z',
      items: [
        { productName: 'Robux 100', quantity: 5, price: 15000 }
      ]
    },
    {
      id: '2',
      orderNumber: 'ORD-1703123456790',
      customerName: 'Jane Smith',
      customerEmail: 'jane@example.com',
      totalAmount: 150000,
      status: 'processing',
      paymentStatus: 'paid',
      createdAt: '2023-12-21T09:15:00Z',
      items: [
        { productName: 'Robux 500', quantity: 1, price: 75000 },
        { productName: 'Limited Item', quantity: 1, price: 75000 }
      ]
    }
  ]);

  const [selectedTab, setSelectedTab] = useState<'orders' | 'payments' | 'users' | 'products'>('orders');

  // Check if user is admin
  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Akses Ditolak</h1>
          <p className="text-gray-600 dark:text-gray-400">Anda tidak memiliki akses ke halaman admin.</p>
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('id-ID');
  };

  const handleConfirmPayment = (orderId: string) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, paymentStatus: 'paid' as const }
        : order
    ));
  };

  const handleUpdateStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus }
        : order
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'paid': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const pendingPayments = orders.filter(order => order.paymentStatus === 'pending');
  const totalRevenue = orders
    .filter(order => order.paymentStatus === 'paid')
    .reduce((sum, order) => sum + order.totalAmount, 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Admin Panel</h1>
          <p className="text-gray-600 dark:text-gray-400">Kelola pesanan, pembayaran, dan pengguna</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <Package className="w-8 h-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Pesanan</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{orders.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <Clock className="w-8 h-8 text-yellow-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Menunggu Pembayaran</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{pendingPayments.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <DollarSign className="w-8 h-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Pendapatan</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatPrice(totalRevenue)}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-purple-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Pengguna</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">25</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'orders', label: 'Pesanan', icon: Package },
                { id: 'payments', label: 'Pembayaran', icon: DollarSign },
                { id: 'users', label: 'Pengguna', icon: Users },
                { id: 'products', label: 'Produk', icon: Package }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id as any)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    selectedTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        {selectedTab === 'orders' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Daftar Pesanan</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Payment
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {order.orderNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">{order.customerName}</div>
                          <div className="text-gray-500 dark:text-gray-400">{order.customerEmail}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white font-medium">
                        {formatPrice(order.totalAmount)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentStatusColor(order.paymentStatus)}`}>
                          {order.paymentStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(order.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button
                          onClick={() => handleConfirmPayment(order.id)}
                          disabled={order.paymentStatus === 'paid'}
                          className={`px-3 py-1 rounded-md text-xs font-medium ${
                            order.paymentStatus === 'paid'
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : 'bg-green-100 text-green-800 hover:bg-green-200'
                          }`}
                        >
                          {order.paymentStatus === 'paid' ? 'Confirmed' : 'Confirm Payment'}
                        </button>
                        <button className="px-3 py-1 bg-blue-100 text-blue-800 rounded-md text-xs font-medium hover:bg-blue-200">
                          <Eye className="w-3 h-3 inline mr-1" />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selectedTab === 'payments' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Pembayaran Pending</h2>
            <div className="space-y-4">
              {pendingPayments.map((order) => (
                <div key={order.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">{order.orderNumber}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{order.customerName}</p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">{formatPrice(order.totalAmount)}</p>
                    </div>
                    <button
                      onClick={() => handleConfirmPayment(order.id)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <CheckCircle className="w-4 h-4 inline mr-2" />
                      Konfirmasi Pembayaran
                    </button>
                  </div>
                </div>
              ))}
              {pendingPayments.length === 0 && (
                <p className="text-gray-500 dark:text-gray-400 text-center py-8">Tidak ada pembayaran pending</p>
              )}
            </div>
          </div>
        )}

        {selectedTab === 'users' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Manajemen Pengguna</h2>
            <p className="text-gray-500 dark:text-gray-400">Fitur ini akan diimplementasikan segera.</p>
          </div>
        )}

        {selectedTab === 'products' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Manajemen Produk</h2>
            <p className="text-gray-500 dark:text-gray-400">Fitur ini akan diimplementasikan segera.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel; 