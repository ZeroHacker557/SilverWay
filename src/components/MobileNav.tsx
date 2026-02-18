import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '../context/CartContext';
import './MobileNav.css';

interface MobileNavProps {
    onSearchOpen: () => void;
}

export default function MobileNav({ onSearchOpen }: MobileNavProps) {
    const { totalItems, setCartOpen } = useCart();
    const pathname = usePathname();

    return (
        <nav className="mobile-nav">
            <div className="mobile-nav-items">
                <Link
                    href="/"
                    className={`mobile-nav-item ${pathname === '/' ? 'active' : ''}`}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                    <svg viewBox="0 0 24 24">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" strokeLinecap="round" strokeLinejoin="round" />
                        <polyline points="9,22 9,12 15,12 15,22" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>Uy</span>
                </Link>

                <Link
                    href="/products"
                    className={`mobile-nav-item ${pathname === '/products' ? 'active' : ''}`}
                >
                    <svg viewBox="0 0 24 24">
                        <rect x="3" y="3" width="7" height="7" />
                        <rect x="14" y="3" width="7" height="7" />
                        <rect x="14" y="14" width="7" height="7" />
                        <rect x="3" y="14" width="7" height="7" />
                    </svg>
                    <span>Katalog</span>
                </Link>

                <button
                    className="mobile-nav-item"
                    onClick={() => setCartOpen(true)}
                >
                    <svg viewBox="0 0 24 24">
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M3 6h18" strokeLinecap="round" />
                        <path d="M16 10a4 4 0 0 1-8 0" strokeLinecap="round" />
                    </svg>
                    <span>Savat</span>
                    {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
                </button>
            </div>
        </nav>
    );
}
