"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ShowProductsALL from "../../../component/ShowProductsALL";

export default function Product() {


  if(!ShowProductsALL) {
    return <div style={{ marginTop: '70px' }}>Loading...</div>;
  }

  return (
    <main className="container-center" style={{ marginTop: '70px' }}>
      <div className="layout12col">
        {/* Banner đầu trang */}
        <div className="banner-ProdPage1" style={{ gridColumn: '1/13' }}>
          <Image 
            src="/assets/img/banner/H1_1440x242_a662c6cd0c.webp" 
            alt="Banner Khuyến Mãi" 
            width={1300} 
            height={220} 
            style={{ width: '100%', height: 'auto', borderRadius: '15px' }}
          />
        </div>

        <div className="show-brand-slide">
          {/* Nội dung slide thương hiệu */}
        </div>

        <aside className="sidebar" style={{ gridColumn: '1/4' }}>
          <h3>Danh mục</h3>
          <ul className="boxShowCate">
            <li><Link href="#">Điện thoại</Link></li>
            <li><Link href="#">Laptop</Link></li>
            <li><Link href="#">Phụ kiện</Link></li>
            <li><Link href="#">Đồng hồ thông minh</Link></li>
            <li><Link href="#">Máy tính bảng</Link></li>
          </ul>

          <h3>Thương hiệu</h3>
          <ul>
            <li><Link href="#">Apple</Link></li>
            <li><Link href="#">Samsung</Link></li>
            <li><Link href="#">Xiaomi</Link></li>
            <li><Link href="#">OPPO</Link></li>
            <li><Link href="#">Vivo</Link></li>
            <li><Link href="#">Realme</Link></li>
          </ul>

          <h3>Khoảng giá</h3>
          <div className="price-range-filter">
            <div className="price-range-display">
              <span className="price-min-display">0đ</span>
              <span className="price-max-display">50 triệu</span>
            </div>
            
            <div className="price-range-slider-container">
              <div className="price-range-slider-track"></div>
              <input type="range" min="0" max="50000000" step="100000" defaultValue="0" className="price-range-slider" id="priceRangeMin" />
              <input type="range" min="0" max="50000000" step="100000" defaultValue="50000000" className="price-range-slider" id="priceRangeMax" />
            </div>
            
            {/* Ô hiển thị giá khi kéo */}
            <div className="price-preview-container">
              <div className="price-preview-box" id="pricePreview">
                <div className="price-preview-header">
                  <span className="price-preview-title">Khoảng giá đã chọn</span>
                  <span className="price-preview-close">×</span>
                </div>
                <div className="price-preview-content">
                  <div className="price-preview-row">
                    <span className="price-preview-label">Giá thấp nhất:</span>
                    <span className="price-preview-value" id="previewMinPrice">0đ</span>
                  </div>
                  <div className="price-preview-row">
                    <span className="price-preview-label">Giá cao nhất:</span>
                    <span className="price-preview-value" id="previewMaxPrice">50.000.000đ</span>
                  </div>
                </div>
                <div className="price-preview-actions">
                  <button className="price-preview-cancel" id="cancelPrice">Hủy</button>
                  <button className="price-preview-apply" id="applyPrice">Áp dụng</button>
                </div>
              </div>
            </div>
            
            {/* Các checkbox giá cố định */}
            <div className="price-quick-options">
              {[
                { id: 'option1', label: 'Dưới 5 triệu' },
                { id: 'option2', label: '5 - 10 triệu' },
                { id: 'option5', label: 'Trên 25 triệu' }
              ].map((opt) => (
                <div className="price-option" key={opt.id}>
                  <input type="radio" name="priceOption" id={opt.id} className="price-option-radio" />
                  <label htmlFor={opt.id} className="price-option-label">{opt.label}</label>
                </div>
              ))}
            </div>
          </div>

          <h3>Dung lượng ROM</h3>
          <div className="rom-options">
            {['32GB', '64GB', '128GB', '256GB'].map((rom) => (
              <div key={rom}>
                <input type="checkbox" id={`rom${rom}`} hidden />
                <label htmlFor={`rom${rom}`}>{rom}</label>
              </div>
            ))}
          </div>
        </aside>

        {/* Danh sách sản phẩm */}
        <section className="products" style={{ gridColumn: '4/13', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
          <ShowProductsALL />


        </section>
      </div>
    </main>
  );
}