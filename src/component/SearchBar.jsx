"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export default function SearchBar() {

    const [keyWord, setKeyWord] = useState('');
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const router = useRouter();
    const handleSearch = (e)=>{
        e.preventDefault();

        const params = new URLSearchParams(searchParams);
        if (keyWord.trim().length > 0) params.set('search', keyWord);
        else params.delete('search');
        router.replace(`${pathName}?${params.toString()}`);
    };

    return(
        <form className="head-search" onSubmit={handleSearch}>
            <button type="submit" className="search-btn">
                <Image
                    src="/assets/img/icon/magnifying-glass-solid-full.svg" 
                    width={24} 
                    height={24} 
                    alt="Search" 
                />
            </button>
            <input type="text" placeholder="Tìm kiếm..." onChange={(e) => setKeyWord(e.target.value)} />
        </form>
    )
}


 