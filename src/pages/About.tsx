import React from 'react';
import { Shield, Zap, Users, Award, CheckCircle } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-roblox-red to-roblox-purple text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Tentang Kami</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Platform jual beli item Roblox terpercaya dengan pembayaran QRIS yang aman dan mudah
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Misi Kami</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Menjadi platform terdepan dalam perdagangan item Roblox di Indonesia dengan 
              menyediakan pengalaman berbelanja yang aman, cepat, dan terpercaya. Kami 
              berkomitmen untuk memberikan layanan terbaik kepada komunitas Roblox Indonesia.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Nilai-Nilai Kami
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-roblox-red text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Keamanan</h3>
              <p className="text-gray-600">
                Transaksi aman dengan sistem pembayaran QRIS yang terjamin
              </p>
            </div>
            <div className="text-center">
              <div className="bg-roblox-blue text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Kecepatan</h3>
              <p className="text-gray-600">
                Proses transaksi cepat dan pengiriman item yang instan
              </p>
            </div>
            <div className="text-center">
              <div className="bg-roblox-green text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Komunitas</h3>
              <p className="text-gray-600">
                Membangun komunitas Roblox yang kuat dan saling mendukung
              </p>
            </div>
            <div className="text-center">
              <div className="bg-roblox-yellow text-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Kualitas</h3>
              <p className="text-gray-600">
                Menyediakan item berkualitas tinggi dengan harga terbaik
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-roblox-red to-roblox-purple text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-lg opacity-90">Pelanggan Puas</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50,000+</div>
              <div className="text-lg opacity-90">Transaksi Berhasil</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99.9%</div>
              <div className="text-lg opacity-90">Uptime Server</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-lg opacity-90">Customer Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Mengapa Memilih Kami?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex items-start space-x-4">
              <CheckCircle className="w-6 h-6 text-roblox-green mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Pembayaran QRIS
                </h3>
                <p className="text-gray-600">
                  Pembayaran mudah dan aman menggunakan QRIS yang didukung semua e-wallet
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <CheckCircle className="w-6 h-6 text-roblox-green mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Pengiriman Instan
                </h3>
                <p className="text-gray-600">
                  Item dikirim langsung ke akun Roblox Anda dalam hitungan detik
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <CheckCircle className="w-6 h-6 text-roblox-green mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Garansi 100%
                </h3>
                <p className="text-gray-600">
                  Garansi uang kembali jika item tidak terkirim dalam 24 jam
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <CheckCircle className="w-6 h-6 text-roblox-green mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Harga Terbaik
                </h3>
                <p className="text-gray-600">
                  Harga kompetitif dengan diskon khusus untuk pelanggan setia
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <CheckCircle className="w-6 h-6 text-roblox-green mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Customer Service 24/7
                </h3>
                <p className="text-gray-600">
                  Tim support kami siap membantu Anda kapan saja melalui WhatsApp
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <CheckCircle className="w-6 h-6 text-roblox-green mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Item Original
                </h3>
                <p className="text-gray-600">
                  Semua item 100% original dari Roblox, bukan hasil hack atau duplikasi
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Siap untuk Memulai?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Bergabunglah dengan ribuan pemain Roblox yang telah mempercayai kami
          </p>
          <a
            href="/products"
            className="bg-roblox-red text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-700 transition-colors inline-block"
          >
            Mulai Belanja Sekarang
          </a>
        </div>
      </section>
    </div>
  );
};

export default About; 