import React from 'react';
import { Order, OrderItem } from '../lib/supabase';

interface InvoiceGeneratorProps {
  order: Order & { order_items: (OrderItem & { product: any })[] };
  onClose: () => void;
}

const InvoiceGenerator: React.FC<InvoiceGeneratorProps> = ({ order, onClose }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Menunggu Pembayaran';
      case 'processing':
        return 'Sedang Diproses';
      case 'shipped':
        return 'Sedang Dikirim';
      case 'delivered':
        return 'Terkirim';
      case 'cancelled':
        return 'Dibatalkan';
      default:
        return status;
    }
  };

  const getPaymentStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Menunggu Pembayaran';
      case 'paid':
        return 'Sudah Dibayar';
      case 'failed':
        return 'Pembayaran Gagal';
      default:
        return status;
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // In a real app, you would generate and download a PDF
    // For now, we'll just print the invoice
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Invoice</h2>
          <div className="flex space-x-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Print
            </button>
            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Download PDF
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Close
            </button>
          </div>
        </div>

        {/* Invoice Content */}
        <div className="bg-white p-8 border rounded-lg">
          {/* Company Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-roblox-red mb-2">ROBLOX STORE</h1>
            <p className="text-gray-600">Jual Beli Item Roblox Terpercaya</p>
            <p className="text-gray-600">Email: info@robloxstore.com | Phone: +62 812-3456-7890</p>
          </div>

          {/* Invoice Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Invoice Info */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Invoice Details</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Invoice Number:</span>
                  <span className="font-medium">#{order.order_number}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">{formatDate(order.created_at)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-medium">{getStatusText(order.status)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Status:</span>
                  <span className="font-medium">{getPaymentStatusText(order.payment_status)}</span>
                </div>
              </div>
            </div>

            {/* Customer Info */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h3>
              <div className="space-y-2">
                <div>
                  <span className="text-gray-600">Name:</span>
                  <span className="font-medium ml-2">{order.customer_name}</span>
                </div>
                <div>
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium ml-2">{order.customer_email}</span>
                </div>
                <div>
                  <span className="text-gray-600">Phone:</span>
                  <span className="font-medium ml-2">{order.customer_phone}</span>
                </div>
                <div>
                  <span className="text-gray-600">Address:</span>
                  <span className="font-medium ml-2">{order.shipping_address}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
                      Item
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
                      Description
                    </th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border">
                      Quantity
                    </th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border">
                      Unit Price
                    </th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {order.order_items.map((item, index) => (
                    <tr key={item.id}>
                      <td className="px-4 py-3 border">
                        <div className="flex items-center">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-10 h-10 object-cover rounded mr-3"
                          />
                          <span className="font-medium text-gray-900">{item.product.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 border text-gray-600">
                        {item.product.description}
                      </td>
                      <td className="px-4 py-3 border text-right font-medium text-gray-900">
                        {item.quantity}
                      </td>
                      <td className="px-4 py-3 border text-right font-medium text-gray-900">
                        {formatPrice(item.price)}
                      </td>
                      <td className="px-4 py-3 border text-right font-medium text-gray-900">
                        {formatPrice(item.price * item.quantity)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Totals */}
          <div className="flex justify-end">
            <div className="w-64">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">{formatPrice(order.total_amount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (0%):</span>
                  <span className="font-medium">Rp 0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping:</span>
                  <span className="font-medium">Free</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-roblox-red">{formatPrice(order.total_amount)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">Payment Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-gray-600">Payment Method:</span>
                <span className="font-medium ml-2">{order.payment_method.toUpperCase()}</span>
              </div>
              <div>
                <span className="text-gray-600">Payment Status:</span>
                <span className="font-medium ml-2">{getPaymentStatusText(order.payment_status)}</span>
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="mt-8 text-sm text-gray-600">
            <h4 className="font-semibold text-gray-900 mb-2">Terms and Conditions</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Pembayaran harus dilakukan dalam waktu 24 jam setelah order dibuat</li>
              <li>Pengiriman akan dilakukan setelah pembayaran dikonfirmasi</li>
              <li>Untuk produk digital, pengiriman dilakukan melalui email atau in-game</li>
              <li>Tidak ada pengembalian untuk produk digital</li>
              <li>Untuk pertanyaan, hubungi customer service kami</li>
            </ul>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-gray-600">
            <p>Terima kasih telah berbelanja di Roblox Store!</p>
            <p>Website: www.robloxstore.com | Email: support@robloxstore.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceGenerator; 