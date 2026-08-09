"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "./ProductModal";

export interface CartItem {
    product: Product;
    size: string;
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    isOpen: boolean;
    addItem: (product: Product, size: string) => void;
    removeItem: (productId: string, size: string) => void;
    updateQty: (productId: string, size: string, qty: number) => void;
    openCart: () => void;
    closeCart: () => void;
    totalItems: number;
    isAIStylistOpen: boolean;
    openAIStylist: (product?: Product | null) => void;
    closeAIStylist: () => void;
    aiPreselectedProduct: Product | null;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isAIStylistOpen, setIsAIStylistOpen] = useState(false);
    const [aiPreselectedProduct, setAiPreselectedProduct] = useState<Product | null>(null);

    const addItem = (product: Product, size: string) => {
        setItems((prev) => {
            const existing = prev.find((i) => i.product.id === product.id && i.size === size);
            if (existing) {
                return prev.map((i) =>
                    i.product.id === product.id && i.size === size
                        ? { ...i, quantity: i.quantity + 1 }
                        : i
                );
            }
            return [...prev, { product, size, quantity: 1 }];
        });
        setIsOpen(true);
    };

    const removeItem = (productId: string, size: string) => {
        setItems((prev) => prev.filter((i) => !(i.product.id === productId && i.size === size)));
    };

    const updateQty = (productId: string, size: string, qty: number) => {
        if (qty < 1) { removeItem(productId, size); return; }
        setItems((prev) =>
            prev.map((i) =>
                i.product.id === productId && i.size === size ? { ...i, quantity: qty } : i
            )
        );
    };

    const openAIStylist = (product: Product | null = null) => {
        setAiPreselectedProduct(product);
        setIsAIStylistOpen(true);
    };

    const closeAIStylist = () => {
        setIsAIStylistOpen(false);
        setAiPreselectedProduct(null);
    };

    const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

    return (
        <CartContext.Provider value={{
            items,
            isOpen,
            addItem,
            removeItem,
            updateQty,
            openCart: () => setIsOpen(true),
            closeCart: () => setIsOpen(false),
            totalItems,
            isAIStylistOpen,
            openAIStylist,
            closeAIStylist,
            aiPreselectedProduct
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used within CartProvider");
    return ctx;
}
