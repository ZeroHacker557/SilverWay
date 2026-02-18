import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';
import './CartDrawer.css';

export default function CartDrawer() {
    const { items, isCartOpen, setCartOpen, removeFromCart, updateQuantity, toggleGiftWrap, totalPrice, totalItems, clearCart } = useCart();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    useEffect(() => {
        document.body.style.overflow = isCartOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isCartOpen]);

    const handleCheckout = async () => {
        setIsSubmitting(true);
        setStatus('idle');
        try {
            const res = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ items, totalPrice })
            });

            if (res.ok) {
                setStatus('success');
                setTimeout(() => {
                    clearCart();
                    setCartOpen(false);
                    setStatus('idle');
                }, 3000);
            } else {
                throw new Error('Xatolik yuz berdi');
            }
        } catch (err) {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className={`cart-backdrop ${isCartOpen ? 'open' : ''}`}
                onClick={() => setCartOpen(false)}
            />

            {/* Drawer */}
            <aside className={`cart-drawer ${isCartOpen ? 'open' : ''}`}>
                <div className="cart-drawer-header">
                    <h2>
                        <svg viewBox="0 0 24 24">
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M3 6h18" strokeLinecap="round" />
                            <path d="M16 10a4 4 0 0 1-8 0" strokeLinecap="round" />
                        </svg>
                        Savat
                        {totalItems > 0 && <span className="cart-drawer-count">{totalItems}</span>}
                    </h2>
                    <button className="cart-drawer-close" onClick={() => setCartOpen(false)}>✕</button>
                </div>

                {items.length === 0 ? (
                    <div className="cart-empty">
                        <div className="cart-empty-icon">
                            <svg viewBox="0 0 24 24">
                                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M3 6h18" strokeLinecap="round" />
                                <path d="M16 10a4 4 0 0 1-8 0" strokeLinecap="round" />
                            </svg>
                        </div>
                        <p>Savat bo'sh</p>
                        <span>Mahsulotlarni ko'rib chiqing va sevimlilaringizni qo'shing</span>
                        <button className="cart-empty-btn" onClick={() => {
                            setCartOpen(false);
                            document.getElementById('katalog')?.scrollIntoView({ behavior: 'smooth' });
                        }}>
                            Xarid qilish
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="cart-items">
                            {items.map(item => (
                                <div key={item.product.id} className="cart-item">
                                    <img src={item.product.image_url} alt={item.product.title} className="cart-item-img" />
                                    <div className="cart-item-details">
                                        <div className="cart-item-top">
                                            <div>
                                                <div className="cart-item-category">{item.product.category}</div>
                                                <h3 className="cart-item-name">{item.product.title}</h3>
                                                {item.product.selectedSize && (
                                                    <div className="cart-item-size">O'lcham: {item.product.selectedSize}</div>
                                                )}
                                            </div>
                                            <button className="cart-item-remove" onClick={() => removeFromCart(item.product.id)} aria-label="O'chirish">
                                                <svg viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" /></svg>
                                            </button>
                                        </div>
                                        <div className="cart-item-price">{formatPrice(item.product.price)}</div>
                                        <div className="cart-item-bottom">
                                            <div className="cart-item-qty">
                                                <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>−</button>
                                                <span>{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>+</button>
                                            </div>
                                            <label className="cart-gift-wrap">
                                                <input
                                                    type="checkbox"
                                                    checked={item.giftWrap}
                                                    onChange={() => toggleGiftWrap(item.product.id)}
                                                />
                                                <span>🎁 Sovg'a</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="cart-footer">
                            <div className="cart-summary">
                                <div className="cart-summary-row">
                                    <span>Mahsulotlar ({totalItems})</span>
                                    <span>{formatPrice(totalPrice)}</span>
                                </div>
                                <div className="cart-summary-row">
                                    <span>Yetkazib berish</span>
                                    <span className="cart-free-delivery">Bepul</span>
                                </div>
                                <div className="cart-summary-total">
                                    <span>Jami</span>
                                    <span>{formatPrice(totalPrice)}</span>
                                </div>
                            </div>
                            <button
                                className={`cart-checkout-btn ${isSubmitting ? 'loading' : ''} ${status === 'success' ? 'success' : ''}`}
                                onClick={handleCheckout}
                                disabled={isSubmitting || status === 'success'}
                            >
                                {isSubmitting ? 'Yuborilmoqda...' : status === 'success' ? 'Buyurtma yuborildi! ✅' : 'Buyurtma berish'}
                                {status !== 'success' && !isSubmitting && <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                            </button>
                            <button className="cart-continue-btn" onClick={() => setCartOpen(false)}>
                                Xaridni davom ettirish
                            </button>
                        </div>
                    </>
                )}
            </aside>
        </>
    );
}
