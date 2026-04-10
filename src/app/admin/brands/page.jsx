"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function BrandAdmin() {
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  
  const [editingBrandId, setEditingBrandId] = useState(null);

  const [brandData, setBrandData] = useState({
    name: "",
    slug: "",
    img: "",
  });

  useEffect(() => {
    fetch('http://localhost:3007/brands').then(res => res.json()).then(data => setBrands(data));
    fetch('http://localhost:3007/products').then(res => res.json()).then(data => setProducts(data));
  }, []);

  const quantityByBrand = brands.map(brand => {
    return products.filter(product => product.brand_id === brand.id).length;
  });

  const handleEditBrand = (brand) => {
    setEditingBrandId(brand.id); 
    setShowForm(true); 
  };

  const handleSaveBrand = async (e) => {
    e.preventDefault();
    
    if (editingBrandId) {
      const res = await fetch(`http://localhost:3007/brands/${editingBrandId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(brandData)
      });

      if (res.ok) {
        const updatedBrand = await res.json();
        setBrands(brands.map(b => b.id === editingBrandId ? updatedBrand : b));
        alert("Cập nhật thành công!");
      }
    } else {
      const res = await fetch('http://localhost:3007/brands', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(brandData)
      });

      if (res.ok) {
        const addedBrand = await res.json();
        setBrands([...brands, addedBrand]);
      }
    }

    setShowForm(false);
    setEditingBrandId(null);
    setBrandData({ name: "", slug: "", img: "" });
  };

  const handleDeleteBrand = async (id) => {
    if (confirm("Bạn có chắc muốn xóa thương hiệu này?")) {
      const res = await fetch(`http://localhost:3007/brands/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setBrands(brands.filter(brand => brand.id !== id));
        const prodToDelete = products.filter(product => product.brand_id === id);
        const prodChangeStatus = prodToDelete.map(prod => 
          fetch(`http://localhost:3007/products/${prod.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: false })
          })
        );
        await Promise.all(prodChangeStatus);
      } else {
        alert("Xóa thương hiệu thất bại!");
      }
    }
  };

  return (
    <>
      <div className="ad-header">
        <h1 className="ad-title">Quản lý Thương hiệu</h1>
        <button 
          className="ad-btn ad-btn-primary" 
          onClick={() => {
            setShowForm(!showForm);
            setEditingBrandId(null); 
            setBrandData({ name: "", slug: "", img: "" });
          }}
        >
          {showForm ? "Đóng Form" : "+ Thêm thương hiệu mới"}
        </button>
      </div>

      {showForm && (
        <div className="ad-card" style={{ padding: '24px', marginBottom: '24px' }}>
          <h3 style={{ marginBottom: '16px' }}>
            {editingBrandId ? `Đang sửa thương hiệu ID: ${editingBrandId}` : "Nhập thông tin thương hiệu mới"}
          </h3>
          <form onSubmit={handleSaveBrand} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <input 
              type="text" 
              placeholder="Tên thương hiệu" 
              className="ad-btn" style={{ border: '1px solid #e2e8f0', background: 'white' }}
              value={brandData.name}
              onChange={(e) => setBrandData({...brandData, name: e.target.value})}
              required
            />
            <input 
              type="text" 
              placeholder="Slug" 
              className="ad-btn" style={{ border: '1px solid #e2e8f0', background: 'white' }}
              value={brandData.slug}
              onChange={(e) => setBrandData({...brandData, slug: e.target.value.toLowerCase()})}
              required
            />
            <input 
              type="text" 
              placeholder="Tên file ảnh" 
              className="ad-btn" style={{ border: '1px solid #e2e8f0', background: 'white' }}
              value={brandData.img}
              onChange={(e) => setBrandData({...brandData, img: e.target.value})}
              required
            />
            
            <button type="submit" className="ad-btn ad-btn-primary" style={{ gridColumn: 'span 2' }}>
              {editingBrandId ? "Cập nhật thay đổi" : "Lưu thương hiệu mới"}
            </button>
          </form>
        </div>
      )}

      <div className="ad-card">
        <table className="ad-table">
          <thead>
            <tr>
              <th>Thương hiệu</th>
              <th>Số lượng sản phẩm</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {brands.map((brand, index) => (
              <tr key={brand.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <Image 
                      src={`/assets/img/logo/${brand.img || 'default-logo.png'}`} 
                      alt={brand.name} 
                      style={{ borderRadius: '4px', objectFit: 'contain' }} 
                      width={60} 
                      height={30} 
                    />
                    <div style={{ fontWeight: '600', fontSize: '1rem' }}>{brand.name}</div>
                  </div>
                </td>
                <td><strong>{quantityByBrand[index] || 0} sản phẩm</strong></td>
                <td>
                  <button onClick={() => handleEditBrand(brand)} style={{ background: 'none', border: 'none', color: '#4f46e5', cursor: 'pointer', fontWeight: '600' }}>Sửa</button>
                  <button onClick={() => handleDeleteBrand(brand.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontWeight: '600', marginLeft: '12px' }}>Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}