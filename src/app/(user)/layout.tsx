// src/app/(user)/layout.tsx
import "../../css/main.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import HeaderComponent from "../../component/HeaderComponent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aura Store - Trải nghiệm mua sắm hiện đại",
  description: "Cửa hàng công nghệ Aura Store",
};

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* LƯU Ý: Không dùng <html> và <body> ở đây vì 
          đã có ở file src/app/layout.tsx 
      */}
      <HeaderComponent />

      <main className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </main>

      <footer className="container-center layout12col" style={{ padding: "40px 20px", marginTop: "40px"}}>
        <div className="ft1">
          <h3>Hỗ trợ khách hàng</h3>
          <p>Hotline: 1900 6750</p>
          <p>Email: aurastore@gmail.com</p>
        </div>

        <div className="ft2">
          <h3>Về chúng tôi </h3>
          <p>Giới thiệu về Aurora Store</p>
          <p>Chính sách bảo mật</p>
          <p>Chính sách vận chuyển</p>
          <p>Chính sách đổi trả hàng</p>
          <p>Điều khoản dịch vụ</p>
        </div>

        <div className="ft3">
          <h3>Đối tác vận chuyển</h3>
          <Image
            src="/assets/img/logo/gh1.png"
            alt="GHN"
            width={50}
            height={50}
            style={{ borderRadius: '25px', border: '1px solid #cccccc', marginRight: '15px' }}
          />
          <Image
            src="/assets/img/logo/gh2.jpg"
            alt="GHTK"
            width={50}
            height={50}
            style={{ borderRadius: '25px', border: '1px solid #cccccc', marginRight: '15px' }}
          />
          <Image
            src="/assets/img/logo/gh3.png"
            alt="NinjaVan"
            width={50}
            height={50}
            style={{ borderRadius: '25px', border: '1px solid #cccccc', marginRight: '15px' }}
          />
          <Image
            src="/assets/img/logo/gh4.webp"
            alt="VNPost"
            width={50}
            height={50}
            style={{ borderRadius: '25px', border: '1px solid #cccccc', marginRight: '15px' }}
          />
        </div>

        <div className="ft4">
          © 2018. Công Ty Cổ Phần Đầu Aura Thread. GPDKKD: 0303217354 do sở KH & ĐT TP.HCM cấp ngày 12/06/2025. GPMXH: 21/GP-BTTTT do Bộ Thông Tin và Truyền Thông cấp ngày 11/01/2021.
          Địa chỉ: 128 Trần Quang Khải, P.Tân Định, TP. Hồ Chí Minh. Địa chỉ liên hệ và gửi chứng từ: Lô T2-1.2, Đường D1, P.Tăng Nhơn Phú, TP.Hồ Chí Minh. Điện thoại: 028 38125960. Email: aurastore@gmail.com. Xem chính sách sử dụng
        </div>

        <div className="ft-biglogo">
          <p>A</p><p>U</p><p>R</p><p>A</p><p> </p>
          <p>S</p><p>T</p><p>O</p><p>R</p><p>E</p>
        </div>
      </footer>
    </>
  );
}