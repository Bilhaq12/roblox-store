import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle, Send } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    alert('Pesan Anda telah terkirim! Kami akan segera menghubungi Anda.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-roblox-red to-roblox-purple text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Hubungi Kami</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Tim support kami siap membantu Anda 24/7. Jangan ragu untuk menghubungi kami!
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Informasi Kontak</h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-roblox-red text-white w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">Telepon</h3>
                  <p className="text-gray-600">+62 812-3456-7890</p>
                  <p className="text-sm text-gray-500">Senin - Minggu, 24/7</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-roblox-blue text-white w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">Email</h3>
                  <p className="text-gray-600">support@robloxstore.id</p>
                  <p className="text-sm text-gray-500">Respon dalam 1-2 jam</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-roblox-green text-white w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">WhatsApp</h3>
                  <p className="text-gray-600">+62 812-3456-7890</p>
                  <p className="text-sm text-gray-500">Chat langsung dengan admin</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-roblox-yellow text-black w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">Alamat</h3>
                  <p className="text-gray-600">
                    Jakarta Selatan, DKI Jakarta<br />
                    Indonesia
                  </p>
                  <p className="text-sm text-gray-500">Kantor pusat kami</p>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="mt-12 bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Jam Operasional</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Senin - Jumat:</span>
                  <span className="font-semibold">24 Jam</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sabtu - Minggu:</span>
                  <span className="font-semibold">24 Jam</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Hari Libur:</span>
                  <span className="font-semibold">24 Jam</span>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                Customer service kami tersedia 24/7 untuk membantu Anda
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Kirim Pesan</h2>
            
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-roblox-red focus:border-transparent"
                    placeholder="Masukkan nama lengkap Anda"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-roblox-red focus:border-transparent"
                    placeholder="contoh@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subjek *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-roblox-red focus:border-transparent"
                  >
                    <option value="">Pilih subjek</option>
                    <option value="general">Pertanyaan Umum</option>
                    <option value="order">Status Pesanan</option>
                    <option value="payment">Masalah Pembayaran</option>
                    <option value="technical">Masalah Teknis</option>
                    <option value="refund">Pengembalian Dana</option>
                    <option value="other">Lainnya</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Pesan *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-roblox-red focus:border-transparent"
                    placeholder="Tulis pesan Anda di sini..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-roblox-red text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Kirim Pesan</span>
                </button>
              </div>
            </form>

            {/* FAQ Quick Links */}
            <div className="mt-8 bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-4">Pertanyaan Umum</h3>
              <div className="space-y-2">
                <a href="/faq" className="block text-blue-600 hover:text-blue-800 text-sm">
                  • Bagaimana cara membeli item Roblox?
                </a>
                <a href="/faq" className="block text-blue-600 hover:text-blue-800 text-sm">
                  • Berapa lama proses pengiriman item?
                </a>
                <a href="/faq" className="block text-blue-600 hover:text-blue-800 text-sm">
                  • Apakah pembayaran QRIS aman?
                </a>
                <a href="/faq" className="block text-blue-600 hover:text-blue-800 text-sm">
                  • Bagaimana jika item tidak terkirim?
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 