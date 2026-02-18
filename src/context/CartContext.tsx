'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Product } from '../data/products';

export interface CartItem {
    product: Product;
    quantity: number;
    giftWrap: boolean;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    toggleGiftWrap: (productId: string) => void;
    clearCart: () => void;
    totalItems: number;
    totalPrice: number;
    isCartOpen: boolean;
    setCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error('useCart must be used within CartProvider');
    return ctx;
}

const GIFT_WRAP_PRICE = 15000;

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isCartOpen, setCartOpen] = useState(false);

    const addToCart = (product: Product) => {
        setItems(prev => {
            const existing = prev.find(item => item.product.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { product, quantity: 1, giftWrap: false }];
        });
        setCartOpen(true);
    };

    const removeFromCart = (productId: string) => {
        setItems(prev => prev.filter(item => item.product.id !== productId));
    };

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        setItems(prev =>
            prev.map(item =>
                item.product.id === productId ? { ...item, quantity } : item
            )
        );
    };

    const toggleGiftWrap = (productId: string) => {
        setItems(prev =>
            prev.map(item =>
                item.product.id === productId
                    ? { ...item, giftWrap: !item.giftWrap }
                    : item
            )
        );
    };

    const clearCart = () => setItems([]);

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => {
        const base = item.product.price * item.quantity;
        const wrap = item.giftWrap ? GIFT_WRAP_PRICE * item.quantity : 0;
        return sum + base + wrap;
    }, 0);

    return (
        <CartContext.Provider value={{
            items, addToCart, removeFromCart, updateQuantity,
            toggleGiftWrap, clearCart, totalItems, totalPrice,
            isCartOpen, setCartOpen
        }}>
            {children}
        </CartContext.Provider>
    );
}
