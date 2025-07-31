import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  ShoppingCart, 
  Eye,
  Calendar,
  FileText,
  Truck
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { orderService } from '../services/api';
import { Order } from '../lib/supabase';
import InvoiceGenerator from '../components/InvoiceGenerator';

const Orders: React.FC = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [showInvoice, setShowInvoice] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const userOrders = await orderService.getUserOrders();
      setOrders(userOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'text-green-600 bg-green-100';
      case 'shipped':
        return 'text-purple-600 bg-purple-100';
      case 'processing':
        return 'text-blue-600 bg-blue-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'cancelled':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <Package className="w-4 h-4" />;
      case 'shipped':
        return <Truck className="w-4 h-4" />;
      case 'processing':
        return <Package className="w-4 h-4" />;
      case 'pending':
        return <Calendar className="w-4 h-4" />;
      case 'cancelled':
        return <Package className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'Terkirim';
      case 'shipped':
        return 'Sedang Dikirim';
      case 'processing':
        return 'Sedang Diproses';
      case 'pending':
        return 'Menunggu Pembayaran';
      case 'cancelled':
        return 'Dibatalkan';
      default:
        return status;
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'text-green-600 bg-green-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'failed':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getPaymentStatusText = (status: string) => {
    switch (status) {
      case 'paid':
        return 'Sudah Dibayar';
      case 'pending':
        return 'Menunggu Pembayaran';
      case 'failed':
        return 'Pembayaran Gagal';
      default:
        return status;
    }
  };

  const filteredOrders = orders.filter(order => {
    return selectedStatus === 'all' || order.status === selectedStatus;
  });

  const handleViewInvoice = (order: Order) => {
    setSelectedOrder(order);
    setShowInvoice(true);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Login Required</h2>
          <p className="text-gray-600 mb-4">Silakan login untuk melihat pesanan Anda</p>
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
            <h1 className="text-3xl font-bold text-gray-900">Pesanan Saya</h1>
            <p className="text-gray-600">Kelola dan lacak pesanan Anda</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <label className="text-sm font-medium text-gray-700">Filter Status:</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-roblox-red focus:border-transparent"
            >
              <option value="all">Semua Status</option>
              <option value="pending">Menunggu Pembayaran</option>
              <option value="processing">Sedang Diproses</option>
              <option value="shipped">Sedang Dikirim</option>
              <option value="delivered">Terkirim</option>
              <option value="cancelled">Dibatalkan</option>
            </select>
          </div>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Belum Ada Pesanan</h2>
            <p className="text-gray-600 mb-6">
              Anda belum memiliki pesanan. Mulai berbelanja sekarang!
            </p>
            <Link
              to="/products"
              className="bg-roblox-red text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Lihat Produk
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Order Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center space-x-4 mb-4 md:mb-0">
                      <div className={`p-2 rounded-full ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Order #{order.order_number}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {formatDate(order.created_at)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPaymentStatusColor(order.payment_status)}`}>
                        {getPaymentStatusText(order.payment_status)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Order Details */}
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Customer Info</h4>
                      <p className="text-sm text-gray-600">{order.customer_name}</p>
                      <p className="text-sm text-gray-600">{order.customer_email}</p>
                      <p className="text-sm text-gray-600">{order.customer_phone}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Shipping Address</h4>
                      <p className="text-sm text-gray-600">{order.shipping_address}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Payment</h4>
                      <p className="text-sm text-gray-600">Method: {order.payment_method.toUpperCase()}</p>
                      <p className="text-lg font-bold text-roblox-red">
                        {formatPrice(order.total_amount)}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <Link
                      to={`/order/${order.id}`}
                      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Truck className="w-4 h-4 mr-2" />
                      Track Order
                    </Link>
                    <button
                      onClick={() => handleViewInvoice(order)}
                      className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      View Invoice
                    </button>
                    <Link
                      to={`/product/${order.order_items[0]?.product_id}`}
                      className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Product
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Invoice Modal */}
      {showInvoice && selectedOrder && (
        <InvoiceGenerator
          order={selectedOrder as any}
          onClose={() => {
            setShowInvoice(false);
            setSelectedOrder(null);
          }}
        />
      )}
    </div>
  );
};

export default Orders; 