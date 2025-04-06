"use client";

import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Product } from '../mock/products';

// Define types
export interface CartItem {
  _id?: string;
  id?: number; // For localStorage cart
  product?: {
    _id: string;
    name: string;
    price: number;
    image: string;
    stock: number;
  };
  title?: string; // For localStorage cart
  price?: number; // For localStorage cart
  image?: string; // For localStorage cart
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (productId: string | number, quantity: number, product?: Product) => Promise<void>;
  removeFromCart: (productId: string | number) => Promise<void>;
  updateCartItemQuantity: (productId: string | number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  loading: boolean;
  error: string | null;
  totalItems: number;
  subtotal: number;
}

// Local storage key
const CART_STORAGE_KEY = 'nestmart-cart';

// Helper functions for localStorage cart
const getLocalCart = (): CartItem[] => {
  if (typeof window === 'undefined') {
    return [];
  }
  
  const cartData = localStorage.getItem(CART_STORAGE_KEY);
  return cartData ? JSON.parse(cartData) : [];
};

const saveLocalCart = (cartItems: CartItem[]): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }
};

// Create context with default values
const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: async () => {},
  removeFromCart: async () => {},
  updateCartItemQuantity: async () => {},
  clearCart: async () => {},
  loading: false,
  error: null,
  totalItems: 0,
  subtotal: 0
});

// Custom hook to use cart context
export const useCart = () => useContext(CartContext);

// Cart Provider component
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Calculate derived values
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cartItems.reduce((total, item) => {
    // Handle both API cart items and localStorage cart items
    if (item.product) {
      return total + (item.product.price * item.quantity);
    } else if (item.price) {
      return total + (item.price * item.quantity);
    }
    return total;
  }, 0);

  const API_URL = 'https://nest-mart-backend.vercel.app/api';

  // Load cart on component mount
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem('token');
        // If user is logged in, fetch cart from API
        if (token) {
          setLoading(true);
          const response = await axios.get(`${API_URL}/cart`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          
          if (response.data && response.data.items) {
            setCartItems(response.data.items);
          }
          setLoading(false);
        } else {
          // If user is not logged in, load cart from localStorage
          const localCart = getLocalCart();
          setCartItems(localCart);
        }
      } catch (err) {
        setError('Failed to load cart');
        setLoading(false);
        console.error('Error fetching cart:', err);
        
        // Fallback to localStorage if API fails
        const localCart = getLocalCart();
        setCartItems(localCart);
      }
    };

    fetchCart();
  }, []);

  // Add item to cart
  const addToCart = async (productId: string | number, quantity: number, product?: Product) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        // Handle guest cart (local storage)
        const localCart = getLocalCart();
        const existingItemIndex = localCart.findIndex(item => 
          (typeof productId === 'string' && item._id === productId) || 
          (typeof productId === 'number' && item.id === productId)
        );
        
        if (existingItemIndex >= 0) {
          // Update quantity if item already exists
          localCart[existingItemIndex].quantity += quantity;
        } else if (product) {
          // Add new item using the product data
          const newItem: CartItem = {
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity
          };
          localCart.push(newItem);
        }
        
        saveLocalCart(localCart);
        setCartItems(localCart);
        setLoading(false);
        return;
      }

      // Handle logged in user (API)
      const response = await axios.post(
        `${API_URL}/cart/add`,
        { productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data && response.data.cart && response.data.cart.items) {
        // Fetch the entire cart to ensure we have the most up-to-date data
        const cartResponse = await axios.get(`${API_URL}/cart`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setCartItems(cartResponse.data.items);
      }
      
      setLoading(false);
    } catch (err) {
      setError('Failed to add item to cart');
      setLoading(false);
      console.error('Error adding to cart:', err);
    }
  };

  // Remove item from cart
  const removeFromCart = async (productId: string | number) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        // Handle guest cart (localStorage)
        const localCart = getLocalCart();
        const updatedCart = localCart.filter(item => 
          !(typeof productId === 'string' && item._id === productId) && 
          !(typeof productId === 'number' && item.id === productId)
        );
        
        saveLocalCart(updatedCart);
        setCartItems(updatedCart);
        setLoading(false);
        return;
      }

      // Handle logged in user (API)
      await axios.delete(`${API_URL}/cart/remove/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Update local state by removing the item
      setCartItems(prevItems => prevItems.filter(item => {
        if (item.product && typeof productId === 'string') {
          return item.product._id !== productId;
        } else if (item.id && typeof productId === 'number') {
          return item.id !== productId;
        }
        return true;
      }));
      
      setLoading(false);
    } catch (err) {
      setError('Failed to remove item from cart');
      setLoading(false);
      console.error('Error removing from cart:', err);
    }
  };

  // Update cart item quantity
  const updateCartItemQuantity = async (productId: string | number, quantity: number) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        // Handle guest cart (localStorage)
        const localCart = getLocalCart();
        const updatedCart = localCart.map(item => {
          if ((typeof productId === 'string' && item._id === productId) || 
              (typeof productId === 'number' && item.id === productId)) {
            return { ...item, quantity };
          }
          return item;
        });
        
        // If quantity is 0, remove the item
        if (quantity <= 0) {
          return removeFromCart(productId);
        }
        
        saveLocalCart(updatedCart);
        setCartItems(updatedCart);
        setLoading(false);
        return;
      }

      // Handle logged in user (API)
      await axios.put(
        `${API_URL}/cart/update/${productId}`,
        { quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update local state
      setCartItems(prevItems =>
        prevItems.map(item => {
          if (item.product && typeof productId === 'string' && item.product._id === productId) {
            return { ...item, quantity };
          } else if (item.id && typeof productId === 'number' && item.id === productId) {
            return { ...item, quantity };
          }
          return item;
        })
      );
      
      setLoading(false);
    } catch (err) {
      setError('Failed to update cart');
      setLoading(false);
      console.error('Error updating cart:', err);
    }
  };

  // Clear entire cart
  const clearCart = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        // Handle guest cart (localStorage)
        localStorage.removeItem(CART_STORAGE_KEY);
        setCartItems([]);
        setLoading(false);
        return;
      }

      // Handle logged in user (API)
      await axios.delete(`${API_URL}/cart/clear`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Clear local state
      setCartItems([]);
      setLoading(false);
    } catch (err) {
      setError('Failed to clear cart');
      setLoading(false);
      console.error('Error clearing cart:', err);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        clearCart,
        loading,
        error,
        totalItems,
        subtotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
}; 