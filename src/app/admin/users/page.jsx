"use client";

import { useEffect, useState } from "react";

export default function UserAdmin() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3007/user').then(res => res.json()).then(data => setUsers(data));
  }, [])

  const handleRoleChange = async (userId, newRole) => {
    if (!window.confirm(`Xác nhận đổi vai trò sang ${newRole}?`)) return;

    try {
      const response = await fetch(`http://localhost:3007/user/${userId}`, {
        method: 'PATCH', // Hoặc PUT tùy API của bạn
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole })
      });

      if (response.ok) {
        setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
        alert("Cập nhật quyền thành công!");
      }
    } catch (error) {
      alert("Có lỗi xảy ra khi cập nhật!");
    } 
  };

  return (
    <>
      <div className="ad-header">
        <h1 className="ad-title">Quản lý Người dùng</h1>
        <div style={{ display: 'flex', gap: '12px' }}>
           <input type="text" placeholder="Tìm người dùng..." className="ad-btn" style={{ border: '1px solid #e2e8f0', background: 'white' }} />
           <button className="ad-btn" style={{ background: 'white', border: '1px solid #e2e8f0' }}>Tìm kiếm</button>
        </div>
      </div>

      <div className="ad-card">
        <table className="ad-table">
          <thead>
            <tr>
              <th>Họ tên</th>
              <th>Email</th>
              <th>Vai trò</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div>
                      <div style={{ fontWeight: '600' }}>{user.name}</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>SDT: 0906761390</div>
                  </div>
                </div>
              </td> 
              <td>{user.email}</td>
              <td><span className="ad-badge" style={{ background: '#ddd', color: '#334155' }}>{user.role}</span></td>
              <td><span className="ad-badge" style={{ background: '#dcfce7', color: '#166534' }}>{user.status ? 'Hoạt động' : 'Đã khóa'}</span></td>
              <td>                                                                              
                <select 
                    className="ad-btn"
                    style={{ padding: '4px', fontSize: '0.8rem', cursor: 'pointer', marginRight: '8px' }}
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  >
                    <option value="user">User (Khách)</option>
                    <option value="admin">Admin (Quản trị)</option>
                  </select>

              </td>
              
            </tr>))}
            
          </tbody>
        </table>
      </div>
    </>
  );
}