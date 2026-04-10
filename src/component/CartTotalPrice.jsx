"use client"

import { useEffect, useState } from "react"

export default function CartTotalPrice(){
    const [cart, setCart] = useState([]);
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        setCart(JSON.parse(savedCart) || [])
    }, []);

    const tongProdInCart = 0;
    cart.forEach((item) => {
        tongProdInCart += item.quantity;
    });
    console.log(tongProdInCart);
    
    return(
        <div className="cart-order-summary">
            <div className="cart-summary-row">
            <span className="cart-summary-label">
                Tạm tính ({})
            </span>
            <span className="cart-summary-value">66.550.000₫</span>
            </div>

            <div className="cart-summary-row">
            <span className="cart-summary-label">Phí vận chuyển</span>
            <span className="cart-summary-value">0₫</span>
            </div>

            <div className="cart-summary-row">
            <span className="cart-summary-label">Giảm giá</span>
            <span className="cart-summary-value">-2.000.000₫</span>
            </div>

            <div className="cart-summary-row cart-summary-total">
            <span className="cart-summary-label">Tổng cộng</span>
            <span className="cart-summary-value cart-total-price">
                64.550.000₫
            </span>
            </div>
        </div>
    )
}


