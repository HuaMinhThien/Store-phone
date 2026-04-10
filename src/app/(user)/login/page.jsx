"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie"; 

export default function Login() {
  const [account, setAccount] = useState([]);
  

  useEffect(() => {
    fetch("http://localhost:3007/user")
      .then((res) => res.json())
      .then((data) => setAccount(data));
  }, []);

  const handle = (e) => {
    e.preventDefault();

    const fromData = new FormData(e.target);
    const data = Object.fromEntries(fromData.entries());

    const userCheck = account.find(
      (acc) => acc.email === data.email && acc.password === data.password
    );

    if (userCheck) {
      const userData = {
        id: userCheck.id,
        name: userCheck.name,
        email: userCheck.email,
        role: userCheck.role,
      };

      localStorage.setItem("user", JSON.stringify(userData));

      Cookies.set("userRole", userCheck.role, { expires: 1 }); 
      // Cookies.set("user", JSON.stringify(userData), { expires: 1 });

      alert("Đăng nhập thành công!");
      console.log(userCheck.role);
      

      if (userCheck.role === "admin") {
        window.location.href = "/admin"; 
      } else {
        window.location.href = "/"; 
      }
    } else {
      alert("Sai email hoặc mật khẩu!");
    }
  };


  return (
    <main className="container-center" style={{ marginTop: "70px" }}>
      <div className="auth-login-wrapper">
        <div className="auth-header">
          <h1>Đăng nhập</h1>
          <p>Truy cập tài khoản để tiếp tục mua sắm</p>
        </div>

        <div className="auth-form-container">
          <form action="#" method="post" onSubmit={handle}>
            <div className="auth-form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="example@gmail.com"
                required
                autoComplete="email"
              />
            </div>

            <div className="auth-form-group">
              <label htmlFor="password">Mật khẩu</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                required
                autoComplete="current-password"
              />
            </div>

            <div className="auth-options">
              <label>
                <input type="checkbox" name="remember" /> Ghi nhớ đăng nhập
              </label>
              <a href="#">Quên mật khẩu?</a>
            </div>

            <button type="submit" className="auth-btn auth-btn--primary">
              Đăng nhập
            </button>
            <a href="/register">
              <button type="button" className="auth-btn auth-btn--secondary">
                Đăng ký tài khoản mới
              </button>
            </a>
            
          </form>

          <div className="auth-divider">hoặc</div>

          <div className="auth-signup-text">
            Chưa có tài khoản? <a href="/register">Đăng ký ngay</a>
          </div>
        </div>
      </div>
    </main>
  );
}
