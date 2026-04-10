"use client"

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter} from "next/navigation" ;

export default function Product() {
  const router = useRouter();

  const [cart, setCart] = useState(() => {
        if (typeof window !== "undefined") {
            const savedCart = localStorage.getItem("cart");
            return savedCart ? JSON.parse(savedCart) : [];
        }
        return [];
    });

  const handleNav = (route) => {
    router.push(`${route}`)
  }

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
  

  
  return (
    <main className="container-center" style={{ marginTop: "70px" }}>
      <div className="layout12col cart-main-container">
        <div className="khung-cart layout12col">
          <div className="cart-items-section">
            <h2 className="cart-section-title">
              <i className="fas fa-shopping-cart"></i> Sản phẩm trong giỏ hàng
            </h2>

            <table className="cart-table">
              <thead className="cart-table-header">
                <tr>
                  <th>Sản phẩm</th>
                  <th>Giá</th>
                  <th>Số lượng</th>
                  <th>Tổng</th>
                </tr>
              </thead>
              <tbody className="cart-table-body">
                {/* <ShowCartItem></ShowCartItem> */}
                
                {cart.length > 0 ? cart.map((item, index) => (
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
                                        Màu: {item.color} | Chính hãng VN/A
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
                            {item.storage_options.price.toLocaleString("vi-VN")}₫
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
                            {(item.storage_options.price * item.cart_quantity).toLocaleString("vi-VN")}₫
                        </td>
                    </tr>
                ))
              : (
                  <div className='giohangtrong'>
                      <img src="/assets/img/icon/basket-shopping-solid-full.svg" alt="" />
                      <h1>Không có sản phẩm nào!</h1>
                      <p>Hãy mua sắm ngay bây giờ để nhận được các ưu đãi hấp dẫn đến từ AuraStore nhé!</p>
                      <Link href="/product" className="xemShop"> Dạo 1 vòng xem nào!</Link>    
                  </div>
                )
              }
                
              </tbody>
            </table>
          </div>

          <div className="cart-summary-section">
            <h2 className="cart-summary-title">
              <i className="fas fa-file-invoice-dollar"></i> Tóm tắt đơn hàng
            </h2>

            <div className="cart-order-summary">
              <div className="cart-summary-row">
                <span className="cart-summary-label">
                  Tạm tính ({cart.length})
                </span>
                <span className="cart-summary-value">
                  {cart.reduce((sum, item) => {return sum + item.storage_options.price * item.cart_quantity}, 0).toLocaleString("vi-VN")}₫
                </span>
              </div>

              <div className="cart-summary-row">
                <span className="cart-summary-label">Phí vận chuyển</span>
                <span className="cart-summary-value">0₫</span>
              </div>

              <div className="cart-summary-row">
                <span className="cart-summary-label">Giảm giá</span>
                <span className="cart-summary-value">-0₫</span>
              </div>

              <div className="cart-summary-row cart-summary-total">
                <span className="cart-summary-label">Tổng cộng</span>
                <span className="cart-summary-value cart-total-price">
                  {cart.reduce((sum, item) => {return sum + item.storage_options.price * item.cart_quantity}, 0).toLocaleString("vi-VN")}₫
                </span>
              </div>
            </div>

            <div className="cart-promotion-box">
              <div className="cart-promotion-title">
                <i className="fas fa-gift"></i> Khuyến mãi áp dụng
              </div>
              <ul className="cart-promotion-list">
                <li>Giảm 2.000.000₫ cho đơn từ 50 triệu</li>
                <li>Miễn phí vận chuyển toàn quốc</li>
                <li>Tặng gói bảo hành mở rộng 6 tháng</li>
              </ul>
            </div>

            <div className="cart-discount-box">
              <label className="cart-discount-label">Mã giảm giá</label>
              <div className="cart-discount-input">
                <input
                  type="text"
                  className="cart-discount-field"
                  placeholder="Nhập mã giảm giá..."
                />
                <button className="cart-discount-btn">Áp dụng</button>
              </div>
            </div>

            <div className="cart-action-buttons">
              <button className="cart-checkout-btn" onClick={() => handleNav("/checkout")}>
                <i className="fas fa-lock"></i> TIẾN HÀNH THANH TOÁN
              </button>
              <button className="cart-continue-btn" onClick={() => handleNav("/product")}>
                <i className="fas fa-arrow-left" ></i> TIẾP TỤC MUA HÀNG
              </button>
            </div>
          </div>
        </div>
        <div className="cart-suggestions-section">
          <h2 className="cart-suggestions-title">
            Sản phẩm thường được mua kèm
          </h2>

          <div className="cart-suggestions-grid">
            <a className="box-product" href="/prod-detail">
              <img
                src="/assets/img/prod/samsung_galaxy_z_fold6_dd_daf2dd25b5.webp"
                alt="Samsung Galaxy Z Fold6 12/512GB"
              />

              <p className="name-prod">Samsung Galaxy Z Fold6 12/512GB</p>

              <div className="prod-color">
                <div className="o-color"></div>
              </div>

              <div className="prod-storage">
                <div className="o-storage">256GB</div>
                <div className="o-storage">512GB</div>
              </div>

              <div className="prod-sale">
                <p className="old-price-prod">41.990.000₫</p> <span>-16%</span>
              </div>

              <p className="price-prod">35.271.600₫</p>

              <p className="sale-count-prod">⭐ 1k Đã bán</p>
            </a>
            <a className="box-product" href="/prod-detail">
              <img
                src="/assets/img/prod/iphone_17_pro_cosmic_orange_1_12e8ea1358.webp"
                alt="iPhone 17 Pro 256GB"
              />

              <p className="name-prod">iPhone 17 Pro 256GB</p>

              <div className="prod-color">
                <div className="o-color"></div>
                <div className="o-color"></div>
              </div>

              <div className="prod-storage">
                <div className="o-storage">256GB</div>
                <div className="o-storage">512GB</div>
              </div>

              <div className="prod-sale"></div>

              <p className="price-prod">33.990.000₫</p>

              <p className="sale-count-prod">⭐ 158k Đã bán</p>
            </a>
            <a className="box-product" href="/prod-detail">
              <img
                src="/assets/img/prod/iphone_16_pro_max_black_titan_b3274fbf05.webp"
                alt="iPhone 16 Pro Max 256GB"
              />

              <p className="name-prod">iPhone 16 Pro Max 256GB</p>

              <div className="prod-color">
                <div className="o-color"></div>
                <div className="o-color"></div>
              </div>

              <div className="prod-storage">
                <div className="o-storage">256GB</div>
                <div className="o-storage">512GB</div>
              </div>

              <div className="prod-sale"></div>

              <p className="price-prod">34.990.000₫</p>

              <p className="sale-count-prod">⭐ 211k Đã bán</p>
            </a>
            <a className="box-product" href="/prod-detail">
              <img
                src="/assets/img/prod/samsung_galaxy_a56_dd_8ff3bbb9b1.webp"
                alt="Samsung Galaxy A56 5G 8/256GB"
              />

              <p className="name-prod">Samsung Galaxy A56 5G 8/256GB</p>

              <div className="prod-color">
                <div className="o-color"></div>
                <div className="o-color"></div>
                <div className="o-color"></div>
              </div>

              <div className="prod-storage">
                <div className="o-storage">256GB</div>
                <div className="o-storage">512GB</div>
              </div>

              <div className="prod-sale">
                <p className="old-price-prod">11.990.000₫</p> <span>-12%</span>
              </div>

              <p className="price-prod">10.551.200₫</p>

              <p className="sale-count-prod">⭐ 254k Đã bán</p>
            </a>
            <a className="box-product" href="/prod-detail">
              <img
                src="/assets/img/prod/samssung_galaxy_s24_fe_dd_b946d2a8e8.webp"
                alt="Samsung Galaxy S24 FE 5G 8/256GB"
              />

              <p className="name-prod">Samsung Galaxy S24 FE 5G 8/256GB</p>

              <div className="prod-color">
                <div className="o-color"></div>
              </div>

              <div className="prod-storage">
                <div className="o-storage">256GB</div>
                <div className="o-storage">512GB</div>
              </div>

              <div className="prod-sale">
                <p className="old-price-prod">14.990.000₫</p> <span>-16%</span>
              </div>

              <p className="price-prod">12.591.600₫</p>

              <p className="sale-count-prod">⭐ 62k Đã bán</p>
            </a>
            <a className="box-product" href="/prod-detail">
              <img
                src="/assets/img/prod/iphone_16_plus_ultramarine_0ef73cdfa7.webp"
                alt="iPhone 16 Plus 256GB"
              />

              <p className="name-prod">iPhone 16 Plus 256GB</p>

              <div className="prod-color">
                <div className="o-color"></div>
              </div>

              <div className="prod-storage">
                <div className="o-storage">256GB</div>
                <div className="o-storage">512GB</div>
              </div>

              <div className="prod-sale">
                <p className="old-price-prod">25.990.000₫</p> <span>-12%</span>
              </div>

              <p className="price-prod">22.871.200₫</p>

              <p className="sale-count-prod">⭐ 84k Đã bán</p>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
