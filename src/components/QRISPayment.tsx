import React, { useState, useEffect } from 'react';
import { QrCode, Clock, CheckCircle, XCircle } from 'lucide-react';
// QRIS Generator removed - using static QRIS for now

interface QRISPaymentProps {
  amount: number;
  orderId: string;
  onPaymentComplete: () => void;
  onPaymentCancel: () => void;
}

const QRISPayment: React.FC<QRISPaymentProps> = ({
  amount,
  orderId,
  onPaymentComplete,
  onPaymentCancel
}) => {
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'success' | 'failed'>('pending');
  const [dynamicQRISCode, setDynamicQRISCode] = useState<string>('');
  const [qrCodeURL, setQrCodeURL] = useState<string>('');

  // Use static QRIS code for now
  useEffect(() => {
    // Static QRIS code - in real app, this would be generated dynamically
    const staticQRISCode = '00020101021126670016COM.NOBUBANK.WWW01189360050300000879140214758009185656360303UMI51440014ID.CO.QRIS.WWW0215ID20243553629120303UMI5204541153033605802ID5923SINGSAE BIBIL OK21034656008BANYUMAS61055319462070703A0163044D67';
    setDynamicQRISCode(staticQRISCode);
    setQrCodeURL(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(staticQRISCode)}`);
  }, [amount]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setPaymentStatus('failed');
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Manual payment confirmation - removed automatic success timer
  // Payment will only be marked as success when admin confirms it

  const handleCancel = () => {
    setPaymentStatus('failed');
    onPaymentCancel();
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Pembayaran QRIS Static</h2>
        <p className="text-gray-600">QRIS Static dengan nominal {formatPrice(amount)}</p>
        <div className="mt-2 inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
          Generated QRIS Static
        </div>
      </div>

      {/* Payment Status */}
      {paymentStatus === 'pending' && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-center space-x-2 text-blue-600 mb-2">
            <Clock className="w-5 h-5" />
            <span className="font-semibold">Menunggu Pembayaran</span>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">{formatTime(timeLeft)}</div>
            <p className="text-sm text-blue-500">Batas waktu pembayaran</p>
          </div>
          <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-700 text-center">
              <strong>⚠️ Manual Confirmation:</strong> Pembayaran akan dikonfirmasi manual oleh admin setelah transfer selesai.
            </p>
          </div>
        </div>
      )}

      {paymentStatus === 'success' && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-center space-x-2 text-green-600 mb-2">
            <CheckCircle className="w-5 h-5" />
            <span className="font-semibold">Pembayaran Berhasil!</span>
          </div>
          <p className="text-center text-green-600">Pesanan Anda akan diproses segera</p>
        </div>
      )}

      {paymentStatus === 'failed' && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-center space-x-2 text-red-600 mb-2">
            <XCircle className="w-5 h-5" />
            <span className="font-semibold">Pembayaran Gagal</span>
          </div>
          <p className="text-center text-red-600">Waktu pembayaran telah habis</p>
        </div>
      )}

      {/* Payment Details */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-gray-800 mb-3">Detail Pembayaran QRIS Static</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Order ID:</span>
            <span className="font-mono text-sm">{orderId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Total Pembayaran:</span>
            <span className="font-bold text-xl text-roblox-red">{formatPrice(amount)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tipe QRIS:</span>
            <span className="font-semibold text-green-600">Static (Nominal Tertera)</span>
          </div>
        </div>
        <div className="mt-3 p-2 bg-blue-50 border border-blue-200 rounded">
          <p className="text-xs text-blue-700">
            💡 <strong>QRIS Static:</strong> QRIS ini dibuat static dengan nominal {formatPrice(amount)}. 
            Customer scan langsung bayar tanpa input nominal manual!
          </p>
        </div>
      </div>

      {/* QR Code */}
      {paymentStatus === 'pending' && (
        <div className="text-center mb-6">
          <div className="bg-white border-2 border-gray-200 rounded-lg p-6 inline-block">
            {/* QRIS Header */}
            <div className="flex justify-between items-center mb-4">
              <div className="text-left">
                <div className="text-xs font-bold text-black">QR Code Standar Pembayaran Nasional</div>
              </div>
              <div className="text-right">
                <div className="text-xs font-bold text-blue-600">GPN</div>
              </div>
            </div>
            
            {/* Merchant Info */}
            <div className="text-center mb-4">
              <div className="text-lg font-bold text-black mb-1">SINGSAE BIBIL</div>
              <div className="text-xs text-gray-600 mb-1">NMID: ID2024355362912</div>
              <div className="text-xs text-gray-600 mb-2">A01</div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-2">
                <div className="text-sm font-bold text-blue-800">QRIS Static Generated</div>
                <div className="text-lg font-bold text-blue-700">{formatPrice(amount)}</div>
                <div className="text-xs text-blue-600 mt-1">Order ID: {orderId}</div>
              </div>
            </div>
            
            {/* QR Code */}
            <div className="bg-white border border-gray-300 rounded-lg p-4 inline-block mb-4">
              {qrCodeURL ? (
                <img 
                  src={qrCodeURL} 
                  alt="Dynamic QRIS Code" 
                  className="w-40 h-40 object-contain"
                  onError={(e) => {
                    // Fallback ke placeholder jika gambar tidak load
                    const target = e.currentTarget as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) {
                      fallback.style.display = 'block';
                    }
                  }}
                />
              ) : (
                <div className="w-40 h-40 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              )}
              <QrCode className="w-40 h-40 text-gray-400 hidden" />
            </div>
            
            {/* QRIS Footer */}
            <div className="text-center">
              <div className="text-xs font-bold text-black mb-2">SATU QRIS UNTUK SEMUA</div>
              <div className="text-xs text-gray-600 mb-2">Cek aplikasi penyelenggara di: www.aspi-qris.id</div>
              <div className="text-xs text-gray-500">Dicetak oleh: 93600503 | Versi: 2024.11.13</div>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Scan QR Code dengan aplikasi e-wallet atau mobile banking Anda
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-3">
        {paymentStatus === 'pending' && (
          <>
            <button
              onClick={handleCancel}
              className="w-full py-3 px-4 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors"
            >
              Batalkan Pembayaran
            </button>
            
            {/* Admin Confirmation Button (for demo purposes) */}
            <button
              onClick={() => {
                setPaymentStatus('success');
                onPaymentComplete();
              }}
              className="w-full py-3 px-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors border-2 border-dashed border-green-400"
            >
              🔧 Admin: Konfirmasi Pembayaran (Demo)
            </button>
          </>
        )}
        
        {paymentStatus === 'success' && (
          <button
            onClick={() => window.location.href = '/'}
            className="w-full py-3 px-4 bg-roblox-green text-white rounded-lg font-semibold hover:bg-green-600 transition-colors"
          >
            Kembali ke Beranda
          </button>
        )}
        
        {paymentStatus === 'failed' && (
          <button
            onClick={() => window.location.href = '/cart'}
            className="w-full py-3 px-4 bg-roblox-red text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
          >
            Coba Lagi
          </button>
        )}
      </div>

      {/* Payment Instructions */}
      {paymentStatus === 'pending' && (
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-semibold text-yellow-800 mb-3">Cara Pembayaran QRIS Static:</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="bg-white rounded-lg p-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-blue-600 text-xl">📱</span>
              </div>
              <p className="text-sm text-yellow-700 font-medium">Buka Aplikasi Berlogo QRIS</p>
            </div>
            <div className="bg-white rounded-lg p-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-blue-600 text-xl">📷</span>
              </div>
              <p className="text-sm text-yellow-700 font-medium">Scan QR Code</p>
            </div>
            <div className="bg-white rounded-lg p-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-blue-600 text-xl">✅</span>
              </div>
              <p className="text-sm text-yellow-700 font-medium">Bayar Langsung</p>
            </div>
          </div>
                      <div className="mt-4 p-3 bg-white rounded-lg">
              <p className="text-sm text-yellow-700">
                <strong>Merchant:</strong> SINGSAE BIBIL | <strong>NMID:</strong> ID2024355362912
              </p>
              <p className="text-sm text-yellow-700">
                <strong>Nominal:</strong> {formatPrice(amount)} | <strong>Order ID:</strong> {orderId}
              </p>
              <p className="text-xs text-gray-600 mt-2 font-mono break-all">
                <strong>QRIS Code:</strong> {dynamicQRISCode.substring(0, 50)}...
              </p>
              <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded">
                <p className="text-xs text-blue-700 font-medium">
                  💡 <strong>QRIS Dynamic:</strong> QRIS static dijadikan dynamic dengan nominal {formatPrice(amount)}!
                </p>
              </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default QRISPayment; 