'use client';

import { useState, useEffect } from 'react';
import { formatPrice } from '../data/products';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useCart } from '../context/CartContext';
import { supabase } from '@/lib/supabase';
import './AllProducts.css';

const categories = [
    { id: 'all', label: 'Barchasi' },
    { id: 'uzuk', label: 'Uzuklar' },
    { id: 'zirak', label: 'Ziraklar' },
    { id: 'marjon', label: 'Marjonlar' },
    { id: 'bilakuzuk', label: 'Bilakuzuklar' }
];

export default function AllProducts() {
    const { ref, isVisible } = useScrollAnimation();
    const { addToCart } = useCart();
    const [activeCategory, setActiveCategory] = useState('all');
    const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            setLoading(true);
            let query = supabase
                .from('products')
                .select('*, product_sizes(size)')
                .order('created_at', { ascending: false });

            if (activeCategory !== 'all') {
                query = query.eq('category', activeCategory);
            }

            const { data, error } = await query;

            if (data) {
                const formatted = data.map(p => ({
                    ...p,
                    sizes: p.product_sizes?.map((s: any) => s.size) || []
                }));
                setProducts(formatted);
            }
            setLoading(false);
        }
        fetchProducts();
    }, [activeCategory]);

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

    return (
        <section className="all-products-page" ref={ref}>
            <div className="container">
                <div className="section-header">
                    <h1 className="section-title silver-text">Barcha Mahsulotlar</h1>
                    <p className="section-subtitle">Premium kumush taqinchoqlar kolleksiyasi</p>
                </div>

                <div className="products-filter">
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            className={`filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
                            onClick={() => setActiveCategory(cat.id)}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <div className="products-loading-state">Yuklanmoqda...</div>
                ) : (
                    <div className="products-grid">
                        {errorMsg && <div className="size-error-toast">{errorMsg}</div>}
                        {products.map((product, index) => (
                            <div
                                key={product.id}
                                className={`product-card scroll-animate ${isVisible ? 'visible' : ''}`}
                                style={{ transitionDelay: `${(index % 8) * 0.1}s` }}
                            >
                                <div className="product-card-image">
                                    <img src={product.image_url} alt={product.title} className="product-img-default" />
                                    <div className="product-quick-add">
                                        <button onClick={() => handleAddToCart(product)}>
                                            Savatga
                                        </button>
                                    </div>
                                </div>
                                <div className="product-card-info">
                                    <div className="product-card-category">{product.category}</div>
                                    <h3 className="product-card-name">{product.title}</h3>
                                    <div className="product-card-price">{formatPrice(product.price)}</div>

                                    {product.sizes?.length > 0 && (
                                        <div className="size-selector-mini">
                                            <span>O'lcham:</span>
                                            <div className="size-options">
                                                {product.sizes.map((size: string) => (
                                                    <button
                                                        key={size}
                                                        className={selectedSizes[product.id] === size ? 'active' : ''}
                                                        onClick={() => setSelectedSizes({ ...selectedSizes, [product.id]: size })}
                                                    >
                                                        {size}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
