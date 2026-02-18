import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import './Header.css';

interface HeaderProps {
    onSearchOpen: () => void;
}

export default function Header({ onSearchOpen }: HeaderProps) {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const { totalItems, setCartOpen } = useCart();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [menuOpen]);

    return (
        <>
            <header className={`header ${scrolled ? 'scrolled' : ''}`}>
                <Link href="/" className="header-logo">SILVERWAY</Link>

                <nav className="header-nav">
                    <Link href="/products">Mahsulotlar</Link>
                    <a href="/#about">Biz haqimizda</a>
                    <a href="/#kontakt">Kontakt</a>
                </nav>

                <div className="header-icons">
                    <button className="header-icon search-desktop" onClick={onSearchOpen} aria-label="Qidiruv">
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="11" cy="11" r="7" />
                            <path d="M16.5 16.5L21 21" strokeLinecap="round" />
                        </svg>
                    </button>

                    <button className="header-icon fav-desktop" aria-label="Sevimlilar">
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>

                    <button className="header-icon cart-desktop" aria-label="Savatcha" onClick={() => setCartOpen(true)}>
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M3 6h18" strokeLinecap="round" />
                            <path d="M16 10a4 4 0 0 1-8 0" strokeLinecap="round" />
                        </svg>
                        {totalItems > 0 && <span className="badge">{totalItems}</span>}
                    </button>

                    <div
                        className={`header-burger ${menuOpen ? 'active' : ''}`}
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </header>

            <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
                <button className="mobile-menu-close" onClick={() => setMenuOpen(false)}>✕</button>
                <Link href="/" onClick={() => setMenuOpen(false)}>Bosh sahifa</Link>
                <Link href="/products" onClick={() => setMenuOpen(false)}>Mahsulotlar</Link>
                <a href="/#about" onClick={() => setMenuOpen(false)}>Biz haqimizda</a>
                <a href="/#kontakt" onClick={() => setMenuOpen(false)}>Kontakt</a>
            </div>
        </>
    );
}
