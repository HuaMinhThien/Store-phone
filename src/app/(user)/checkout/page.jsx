"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CheckOut() {
    const router = useRouter();
    const [cart, setCart] = useState([]);
    
    // 1. State cho thông tin đơn hàng
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
        note: ""
    });

    const [userId, setUserId] = useState(0);

    useEffect(() => {
        if (typeof window !== "undefined") {
            // Lấy giỏ hàng
            const savedCart = localStorage.getItem("cart");
            setCart(savedCart ? JSON.parse(savedCart) : []);

            // 2. Logic kiểm tra đăng nhập
            const savedUser = localStorage.getItem('user');
            if (savedUser) {
                const user = JSON.parse(savedUser);
                setUserId(user.id || 0);
                // Tự động điền form nếu đã đăng nhập
                setFormData({
                    name: user.name || "",
                    phone: user.phone || "",
                    email: user.email || "",
                    address: user.address || "",
                    note: ""
                });
            }
        }
    }, []);

    // Hàm cập nhật khi nhập liệu vào form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // 3. Tính tổng đơn hàng
    const totalAmount = cart.reduce((sum, item) => sum + (item.storage_options.price * item.cart_quantity), 0);

    const handleCheckOut = async () => {
        try {
            const gioHang = {
                "id_user": userId, // 0 nếu là khách, id nếu là thành viên
                "name_user": formData.name,
                "email_user": formData.email,
                "address": formData.address,
                "phone": formData.phone,
                "note": formData.note,
                "status": "Đang xử lý",
                "total_price": totalAmount, // Lưu tổng đơn hàng
                "cart": cart,
                "created_at": new Date().toISOString()
            };

            const res = await fetch("http://localhost:3007/order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(gioHang),
            });

            if (res.ok) {
                localStorage.removeItem("cart");
                alert("Đặt hàng thành công!");
                router.push('/');
            }
        } catch (error) {
            console.error("Lỗi khi đặt hàng:", error);
        }
    };

    return (
        <main className="as-checkout">
            <div className="as-checkout__container">
                <div className="as-checkout__main">
                    <section className="as-checkout__section">
                        <h2 className="as-checkout__title">1. Thông tin người mua</h2>
                        <div className="as-checkout__row">
                            <input 
                                type="text" name="name" style={{ width: "363px" }} className="as-input" 
                                placeholder="Họ và tên" value={formData.name} onChange={handleChange} 
                            />
                            <input 
                                type="tel" name="phone" style={{ width: "363px" }} className="as-input" 
                                placeholder="Số điện thoại" value={formData.phone} onChange={handleChange} 
                            />
                        </div>
                        <input 
                            type="email" name="email" style={{ width: "775px" }} className="as-input" 
                            placeholder="Email nhận thông báo" value={formData.email} onChange={handleChange} 
                        />

                        <h2 className="as-checkout__title">2. Địa chỉ giao hàng</h2>
                        <input 
                            type="text" name="address" style={{ width: "780px" }} className="as-input" 
                            placeholder="Địa chỉ cụ thể (số nhà, tên đường...)" value={formData.address} onChange={handleChange} 
                        />
                        <textarea 
                            name="note" className="as-textarea" style={{ width: "780px" }} 
                            placeholder="Ghi chú về đơn hàng" value={formData.note} onChange={handleChange} 
                        ></textarea>

                        <h2 className="as-checkout__title">3. Phương thức thanh toán</h2>
                        <div className="as-payment">
                            <label className="as-payment__item">
                                <input type="radio" name="pay-method" className="as-payment__radio" defaultChecked />
                                <span className="as-payment__text">Thanh toán khi nhận hàng (COD)</span>
                            </label>
                        </div>
                    </section>
                </div>

                <aside className="as-checkout__sidebar">
                    <div className="as-summary" style={{ marginTop: "40px" }}>
                        <h2 className="cart-summary-title">Tóm tắt đơn hàng</h2>
                        <div className="as-summary__list">
                            {cart.map(item => (
                                <div key={item.id} className="as-prod-item">
                                    <div className="as-prod-item__info">
                                        <p className="as-prod-item__name">{item.name} (x{item.cart_quantity})</p>
                                        <p className="as-prod-item__price">{(item.storage_options.price * item.cart_quantity).toLocaleString("vi-VN")}₫</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="cart-order-summary">
                            <div className="cart-summary-row cart-summary-total">
                                <span className="cart-summary-label">Tổng cộng</span>
                                <span className="cart-summary-value cart-total-price">
                                    {totalAmount.toLocaleString("vi-VN")}₫
                                </span>
                            </div>
                        </div>

                        <button className="as-btn as-btn--primary as-btn--large" onClick={handleCheckOut}>
                            ĐẶT HÀNG NGAY
                        </button>
                    </div>
                </aside>
            </div>
        </main>
    );
}