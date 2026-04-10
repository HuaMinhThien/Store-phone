"use client"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";



export default function SectionProductsHomeALL () {
    const [product, setproduct] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3007/products').then(res => res.json()).then(data => setproduct(data))
    }, []);
    
    return (
        <> {product.map((prod) => (
            <Link key={prod.id} className="Prod-box-product" href={`/product/${prod.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Image 
                    src={`/assets/img/prod/${prod.img}`} 
                    alt="Samsung Galaxy A56" 
                    width={200} 
                    height={200} 
                    />
                    <p className="name-prod"> {prod.name} </p>
                    
                    <div className="prod-color">
                    <div className="o-color" style={{ backgroundColor: '#000', width: '12px', height: '12px', borderRadius: '50%' }}></div>
                    </div> 

                    <div className="prod-storage">
                        {prod.storage_options.map((storage, index) => (
                            <div key={index} className="o-storage">{storage.storage}</div>
                        ))}                        
                    </div>

                    <div className="prod-sale">
                        <p className="old-price-prod">{prod.storage_options[0].old_price.toLocaleString('vi-VN')}đ</p> 
                        <span style={{ color: 'red' }}>-{prod.storage_options[0].sale_percent}%</span> 
                    </div>

                    <p className="price-prod" style={{ fontWeight: 'bold', color: 'red' }}>{prod.storage_options[0].price.toLocaleString('vi-VN')}đ</p>
                    <p className="sale-count-prod">⭐ {}</p>
            </Link>
            )).slice(0,15)}
        </>
        )
        
        
}

