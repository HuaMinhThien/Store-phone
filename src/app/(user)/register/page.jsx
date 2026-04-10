"use client"

import { useRouter } from "next/navigation";
import { useState } from "react"

export default function Register() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [place, setPlace] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirm_password, setConfirm_password] = useState("");

    const handleregister = (e) =>{
        e.preventDefault();
        console.log(name, email, phone, place, password, confirm_password);
        
        const user = {
            
            "name": name,
            "email": email,
            "phone": phone,
            "password": password,
            "address": place,
            "role": "user",
            "status": true
        }
        handleAddUser(user);
        alert("Đăng ký tài khoản thành công");
        router.push("/login");
    }
    const handleAddUser = async (user) => {
        try {
            const res = await fetch("http://localhost:3007/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });
            const data = await res.json(); 
            console.log(data);
                   
        } catch (error) {
            console.error("Lỗi khi thêm:", error);
        }
    };

    return(
        <main className="container-center " style={{marginTop: "70px"}}>
            <div className="reg-wrapper">
                <div className="reg-header">
                <h1>Đăng ký</h1>
                <p>Tạo tài khoản mới để mua sắm dễ dàng hơn</p>
                </div>

                <div className="reg-form-container">
                <form action="#" method="post" onSubmit={handleregister}>
                    <div className="reg-form-group">
                        <label htmlFor="reg-username">Tên hiển thị</label>
                        <input 
                            type="text" 
                            id="reg-username" 
                            name="username" 
                            placeholder="Nhập tên của bạn" 
                            required 
                            autocomplete="username"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="reg-form-group">
                        <label htmlFor="reg-email">Email</label>
                        <input 
                            type="email" 
                            id="reg-email" 
                            name="email" 
                            placeholder="example@gmail.com" 
                            required 
                            autocomplete="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="reg-form-group">
                        <label htmlFor="reg-phone">Số điện thoại</label>
                        <input 
                            type="text" 
                            id="reg-phone" 
                            name="phone" 
                            placeholder="Nhập số điện thoại của bạn" 
                            required 
                            autocomplete="tel"
                            onChange={(e) => setPhone(e.target.value)}
                        />

                    </div>

                    <div className="reg-form-group">
                        <label htmlFor="reg-address">Địa chỉ</label>
                        <input 
                            type="text" 
                            id="reg-address" 
                            name="address" 
                            placeholder="Nhập địa chỉ của bạn" 
                            required 
                            autocomplete="street-address"
                            onChange={(e) => setPlace(e.target.value)}
                        />
                    </div>

                    <div className="reg-form-group">
                        <label htmlFor="reg-password">Mật khẩu</label>
                        <input 
                            type="password" 
                            id="reg-password" 
                            name="password" 
                            placeholder="••••••••" 
                            required 
                            autocomplete="new-password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {password.length < 6 ? <div style={{color: "red"}}>Mật khẩu quá ngắn</div> : ""}
                    </div>

                    <div className="reg-form-group">
                        <label htmlFor="reg-confirm-password">Nhập lại mật khẩu</label>
                        <input 
                            type="password" 
                            id="reg-confirm-password" 
                            name="confirm-password" 
                            placeholder="••••••••"
                            required 
                            autocomplete="new-password"
                            onChange={(e) => setConfirm_password(e.target.value)}
                        />
                    </div>

                    <button disabled={!name || !email || !place || !password || !confirm_password} type="submit" className="reg-btn reg-btn--primary">Đăng ký</button>
                    <button type="button" className="reg-btn reg-btn--secondary" >Quay lại đăng nhập</button>
                </form>

                <div className="reg-divider">hoặc</div>

                <div className="reg-login-text">
                    Đã có tài khoản? <a href="/login">Đăng nhập ngay</a>
                </div>
                </div>
            </div>
        </main>


    )
}







