'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { formatPrice } from '../data/products';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useCart } from '../context/CartContext';
import { supabase } from '@/lib/supabase';
import SizeGuide from './SizeGuide';
import './Products.css';

interface ProductsProps {
    limit?: number;
}

export default function Products({ limit }: ProductsProps) {
    const { ref, isVisible } = useScrollAnimation();
    const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
    const { addToCart } = useCart();
    const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            const { data, error } = await supabase
                .from('products')
                .select('*, product_sizes(size)')
                .order('created_at', { ascending: false });

            if (data) {
                const formatted = data.map(p => ({
                    ...p,
                    sizes: p.product_sizes?.map((s: any) => s.size) || []
                }));
                setProducts(limit ? formatted.slice(0, limit) : formatted);
            }
            setLoading(false);
        }
        fetchProducts();
    }, [limit]);

    const handleAddToCart = (product: any) => {
        if (product.category.toLowerCase() === 'uzuk' && product.sizes?.length > 0 && !selectedSizes[product.id]) {
            setErrorMsg(`Iltimos, "${product.title}" uchun o'lcham tanlang`);
            setTimeout(() => setErrorMsg(null), 3000);
            return;
        }
        addToCart({
            ...product,
            selectedSize: selectedSizes[product.id]
        });
    };

    if (loading) return null; // Or skeleton

    return (
        <section className="products" id="products" ref={ref}>
            <div className="container">
                <div className={`section-header scroll-animate ${isVisible ? 'visible' : ''}`}>
                    <h2 className="section-title silver-text">Mahsulotlar</h2>
                    <p className="section-subtitle">Har bir buyum — san'at asari</p>
                </div>

                <div className="products-grid">
                    {errorMsg && <div className="size-error-toast">{errorMsg}</div>}
                    {products.map((product, index) => (
                        <div
                            key={product.id}
                            className={`product-card scroll-animate scroll-animate-delay-${(index % 4) + 1} ${isVisible ? 'visible' : ''}`}
                        >
                            <div className="product-card-image">
                                <img
                                    src={product.image_url}
                                    alt={product.title}
                                    className="product-img-default"
                                    loading="lazy"
                                />
                                <img
                                    src={product.image_url} // Supabase doesn't have hoverImage mentioned in schema, using same for now or we could add it
                                    alt={`${product.title}`}
                                    className="product-img-hover"
                                    loading="lazy"
                                />
                                {product.isNew && <span className="product-badge-new">Yangi</span>}
                                <div className="product-quick-add">
                                    <button onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}>
                                        <svg viewBox="0 0 24 24">
                                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M3 6h18" strokeLinecap="round" />
                                            <path d="M16 10a4 4 0 0 1-8 0" strokeLinecap="round" />
                                        </svg>
                                        Savatga
                                    </button>
                                </div>
                            </div>

                            <div className="product-card-info">
                                <div className="product-card-category">{product.category}</div>
                                <h3 className="product-card-name">{product.title}</h3>
                                <div className="product-card-price">
                                    <span className="current">{formatPrice(product.price)}</span>
                                </div>

                                {product.sizes?.length > 0 && (
                                    <div className="size-selector-mini">
                                        <span>O'lcham:</span>
                                        <div className="size-options">
                                            {product.sizes.map((size: string) => (
                                                <button
                                                    key={size}
                                                    className={selectedSizes[product.id] === size ? 'active' : ''}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedSizes({ ...selectedSizes, [product.id]: size });
                                                    }}
                                                >
                                                    {size}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Mobile add-to-cart button always visible */}
                            <div className="product-mobile-add">
                                <button onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}>
                                    <svg viewBox="0 0 24 24">
                                        <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                                    </svg>
                                    Savatga qo'shish
                                </button>
                            </div>

                            <div className="product-options">
                                <button className="product-option-btn" onClick={() => setSizeGuideOpen(true)}>
                                    <svg viewBox="0 0 24 24">
                                        <path d="M21 3H3v7h2V5h14v14h-5v2h7V3z" strokeLinecap="round" />
                                        <path d="M3 14l4-4 4 4" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M7 10v10" strokeLinecap="round" />
                                    </svg>
                                    O'lchamni aniqlash
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {limit && (
                    <div className="products-footer">
                        <Link href="/products" className="all-products-btn">
                            Barcha mahsulotlar
                            <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </Link>
                    </div>
                )}
            </div>

            {sizeGuideOpen && <SizeGuide onClose={() => setSizeGuideOpen(false)} />}
        </section>
    );
}
