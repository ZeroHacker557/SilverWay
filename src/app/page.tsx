'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Products from '@/components/Products';
import TrustSection from '@/components/TrustSection';
import Footer from '@/components/Footer';
import LiveSearch from '@/components/LiveSearch';
import CartDrawer from '@/components/CartDrawer';
import MobileNav from '@/components/MobileNav';

export default function Home() {
    const [searchOpen, setSearchOpen] = useState(false);

    return (
        <>
            <Header onSearchOpen={() => setSearchOpen(true)} />
            <main>
                <Hero />
                <Products limit={8} />
                <TrustSection />
            </main>
            <Footer />
            <LiveSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
            <CartDrawer />
            <MobileNav onSearchOpen={() => setSearchOpen(true)} />
        </>
    );
}
