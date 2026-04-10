"use client";

import Image from "next/image";
import Link from "next/link";
import SearchBar from "./SearchBar";
import { Suspense, useState } from "react";

export default function HeaderComponent() {
  const [user, setUser] = useState(() => {
    if (typeof window !== "undefined") {
      const checkUser = localStorage.getItem("user");
      if (checkUser) {
        try {
          return JSON.parse(checkUser);
        } catch (e) {
          return null;
        }
      }
    }
    return null;
  });

  const getUserLink = () => {
    if (!user) return "/login";
    return user.role === "admin" ? "/admin" : "/user";
  };

  return (
    <header className="container-full">
      <div className="content-head1 container-center">
        <Link href="/" className="head-logo">
          <h1>Aura Store</h1>
        </Link>

        <Suspense fallback={<div className="search-placeholder">Đang tải...</div>}>
          <SearchBar />
        </Suspense>

        {/* Link Sản phẩm */}
        <Link href="/product" className="head-cart head1-hover">
          <Image
            src="/assets/img/icon/phonne-24x24.png"
            alt="Sản phẩm"
            width={24}
            height={24}
          />
          <p>Sản phẩm</p>
          <Image
            src="/assets/img/icon/down-arrow.png"
            width={20}
            height={20}
            alt=""
          />
        </Link>

        {/* Link Về chúng tôi */}
        <Link href="/about" className="head-cart head1-hover">
          <Image
            src="/assets/img/icon/phonne-24x24.png"
            alt="Về chúng tôi"
            width={24}
            height={24}
          />
          <p>Về chúng tôi</p>
          <Image
            src="/assets/img/icon/down-arrow.png"
            width={20}
            height={20}
            alt=""
          />
        </Link>

        {/* Logic hiển thị User/Login */}
        <Link href={getUserLink()} className="head-login head1-hover">
          <Image
            src="/assets/img/icon/user-solid-full.svg"
            width={24}
            height={24}
            alt="user"
          />
          <p>{user ? user.name : "Đăng nhập"}</p>
        </Link>

        {/* Giỏ hàng */}
        <Link href="/cart" className="head-cart head1-hover">
          <Image
            src="/assets/img/icon/basket-shopping-solid-full.svg"
            width={24}
            height={24}
            alt="Cart"
          />
          <p>Giỏ Hàng</p>
        </Link>
      </div>
    </header>
  );
}
