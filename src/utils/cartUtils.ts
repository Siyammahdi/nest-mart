import { Product } from '../mock/products';

export interface CartItem extends Omit<Product, 'reviews' | 'ingredients' | 'nutritionalInfo'> {
  quantity: number;
}

// Cart storage key
const CART_STORAGE_KEY = 'nestmart-cart';

// Get cart from localStorage
export const getCart = (): CartItem[] => {
  if (typeof window === 'undefined') {
    return [];
  }
  
  const cartData = localStorage.getItem(CART_STORAGE_KEY);
  return cartData ? JSON.parse(cartData) : [];
};

// Save cart to localStorage
export const saveCart = (cartItems: CartItem[]): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }
};

// Add item to cart
export const addToCart = (product: Product, quantity: number = 1): CartItem[] => {
  const cart = getCart();
  const existingItemIndex = cart.findIndex(item => item.id === product.id);
  
  if (existingItemIndex >= 0) {
    // Update quantity if item already exists
    cart[existingItemIndex].quantity += quantity;
  } else {
    // Add new item
    const newItem: CartItem = {
      ...product,
      quantity
    };
    // Remove properties we don't need to store
    delete (newItem as any).reviews;
    delete (newItem as any).ingredients;
    delete (newItem as any).nutritionalInfo;
    
    cart.push(newItem);
  }
  
  saveCart(cart);
  return cart;
};

// Remove item from cart
export const removeFromCart = (productId: number): CartItem[] => {
  const cart = getCart().filter(item => item.id !== productId);
  saveCart(cart);
  return cart;
};

// Update item quantity
export const updateCartItemQuantity = (productId: number, quantity: number): CartItem[] => {
  const cart = getCart();
  const itemIndex = cart.findIndex(item => item.id === productId);
  
  if (itemIndex >= 0) {
    if (quantity <= 0) {
      // Remove item if quantity is 0 or negative
      return removeFromCart(productId);
    }
    cart[itemIndex].quantity = quantity;
    saveCart(cart);
  }
  
  return cart;
};

// Calculate cart total
export const calculateCartTotal = (cart: CartItem[]): number => {
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
};

// Clear cart
export const clearCart = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(CART_STORAGE_KEY);
  }
}; 