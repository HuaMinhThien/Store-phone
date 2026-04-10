"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function ProductAdmin() {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);

  // --- STATE DÀNH CHO LỌC ---
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBrand, setFilterBrand] = useState("");

  const initialForm = {
    name: "",
    brand_id: "",
    img: "",
    quantity: 0, 
    status: true,
    slug: "",
    sold: 0,
    display_sale_percent: 0,
    storage_options: [{ storage: "", price: "", old_price: "", sale_percent: 0 }]
  };

  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    fetch('http://localhost:3007/products').then(res => res.json()).then(data => setProducts(data));
    fetch('http://localhost:3007/brands').then(res => res.json()).then(data => setBrands(data));
  }, []);

  // --- LOGIC LỌC SẢN PHẨM ---
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = filterBrand === "" || product.brand_id === filterBrand;
    return matchesSearch && matchesBrand;
  });

  // --- LOGIC BIẾN THỂ ---
  const updateStorageOption = (index, field, value) => {
    const updatedOptions = formData.storage_options.map((option, i) => {
      if (i === index) {
        if (field === 'price' || field === 'old_price') {
          return { ...option, [field]: value === '' ? '' : Number(value) };
        }
        return { ...option, [field]: value };
      }
      return option;
    });
    setFormData({ ...formData, storage_options: updatedOptions });
  };

  // --- LOGIC LƯU (THÊM & SỬA) ---
  const handleSaveProduct = async (e) => {
    e.preventDefault();
    const method = editingProductId ? 'PUT' : 'POST';
    const url = editingProductId ? `http://localhost:3007/products/${editingProductId}` : 'http://localhost:3007/products';

    const res = await fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (res.ok) {
      const data = await res.json();
      setProducts(editingProductId ? products.map(p => p.id === editingProductId ? data : p) : [...products, data]);
      setShowForm(false);
      setEditingProductId(null);
      setFormData(initialForm);
      alert("Đã lưu sản phẩm thành công!");
    }
  };

  const handleEditClick = (product) => {
    setEditingProductId(product.id);
    setFormData({ ...product });
    setShowForm(true);
  };

  const handleDeleteProduct = async (id) => {
    if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) {
      try {
        const res = await fetch(`http://localhost:3007/products/${id}`, { method: 'DELETE' });
        if (res.ok) {
          setProducts(products.filter(product => product.id !== id));
          alert("Xóa sản phẩm thành công!");
        }
      } catch (error) {
        console.error("Lỗi xóa sản phẩm:", error);
      }
    }
  };

  return (
    <>
      <div className="ad-header">
        <h1 className="ad-title">Quản lý Sản phẩm Aura Dream</h1>
        <button className="ad-btn ad-btn-primary" onClick={() => { setShowForm(!showForm); setEditingProductId(null); setFormData(initialForm); }}>
          {showForm ? "Đóng Form" : "+ Thêm sản phẩm"}
        </button>
      </div>

      {/* --- THANH CÔNG CỤ LỌC --- */}
      <div className="ad-card" style={{ padding: '15px', marginBottom: '20px', display: 'flex', gap: '15px', alignItems: 'center' }}>
        <div style={{ flex: 2 }}>
          <input 
            type="text" 
            placeholder="Tìm kiếm sản phẩm theo tên..." 
            className="ad-btn" 
            style={{ width: '40vw', textAlign: 'left', border: '1px solid #ddd', background: '#fff' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div style={{ flex: 1 }}>
          <select 
            className="ad-btn" 
            style={{ width: '100%', textAlign: 'left', border: '1px solid #ddd', background: '#fff' }}
            value={filterBrand}
            onChange={(e) => setFilterBrand(e.target.value)}
          >
            <option value="">Tất cả thương hiệu</option>
            {brands.map(brand => <option key={brand.id} value={brand.id}>{brand.name}</option>)}
          </select>
        </div>
        <div style={{ color: '#64748b', fontSize: '0.9rem' }}>
          Tìm thấy: <strong>{filteredProducts.length}</strong> sản phẩm
        </div>
      </div>

      {showForm && (
        <div className="ad-card" style={{ padding: '24px', marginBottom: '24px' }}>
          <form onSubmit={handleSaveProduct}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', marginBottom: '15px' }}>
              <div>
                <label>Tên sản phẩm</label>
                <input type="text" className="ad-btn" style={{ width: '100%', textAlign: 'left', border: '1px solid #ddd' }} 
                  value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
              </div>
              <div>
                <label>Thương hiệu</label>
                <select className="ad-btn" style={{ width: '100%', textAlign: 'left', border: '1px solid #ddd' }}
                  value={formData.brand_id} onChange={(e) => setFormData({...formData, brand_id: e.target.value})} required>
                  <option value="">Chọn hãng</option>
                  {brands.map(brand => <option key={brand.id} value={brand.id}>{brand.name}</option>)}
                </select>
              </div>
              <div>
                <label>Số lượng tổng</label>
                <input type="number" className="ad-btn" style={{ width: '100%', textAlign: 'left', border: '1px solid #ddd' }} 
                  value={formData.quantity} onChange={(e) => setFormData({...formData, quantity: Number(e.target.value)})} required />
              </div>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label>Tên file hình ảnh (vd: iphone-15.jpg)</label>
              <input type="text" className="ad-btn" style={{ width: '100%', textAlign: 'left', border: '1px solid #ddd' }} 
                value={formData.img} onChange={(e) => setFormData({...formData, img: e.target.value})} required />
            </div>

            <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h4 style={{ marginBottom: '10px' }}>Chi tiết biến thể</h4>
              {formData.storage_options.map((option, index) => (
                <div key={index} style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 2fr 1fr', gap: '10px', marginBottom: '10px' }}>
                  <input type="text" placeholder="Dung lượng" className="ad-btn" style={{ background: '#fff' }}
                    value={option.storage} onChange={(e) => updateStorageOption(index, 'storage', e.target.value)} required />
                  <input type="number" placeholder="Giá bán hiện tại" className="ad-btn" style={{ background: '#fff' }}
                    value={option.price} onChange={(e) => updateStorageOption(index, 'price', e.target.value)} required />
                  <input type="number" placeholder="Giá cũ (nếu có)" className="ad-btn" style={{ background: '#fff' }}
                    value={option.old_price} onChange={(e) => updateStorageOption(index, 'old_price', e.target.value)} />
                  {formData.storage_options.length > 1 && (
                    <button type="button" onClick={() => setFormData({...formData, storage_options: formData.storage_options.filter((_, i) => i !== index)})}
                      style={{ background: '#fee2e2', color: '#ef4444', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Xóa</button>
                  )}
                </div>
              ))}
              <button type="button" className="ad-btn" onClick={() => setFormData({...formData, storage_options: [...formData.storage_options, { storage: "", price: "", old_price: "" }]})} 
                style={{ background: '#fff', border: '1px dashed #4f46e5', color: '#4f46e5' }}>+ Thêm biến thể</button>
            </div>

            <button type="submit" className="ad-btn ad-btn-primary" style={{ marginTop: '20px', width: '100%' }}>Lưu thông tin sản phẩm</button>
          </form>
        </div>
      )}

      <div className="ad-card">
        <table className="ad-table">
          <thead>
            <tr>
              <th>Hình ảnh & Tên</th>
              <th>Hãng</th>
              <th>Kho hàng</th>
              <th>Biến thể</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(product => (
              <tr key={product.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img src={`/assets/img/prod/${product.img || 'placeholder.webp'}`} width={45} height={45} alt="sp" style={{ borderRadius: '5px', objectFit: 'cover' }} />
                    <div style={{ fontWeight: '600' }}>{product.name}</div>
                  </div>
                </td>
                <td>{brands.find(b => b.id === product.brand_id)?.name}</td>
                <td>
                  <span className="ad-badge" style={{ background: product.quantity > 0 ? '#dcfce7' : '#fee2e2', color: product.quantity > 0 ? '#166534' : '#991b1b' }}>
                    Còn {product.quantity || 0} sp
                  </span>
                </td>
                <td>{product.storage_options?.length || 0} bản</td>
                <td>
                  <button onClick={() => handleEditClick(product)} style={{ background: 'none', border: 'none', color: '#4f46e5', cursor: 'pointer', fontWeight: '600' }}>Sửa</button>
                  <button onClick={() => handleDeleteProduct(product.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontWeight: '600', marginLeft: '12px' }}>Xóa</button>
                </td>
              </tr>
            ))}
            {filteredProducts.length === 0 && (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '30px', color: '#64748b' }}>
                  Không tìm thấy sản phẩm nào khớp với bộ lọc.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}