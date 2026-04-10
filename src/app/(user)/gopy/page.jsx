"use client"

import { useState } from "react";

export default function GopY() {

    const [gopY, themGopY] = useState('');
    const [danhSachGopY, themDanhSachGopY] = useState([]);
    const handleDelete = (index) => () => {
        const newDanhSachGopY = [...danhSachGopY];
        newDanhSachGopY.splice(index, 1);
        themDanhSachGopY(newDanhSachGopY);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (gopY != '' || gopY.trim() != '') {
            themDanhSachGopY([...danhSachGopY, gopY]);
            themGopY('');
        }
    };

    return (
        <div style={{marginTop: "80px"}}>
            <form onSubmit={handleSubmit}>
                <h1>Góp ý</h1>
                <input type="text" value={gopY} placeholder="Nhập góp ý của bạn..." onChange={(e) => themGopY(e.target.value)} />
                <button type="submit">Gửi góp ý</button>
            </form>

            

            <h3> Gop y da gui</h3>
            <ul>
                {danhSachGopY.map((noiDung, index) => (
                    <li key={index}>{noiDung} <button type="button" onClick={handleDelete(index)}>Xóa</button></li>
                ))}
            </ul>
        </div>
    )
}