import { useState, useEffect, useRef } from 'react';
import { formatPrice } from '../data/products';
import { supabase } from '@/lib/supabase';
import './LiveSearch.css';

interface LiveSearchProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function LiveSearch({ isOpen, onClose }: LiveSearchProps) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
        if (!isOpen) {
            setQuery('');
            setResults([]);
        }
    }, [isOpen]);

    useEffect(() => {
        const handleSearch = async () => {
            if (!query.trim()) {
                setResults([]);
                return;
            }
            setLoading(true);
            const { data } = await supabase
                .from('products')
                .select('*')
                .or(`title.ilike.%${query}%,category.ilike.%${query}%,description.ilike.%${query}%`)
                .limit(10);

            setResults(data || []);
            setLoading(false);
        };

        const timer = setTimeout(handleSearch, 300);
        return () => clearTimeout(timer);
    }, [query]);

    // Group results by category
    const grouped = results.reduce((groups: Record<string, any[]>, p) => {
        if (!groups[p.category]) groups[p.category] = [];
        groups[p.category].push(p);
        return groups;
    }, {});

    if (!isOpen) return null;

    return (
        <div className="live-search-overlay">
            <div className="live-search-header">
                <svg viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="7" />
                    <path d="M16.5 16.5L21 21" strokeLinecap="round" />
                </svg>
                <input
                    ref={inputRef}
                    className="live-search-input"
                    type="text"
                    placeholder="Mahsulotlarni qidiring..."
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                />
                <button className="live-search-close" onClick={onClose}>✕</button>
            </div>

            <div className="live-search-results">
                {!query.trim() && (
                    <div className="live-search-hint">
                        <p>✦ Mahsulot nomini yozing</p>
                        <span>Masalan: "Uzuk", "Zirak", "Erkaklar"</span>
                    </div>
                )}

                {query.trim() && results.length === 0 && (
                    <div className="live-search-empty">
                        <svg viewBox="0 0 24 24">
                            <circle cx="11" cy="11" r="7" />
                            <path d="M16.5 16.5L21 21" strokeLinecap="round" />
                        </svg>
                        <p>"{query}" bo'yicha hech narsa topilmadi</p>
                    </div>
                )}

                {Object.entries(grouped).map(([category, items]) => (
                    <div key={category} className="live-search-category">
                        <h4>{category}</h4>
                        {items.map(product => (
                            <div key={product.id} className="live-search-item" onClick={onClose}>
                                <img
                                    src={product.image_url}
                                    alt={product.title}
                                    className="live-search-item-img"
                                    loading="lazy"
                                />
                                <div className="live-search-item-info">
                                    <div className="live-search-item-name">{product.title}</div>
                                    <div className="live-search-item-price">{formatPrice(product.price)}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
