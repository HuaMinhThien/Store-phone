"use client"

import Image from "next/image";
import AddToCart from "../../../../component/AddToCart";
import { useEffect, useState } from "react";

export default function ProductID({ params }) {
    const [product, setProduct] = useState(null);
    const [price_variant, setPrice_variant] = useState(0); // Lưu index của dung lượng
    const [selectedColor, setSelectedColor] = useState(""); // Lưu màu đã chọn

    useEffect(() => {
        async function fetchProduct() {
            const { slug } = await params;
            try {
                const res = await fetch(`http://localhost:3007/products?slug=${slug}`);
                const data = await res.json();
                if (data.length > 0) {
                    setProduct(data[0]);
                    // Khởi tạo màu mặc định là màu đầu tiên trong danh sách
                    if (data[0].colors && data[0].colors.length > 0) {
                        setSelectedColor(data[0].colors[0]);
                    }
                }
            } catch (error) {
                console.error("Lỗi fetch dữ liệu:", error);
            }
        }
        fetchProduct()
    }, [params])

    // Hàm xử lý khi chọn dung lượng
    const handlePrice = (index) => {
        setPrice_variant(index);
    }

    // Hàm xử lý khi chọn màu sắc
    const handleColor = (colorName) => {
        setSelectedColor(colorName);
    }

    if (!product) { return (<div>Khong lay duoc chi tiet san pham</div>) }

    // Dữ liệu sản phẩm để thêm vào giỏ hàng luôn lấy theo state mới nhất
    const productAddToCart = {
        "id": product.id,
        "brand": product.brand_id,
        "name": product.name,
        "slug": product.slug,
        "img": product.img,
        "sold": product.sold,
        "storage_options": {
            "storage": product.storage_options[price_variant].storage,
            "price": product.storage_options[price_variant].price,
            "old_price": product.storage_options[price_variant].old_price
        },
        "color": selectedColor || "Mặc định"
    }

    return (
        <main className="container-center" style={{ marginTop: '70px' }}>
            <div className="product-detail-container layout12col">
                <div className="khung-prodDetail layout12col">
                    <div className="product-gallery">
                        <div className="main-image">
                            <Image id="mainProductImage" src={`/assets/img/prod/${product.img}`} alt={product.name} width={400} height={400} />
                        </div>
                        {/* Phần thumbnail có thể cải tiến để đổi ảnh theo màu nếu bạn có mảng ảnh riêng */}
                    </div>
                    
                    <div className="product-info">
                        <div className="stock-status in-stock">{product.quantity > 0 ? "Còn hàng" : "Hết hàng"}</div>
                        <h1 className="product-title">{product.name} - Chính hãng</h1>
                        
                        <div className="product-price">
                            <span className="current-price">{product.storage_options[price_variant].price.toLocaleString("vi-VN")}₫</span>
                            <span className="old-price">{product.storage_options[price_variant].old_price.toLocaleString("vi-VN")}₫</span>
                        </div>
                        
                        {/* CHỌN PHIÊN BẢN DUNG LƯỢNG */}
                        <div className="product-variants mb-20">
                            <div className="variant-title">Chọn phiên bản: <strong>{product.storage_options[price_variant].storage}</strong></div>
                            <div className="variant-options">
                                {product.storage_options.map((storage, index) => (
                                    <button 
                                        onClick={() => handlePrice(index)} 
                                        key={index} 
                                        className={`variant-option ${price_variant === index ? 'active' : ''}`}
                                    >
                                        {storage.storage}
                                    </button>
                                ))}
                            </div>
                        </div>
                        
                        {/* CHỌN MÀU SẮC */}
                        <div className="product-variants mb-20">
                            <div className="variant-title">Chọn màu sắc: <strong>{selectedColor}</strong></div>
                            <div className="variant-options">
                                {product.colors && product.colors.map((color, index) => (
                                    <div 
                                        key={index} 
                                        onClick={() => handleColor(color)}
                                        className={`variant-option ${selectedColor === color ? 'active' : ''}`}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {color}
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div className="product-actions">
                            <button className="btn btn-buy">
                                <i className="fas fa-bolt"></i> MUA NGAY
                            </button>
                            {/* Component AddToCart sẽ nhận object đã cập nhật màu và dung lượng */}
                            <AddToCart product={productAddToCart}></AddToCart>
                        </div>
                        
                        <div className="product-meta">
                            <div><i className="fas fa-shipping-fast"></i> Miễn phí vận chuyển</div>
                            <div><i className="fas fa-shield-alt"></i> Bảo hành 12 tháng</div>
                            <div><i className="fas fa-undo"></i> Đổi trả trong 30 ngày</div>
                        </div>
                    </div>
                </div>  
                <div className="product-detail-tabs">
                    <div className="tabs-header">
                        <div className="tab active" onClick="switchTab('description')">Mô tả sản phẩm</div>
                        <div className="tab" onClick="switchTab('specifications')">Thông số kỹ thuật</div>
                        <div className="tab" onClick="switchTab('reviews')">Đánh giá</div>
                        <div className="tab" onClick="switchTab('qna')">Hỏi đáp</div>
                    </div>
                    
                    <div id="description" className="tab-content active">
                        <h3 className="mb-10">iPhone 15 Pro Max - Đẳng cấp vượt trội</h3>
                        <p className="mb-10">iPhone 15 Pro Max là flagship mạnh mẽ nhất của Apple trong năm 2023, mang đến trải nghiệm đột phá với chip A17 Pro tiên tiến, camera 48MP và thiết kế titan cao cấp.</p>
                        
                        <h4 className="mb-10">Đặc điểm nổi bật:</h4>
                        <ul className="promotion-list">
                            <li>Màn hình Super Retina XDR 6.7 inch, công nghệ ProMotion 120Hz</li>
                            <li>Chip A17 Pro 6 nhân, hiệu năng vượt trội, xử lý đồ họa mạnh mẽ</li>
                            <li>Hệ thống camera chuyên nghiệp: Camera chính 48MP, camera tele 12MP, camera góc siêu rộng 12MP</li>
                            <li>Thiết kế khung titan nhẹ bền, mặt kính Ceramic Shield</li>
                            <li>Kết nối USB-C tốc độ cao, hỗ trợ sạc nhanh 20W</li>
                            <li>Pin lớn, thời gian sử dụng lên đến 29 giờ phát video</li>
                        </ul>
                    </div>
                    
                    <div id="specifications" className="tab-content">
                        <table className="specifications">
                            <tr>
                                <td>Màn hình</td>
                                <td>6.7 inch, Super Retina XDR, ProMotion 120Hz</td>
                            </tr>
                            <tr>
                                <td>Độ phân giải</td>
                                <td>2796 x 1290 pixel</td>
                            </tr>
                            <tr>
                                <td>Chip xử lý</td>
                                <td>Apple A17 Pro 6 nhân</td>
                            </tr>
                            <tr>
                                <td>RAM</td>
                                <td>8GB</td>
                            </tr>
                            <tr>
                                <td>Bộ nhớ trong</td>
                                <td>256GB / 512GB / 1TB</td>
                            </tr>
                            <tr>
                                <td>Camera sau</td>
                                <td>48MP (chính) + 12MP (tele) + 12MP (siêu rộng)</td>
                            </tr>
                            <tr>
                                <td>Camera trước</td>
                                <td>12MP với TrueDepth</td>
                            </tr>
                            <tr>
                                <td>Pin</td>
                                <td>4422 mAh, sạc nhanh 20W, sạc không dây MagSafe</td>
                            </tr>
                            <tr>
                                <td>Hệ điều hành</td>
                                <td>iOS 17</td>
                            </tr>
                        </table>
                    </div>
                    
                    <div id="reviews" className="tab-content">
                        <p className="text-center">Chức năng đánh giá đang được phát triển...</p>
                    </div>
                    
                    <div id="qna" className="tab-content">
                        <p className="text-center">Chức năng hỏi đáp đang được phát triển...</p>
                    </div>
                </div>
                
                <div className="related-products">
                    <h2 className="section-title">Sản phẩm đề xuất</h2>
                    <div className="products-grid">

                        <a className="box-product" href="/prod-detail">
                            <Image src="/assets/img/prod/samsung_galaxy_z_fold6_dd_daf2dd25b5.webp" alt="Samsung Galaxy Z Fold6 12/512GB" width={200} height={200} />

                            <p className="name-prod">Samsung Galaxy Z Fold6 12/512GB</p>
                            
                            <div className="prod-color">
                                <div className="o-color" style={{ backgroundColor: '#CACBCE' }}></div>
                            </div> 

                            <div className="prod-storage">
                                <div className="o-storage">256GB</div><div className="o-storage">512GB</div>
                            </div>

                            <div className="prod-sale">
                                <p className="old-price-prod">41.990.000₫</p> <span>-16%</span> 
                            </div>

                            <p className="price-prod">35.271.600₫</p>

                            <p className="sale-count-prod"> 
                                ⭐ 1k Đã bán
                            </p>
                        </a>
                        <a className="box-product" href="/prod-detail">
                            <Image src="/assets/img/prod/iphone_17_pro_cosmic_orange_1_12e8ea1358.webp" alt="iPhone 17 Pro 256GB" width={200} height={200} />

                            <p className="name-prod">iPhone 17 Pro 256GB</p>
                            
                            <div className="prod-color">
                                <div className="o-color" style={{ backgroundColor: '#f58748' }}></div><div className="o-color" style={{ backgroundColor: '#42485a' }}></div>
                            </div> 

                            <div className="prod-storage">
                                <div className="o-storage">256GB</div><div className="o-storage">512GB</div>
                            </div>

                            <div className="prod-sale">
                                
                            </div>

                            <p className="price-prod">33.990.000₫</p>

                            <p className="sale-count-prod"> 
                                ⭐ 158k Đã bán
                            </p>
                        </a>
                        <a className="box-product" href="/prod-detail">
                            <Image src="/assets/img/prod/iphone_16_pro_max_black_titan_b3274fbf05.webp" alt="iPhone 16 Pro Max 256GB" width={200} height={200} />

                            <p className="name-prod">iPhone 16 Pro Max 256GB</p>
                            
                            <div className="prod-color">
                                <div className="o-color" style={{ backgroundColor: '#000' }}></div><div className="o-color" style={{ backgroundColor: '#ead9c8' }}></div>
                            </div> 

                            <div className="prod-storage">
                                <div className="o-storage">256GB</div><div className="o-storage">512GB</div>
                            </div>

                            <div className="prod-sale">
                                
                            </div>

                            <p className="price-prod">34.990.000₫</p>

                            <p className="sale-count-prod"> 
                                ⭐ 211k Đã bán
                            </p>
                        </a>
                        <a className="box-product" href="/prod-detail">
                            <Image src="/assets/img/prod/samsung_galaxy_a56_dd_8ff3bbb9b1.webp" alt="Samsung Galaxy A56 5G 8/256GB" width={200} height={200} />

                            <p className="name-prod">Samsung Galaxy A56 5G 8/256GB</p>
                            
                            <div className="prod-color">
                                <div className="o-color" style={{ backgroundColor: 'rgb(252 118 175)' }}></div><div className="o-color" style={{ backgroundColor: '#E5F2E3' }}></div><div className="o-color" style={{ backgroundColor: '#000' }}></div>
                            </div> 

                            <div className="prod-storage">
                                <div className="o-storage">256GB</div><div className="o-storage">512GB</div>
                            </div>

                            <div className="prod-sale">
                                <p className="old-price-prod">11.990.000₫</p> <span>-12%</span> 
                            </div>

                            <p className="price-prod">10.551.200₫</p>

                            <p className="sale-count-prod"> 
                                ⭐ 254k Đã bán
                            </p>
                        </a>
                        <a className="box-product" href="/prod-detail">
                            <Image src="/assets/img/prod/samsung_galaxy_s24_fe_dd_b946d2a8e8.webp" alt="Samsung Galaxy S24 FE 5G 8/256GB" width={200} height={200} />

                            <p className="name-prod">Samsung Galaxy S24 FE 5G 8/256GB</p>
                            
                            <div className="prod-color">
                                <div className="o-color" style={{ backgroundColor: '#000' }}></div>
                            </div> 

                            <div className="prod-storage">
                                <div className="o-storage">256GB</div><div className="o-storage">512GB</div>
                            </div>

                            <div className="prod-sale">
                                <p className="old-price-prod">14.990.000₫</p> <span>-16%</span> 
                            </div>

                            <p className="price-prod">12.591.600₫</p>

                            <p className="sale-count-prod"> 
                                ⭐ 62k Đã bán
                            </p>
                        </a>
                        <a className="box-product" href="/prod-detail">
                            <Image src="/assets/img/prod/iphone_16_plus_ultramarine_0ef73cdfa7.webp" alt="iPhone 16 Plus 256GB" width={200} height={200} />

                            <p className="name-prod">iPhone 16 Plus 256GB</p>
                            
                            <div className="prod-color">
                                <div className="o-color" style={{ backgroundColor: '#879be4' }}></div>
                            </div> 

                            <div className="prod-storage">
                                <div className="o-storage">256GB</div><div className="o-storage">512GB</div>
                            </div>

                            <div className="prod-sale">
                                <p className="old-price-prod">25.990.000₫</p> <span>-12%</span> 
                            </div>

                            <p className="price-prod">22.871.200₫</p>

                            <p className="sale-count-prod"> 
                                ⭐ 84k Đã bán
                            </p>
                        </a>
                        
                    </div>
                        
                        
                    </div>
                </div>
            
        </main>

    );

}