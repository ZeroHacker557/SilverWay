'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import AllProducts from '@/components/AllProducts';
import Footer from '@/components/Footer';
import LiveSearch from '@/components/LiveSearch';
import CartDrawer from '@/components/CartDrawer';
import MobileNav from '@/components/MobileNav';

export default function ProductsPage() {
    const [searchOpen, setSearchOpen] = useState(false);

    return (
        <>
            <Header onSearchOpen={() => setSearchOpen(true)} />
            <main>
                <AllProducts />
            </main>
            <Footer />
            <LiveSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
            <CartDrawer />
            <MobileNav onSearchOpen={() => setSearchOpen(true)} />
        </>
    );
}
