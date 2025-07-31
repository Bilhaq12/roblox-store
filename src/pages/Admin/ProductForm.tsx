import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Save, 
  X, 
  Upload,
  Package
} from 'lucide-react';
import { Product } from '../../lib/supabase';
import { productService } from '../../services/api';

const ProductForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: 'robux-login' as Product['category'],
    stock: '',
    popular: false,
    delivery_time: ''
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEditing) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    if (!id) return;
    
    setLoading(true);
    try {
      const product = await productService.getById(id);
      if (product) {
        setFormData({
          name: product.name,
          description: product.description,
          price: product.price.toString(),
          image: product.image,
          category: product.category,
          stock: product.stock.toString(),
          popular: product.popular || false,
          delivery_time: product.delivery_time || ''
        });
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        image: formData.image,
        category: formData.category,
        stock: parseInt(formData.stock),
        popular: formData.popular,
        delivery_time: formData.delivery_time
      };

      if (isEditing && id) {
        await productService.update(id, productData);
      } else {
        await productService.create(productData);
      }

      navigate('/admin/products');
    } catch (error) {
      console.error('Error saving product:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const categories = [
    { value: 'robux-login', label: 'Robux Via Login' },
    { value: 'robux-gamepass', label: 'Robux Gamepass' },
    { value: 'items', label: 'Limited Items' },
    { value: 'passes', label: 'Game Passes' },
    { value: 'joki', label: 'Joki Services' }
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {isEditing ? 'Edit Produk' : 'Tambah Produk Baru'}
              </h1>
              <p className="text-gray-600">
                {isEditing ? 'Edit informasi produk' : 'Tambahkan produk baru ke katalog'}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/admin/products')}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center"
              >
                <X className="w-4 h-4 mr-2" />
                Batal
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Informasi Dasar</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Produk *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-roblox-red focus:border-transparent"
                    placeholder="Masukkan nama produk"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kategori *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-roblox-red focus:border-transparent"
                  >
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deskripsi Produk *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-roblox-red focus:border-transparent"
                  placeholder="Masukkan deskripsi produk"
                />
              </div>
            </div>

            {/* Pricing & Stock */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Harga & Stok</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Harga (Rp) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-roblox-red focus:border-transparent"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stok *
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    required
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-roblox-red focus:border-transparent"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Waktu Pengiriman
                  </label>
                  <input
                    type="text"
                    name="delivery_time"
                    value={formData.delivery_time}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-roblox-red focus:border-transparent"
                    placeholder="Contoh: Instan, 1-2 hari"
                  />
                </div>
              </div>
            </div>

            {/* Image */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Gambar Produk</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL Gambar *
                </label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-roblox-red focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                />
                {formData.image && (
                  <div className="mt-4">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-lg border"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Settings */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Pengaturan</h3>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="popular"
                  checked={formData.popular}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-roblox-red focus:ring-roblox-red border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Tandai sebagai produk populer
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-6 border-t">
              <button
                type="button"
                onClick={() => navigate('/admin/products')}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2 bg-roblox-red text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center"
              >
                {saving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    {isEditing ? 'Update Produk' : 'Tambah Produk'}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductForm; 