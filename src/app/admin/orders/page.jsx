"use client";

import { useEffect, useState } from "react";

export default function OrderAdmin() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null); // Lưu đơn hàng đang xem chi tiết
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 1. Lấy danh sách đơn hàng
  const fetchOrders = async () => {
    const res = await fetch("http://localhost:3007/order");
    const data = await res.json();
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // 2. Cập nhật trạng thái đơn hàng
  const updateStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch(`http://localhost:3007/order/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
        alert("Cập nhật trạng thái thành công!");
      }
    } catch (error) {
      console.error("Lỗi cập nhật:", error);
    }
  };

  // 3. Mở xem chi tiết
  const openDetail = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="ad-header">
        <h1 className="ad-title">Quản lý Đơn hàng</h1>
        <div style={{ display: 'flex', gap: '12px' }}>
          <input type="text" placeholder="Tìm mã đơn..." className="ad-btn" style={{ border: '1px solid #e2e8f0', background: 'white' }} />
          <button className="ad-btn" style={{ background: 'white', border: '1px solid #e2e8f0' }}>Lọc</button>
        </div>
      </div>

      <div className="ad-card">
        <table className="ad-table">
          <thead>
            <tr>
              <th>ID Đơn</th>
              <th>Khách hàng</th>
              <th>Ngày đặt</th>
              <th>Tổng tiền</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td><strong>#ORD-{order.id}</strong></td>
                <td>
                   <div>{order.name_user}</div>
                   <div style={{fontSize: '11px', color: '#666'}}>{order.phone}</div>
                </td>
                <td>{new Date(order.created_at).toLocaleDateString("vi-VN")}</td>
                <td><strong>{order.total_price?.toLocaleString("vi-VN")}đ</strong></td>
                <td>
                  <select 
                    value={order.status} 
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                    style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      border: '1px solid #ddd',
                      background: order.status === 'Hoàn thành' ? '#dcfce7' : '#fef3c7'
                    }}
                  >
                    <option value="Đang xử lý">Đang xử lý</option>
                    <option value="Đang giao">Đang giao</option>
                    <option value="Hoàn thành">Hoàn thành</option>
                    <option value="Đã hủy">Đã hủy</option>
                  </select>
                </td>
                <td>
                  <button 
                    className="ad-btn" 
                    style={{ fontSize: '0.8rem', padding: '6px 12px', background: '#3b82f6', color: 'white' }}
                    onClick={() => openDetail(order)}
                  >
                    Chi tiết
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedOrder && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
        }}>
          <div style={{ background: 'white', padding: '24px', borderRadius: '8px', width: '600px', maxHeight: '80vh', overflowY: 'auto' }}>
            <h2>Chi tiết đơn hàng #{selectedOrder.id}</h2>
            <hr />
            <p><strong>Người nhận:</strong> {selectedOrder.name_user}</p>
            <p><strong>Địa chỉ:</strong> {selectedOrder.address}</p>
            <p><strong>Ghi chú:</strong> {selectedOrder.note || "Không có"}</p>
            
            <table style={{ width: '100%', marginTop: '15px', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #eee', textAlign: 'left' }}>
                  <th>Sản phẩm</th>
                  <th>SL</th>
                  <th>Giá</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrder.cart.map((item, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '8px 0' }}>{item.name}</td>
                    <td>{item.cart_quantity}</td>
                    <td>{item.storage_options.price.toLocaleString("vi-VN")}đ</td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div style={{ textAlign: 'right', marginTop: '20px' }}>
              <h3>Tổng cộng: {selectedOrder.total_price?.toLocaleString("vi-VN")}đ</h3>
              <button 
                className="ad-btn" 
                style={{ background: '#ef4444', color: 'white', marginTop: '10px' }}
                onClick={() => setIsModalOpen(false)}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}