"use client";

import Cookies from 'js-cookie';
import Link from 'next/link';
import { usePathname } from 'next/navigation';  
import '../../css/css-admin/admin-main.css';

export default function AdminLayout({ children }) {
  const pathname = usePathname(); 

  const handleLogOut = () => {
    localStorage.removeItem("user");
    Cookies.remove("userRole");
    alert("Đăng xuất thành công!");
    window.location.href = "/login";
  };

  const isActive = (path) => pathname === path ? "is-active" : "";

  return (
    <div className="aura-admin-scope">
      <div className="ad-container">
        <aside className="ad-sidebar">
          <div className="ad-logo">AURA STORE</div>
          
          <nav style={{ flex: 1 }}>
            <Link href="/admin/products" className={`ad-nav-item ${isActive('/admin/products')}`}>
              <span>📦 Sản phẩm</span>
            </Link>
            <Link href="/admin/brands" className={`ad-nav-item ${isActive('/admin/brands')}`}>
              <span>🏷️ Thương hiệu</span>
            </Link>
            <Link href="/admin/users" className={`ad-nav-item ${isActive('/admin/users')}`}>
              <span>👥 Người dùng</span>
            </Link>
            <Link href="/admin/orders" className={`ad-nav-item ${isActive('/admin/orders')}`}>
              <span>🛒 Đơn hàng</span>
            </Link>
          </nav>
          
          <div style={{ padding: '24px', borderTop: '1px solid #e2e8f0' }}>
            <button onClick={handleLogOut} className="ad-nav-item logout-btn" style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer' }}>
              🚪 Đăng xuất
            </button>
            <Link href="/" className="ad-nav-item">
              🚀 Về trang chủ
            </Link>
          </div>
        </aside>

        <main className="ad-main">
          {children}
        </main>
      </div>
    </div>
  );
}