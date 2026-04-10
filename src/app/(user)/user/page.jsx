"use client"

import { useEffect, useState } from "react"
import Cookies from 'js-cookie';

export default function Contact(){
    const user = JSON.parse(localStorage.getItem('user') || "[]");

    const handleLogOut =()=>{
        localStorage.removeItem("user");
        Cookies.remove("userRole");
        
        alert("Đăng xuất thành công!");
        window.location.href = "/login";
    }
    return(
        <main className="user-dashboard" style={{marginTop: "50px"}}>
            <div className="container dashboard-grid">
                <aside className="user-sidebar">
                    <div className="user-info-brief">
                        <div className="avatar-circle">NT</div>
                        <h3>{user.name}</h3>
                        <p>Thành viên Vàng (Gold)</p> 
                    </div>
                    <nav className="user-nav">
                        <a href="#" className="nav-item active">📦 Đơn hàng của tôi</a>
                        <a href="#" className="nav-item">👤 Thông tin tài khoản</a>
                        <a href="#" className="nav-item">📍 Sổ địa chỉ</a>
                        <a href="#" className="nav-item">🔔 Thông báo</a>
                        <a href="#" className="nav-item logout" onClick={handleLogOut}>🚪 Đăng xuất</a>
                    </nav>
                </aside>

                <section className="user-content">
                    <h2 className="section-title">Đơn hàng gần đây</h2>
                    
                    <div className="order-list">
                        <div className="order-card">
                            <div className="order-header">
                                <span className="order-id">Mã đơn: #AURA-99231</span>
                                <span className="order-status status-shipping">Đang giao</span>
                            </div>
                            <div className="order-body">
                                <div className="product-item">
                                    <div className="product-img">📱</div>
                                    <div className="product-info">
                                        <h4>iPhone 15 Pro Max - Natural Titanium</h4>
                                        <p>Số lượng: 01</p>
                                    </div>
                                </div>
                                <div className="order-total">
                                    <p>Tổng tiền: <strong>32.990.000đ</strong></p>
                                </div>
                            </div>
                            <div className="order-footer">
                                <button className="btn-detail">Xem chi tiết</button>
                            </div>
                        </div>

                        <div className="order-card">
                            <div className="order-header">
                                <span className="order-id">Mã đơn: #AURA-88120</span>
                                <span className="order-status status-success">Đã hoàn thành</span>
                            </div>
                            <div className="order-body">
                                <div className="product-item">
                                    <div className="product-img">🎧</div>
                                    <div className="product-info">
                                        <h4>AirPods Pro (Gen 2) - USB-C</h4>
                                        <p>Số lượng: 01</p>
                                    </div>
                                </div>
                                <div className="order-total">
                                    <p>Tổng tiền: <strong>5.490.000đ</strong></p>
                                </div>
                            </div>
                            <div className="order-footer">
                                <button className="btn-detail">Mua lại</button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    )
}