"use client"

import Image from "next/image";
import Link from "next/link";
import SectionSaleByBrand from "../../component/SectionSaleByBrand";
import SectionProductsHomeALL from "../../component/SectionProductsHomeALL";
import { useEffect, useState } from "react";

export default function Home() {

  const [brands, setBrands] = useState([]);
  const [selectedBrandId, setSelectedBrandId] = useState(null);


  useEffect(() => {
      fetch('http://localhost:3007/brands').then(res => res.json()).then(data => setBrands(data))
  }, []);

  

  return (
    // HOME
    <div>
      <div className="main-banner container-full" style={{ marginTop: '70px' }}>
        <Image 
          src="/assets/img/banner/desk_header_99289c6433.webp" 
          alt="Main Banner" 
          width={1920} 
          height={400}  
          style={{ width: '100%', height: '400px', objectFit: 'cover' }}
          priority 
        />
      </div>

      <div className="qc-left">
        <Image 
          src="/assets/img/banner/label-left.gif" 
          alt="QC Left" 
          width={150} 
          height={400} 
          style={{ width: '100%', height: 'auto' }}
        />
      </div>
      <div className="qc-right">
        <Image 
          src="/assets/img/banner/label-right.gif" 
          alt="QC Right" 
          width={150} 
          height={400} 
          style={{ width: '100%', height: 'auto' }}
        />
      </div>

      <main className="container-center layout12col">
        <h1 className="title-banchay">⭐ Hàng hot lên kệ - Mua ngay kẻo trễ.</h1>
        <div className="main-content-banchay">
          <div className="brand-banchay">
            <div className="hangBanChay">Các hãng bán chạy nhất!</div>
            <div className="showBrand_banchay"> {brands.map((b) => (
              <button 
                key={b.id || b.name}
                className={`btn-filter-brand-banchay ${selectedBrandId === b.id ? "btn-filter-brand-banchay_active" : ""}`}
                onClick={() => setSelectedBrandId(b.id)}
              >
                {b.name}
              </button>
              )).slice(0,6) }

              {/* Nếu brands trống thì hiện thông báo hoặc skeleton */}
              {brands.length === 0 && <span>Đang tải thương hiệu...</span>}
            </div>
          </div>

          <div className="show-prod-banchay">

              <SectionSaleByBrand brandId={selectedBrandId} />
            
          </div>
          <button>Xem thêm sản phẩm</button>
        </div>

        <div className="main-bannerCon1">
          <Link href="">
            <Image 
              src="/assets/img/banner/6f50f83426797e64c594736726a66cf9.png" 
              alt="Banner" 
              width={640} 
              height={200} 
            />
          </Link>
          <Link href="">
            <Image 
              src="/assets/img/banner/49259cce498587e4dd5320bef0e43344.png" 
              alt="Banner" 
              width={640} 
              height={200} 
            />
          </Link>
        </div>

        <h1 className="title-banchay">⭐ Gợi ý cho bạn.</h1>
        <div className="main-content-goiy">
          <div className="show-prod-goiy">
              <SectionProductsHomeALL ></SectionProductsHomeALL>
            
          </div>
        </div>

        <h1 className="title-banchay">⭐ Sắm Tết Sớm - Giá Rẻ Hơn.</h1>
        <div className="main-bannerCon2">
          <Link href="">
            <Image 
              src="/assets/img/banner/b9c8b208c86be634e4ed8608fc8eec53.png" 
              alt="Banner Tết" 
              width={1300} 
              height={200} 
            />
          </Link>
        </div>

        <h1 className="title-banchay">⭐ Gian hàng ưu đãi.</h1>
        <div className="main-bannerCon3">
          <Link href="">
            <Image src="/assets/img/banner/272b2d30bace569a34b36f3f659ee2ef.jpg" alt="Ưu đãi" width={310} height={200} />
          </Link>
          <Link href="">
            <Image src="/assets/img/banner/12d616469b152255d76fb4ffe70f4a9e.png" alt="Ưu đãi" width={310} height={200} />
          </Link>
          <Link href="">
            <Image src="/assets/img/banner/7d8b37982c9f0e46fddae69ba52b8294.png" alt="Ưu đãi" width={310} height={200} />
          </Link>
          <Link href="">
            <Image src="/assets/img/banner/fa806341aa5ed7a9f75daa78964ec47b.png" alt="Ưu đãi" width={310} height={200} />
          </Link>
        </div>
      </main>
    </div>
  );
}