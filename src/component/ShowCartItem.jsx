"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function ShowCartItem() {
    const [cart, setCart] = useState(() => {
        if (typeof window !== "undefined") {
            const savedCart = localStorage.getItem("cart");
            return savedCart ? JSON.parse(savedCart) : [];
        }
        return [];
    });

    const newQuantity = (newQty, id_prod) => {
        if (newQty < 1) return;

        const updatedCart = cart.map((item) => {
            if (item.id === id_prod) {
                return { ...item, cart_quantity: newQty };
            }   
            return item;
        });

        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const handleDeleteItem = (id_prod)=>{
        if(confirm("Bạn có muốn xóa sản phẩm này khỏi giỏ không ")){
            const updateCartAfterDelete = cart.filter(item => item.id !== id_prod);
            setCart(updateCartAfterDelete);
            localStorage.setItem("cart", JSON.stringify(updateCartAfterDelete));
        }
         
    }

    if(cart.length == 0){
        return(
            <div className='giohangtrong'>
                <img src="/assets/img/icon/basket-shopping-solid-full.svg" alt="" />
                <h1>Không có sản phẩm nào!</h1>
                <p>Hãy mua sắm ngay bây giờ để nhận được các ưu đãi hấp dẫn đến từ AuraStore nhé!</p>
                <Link href="/product" className="xemShop"> Dạo 1 vòng xem nào!</Link>    
            </div>
        )
    }

    return (
        <>
            {cart.map((item, index) => (
                <tr key={index} className="cart-item-row">
                    <td>
                        <div className="cart-item-product">
                            <div className="cart-product-image">
                                <Image 
                                    src={`/assets/img/prod/${item.img}`} 
                                    alt={item.name} 
                                    width={100} 
                                    height={100} 
                                />
                            </div>
                            <div className="cart-product-info">
                                <div className="cart-product-name">{item.name}</div>
                                <div className="cart-product-specs">
                                    Màu: Titan Xanh | Chính hãng VN/A
                                </div>
                                <div className="cart-product-actions">
                                    <button className="cart-action-btn">
                                        <i className="far fa-heart"></i> Yêu thích
                                    </button>
                                    <button onClick={() => handleDeleteItem(item.id)}  className="cart-action-btn cart-action-remove">
                                        <i className="far fa-trash-alt"></i> Xóa
                                    </button>
                                </div>
                            </div>
                        </div>
                    </td>
                    <td className="cart-price-column">
                        {item.storage_options[0].price.toLocaleString("vi-VN")}₫
                    </td>
                    <td>
                        <div className="cart-quantity-control">
                            <button 
                                className="cart-quantity-btn"
                                onClick={() => newQuantity(item.cart_quantity - 1, item.id)}
                            >
                                -
                            </button>
                            
                            <div className="cart-quantity-input">
                                {item.cart_quantity}
                            </div>
                            
                            <button 
                                className="cart-quantity-btn"
                                onClick={() => newQuantity(item.cart_quantity + 1, item.id)}
                            >
                                +
                            </button>
                        </div>
                    </td>
                    <td className="cart-total-column">
                        {(item.storage_options[0].price * item.cart_quantity).toLocaleString("vi-VN")}₫
                    </td>
                </tr>
            ))}

            
        </>
    );
}