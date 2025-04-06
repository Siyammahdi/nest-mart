"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, getCart, saveCart, addToCart as addItemToCart, removeFromCart as removeItemFromCart, updateCartItemQuantity as updateItemQuantity, clearCart as clearCartItems, calculateCartTotal } from './cartUtils';
import { Product } from '../mock/products';

interface CartContextType {
  cartItems: CartItem[];
  cartTotal: number;
  itemCount: number;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartTotal, setCartTotal] = useState<number>(0);
  const [itemCount, setItemCount] = useState<number>(0);

  // Initialize cart from localStorage
  useEffect(() => {
    const storedCart = getCart();
    setCartItems(storedCart);
    setCartTotal(calculateCartTotal(storedCart));
    setItemCount(storedCart.reduce((count, item) => count + item.quantity, 0));
  }, []);

  // Add item to cart
  const addToCart = (product: Product, quantity: number = 1) => {
    const updatedCart = addItemToCart(product, quantity);
    setCartItems(updatedCart);
    setCartTotal(calculateCartTotal(updatedCart));
    setItemCount(updatedCart.reduce((count, item) => count + item.quantity, 0));
  };

  // Remove item from cart
  const removeFromCart = (productId: number) => {
    const updatedCart = removeItemFromCart(productId);
    setCartItems(updatedCart);
    setCartTotal(calculateCartTotal(updatedCart));
    setItemCount(updatedCart.reduce((count, item) => count + item.quantity, 0));
  };

  // Update item quantity
  const updateQuantity = (productId: number, quantity: number) => {
    const updatedCart = updateItemQuantity(productId, quantity);
    setCartItems(updatedCart);
    setCartTotal(calculateCartTotal(updatedCart));
    setItemCount(updatedCart.reduce((count, item) => count + item.quantity, 0));
  };

  // Clear cart
  const clearCart = () => {
    clearCartItems();
    setCartItems([]);
    setCartTotal(0);
    setItemCount(0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartTotal,
        itemCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}; 