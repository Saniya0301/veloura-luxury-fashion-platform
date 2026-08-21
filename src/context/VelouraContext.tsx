"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface ColorVariant {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  description: string;
  primaryImage: string;
  secondaryImage: string;
  images: string[];
  colorVariants: ColorVariant[];
  sizes: string[];
  details: string[];
  material: string;
  care: string;
  rating: string | null;
  isSignature: boolean;
  isNew: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

interface VelouraContextType {
  cart: CartItem[];
  wishlist: Product[];
  productsList: Product[];
  isCartOpen: boolean;
  isWishlistOpen: boolean;
  isSearchOpen: boolean;
  isAssistantOpen: boolean;
  isQuickViewOpen: boolean;
  quickViewProduct: Product | null;
  searchTerm: string;
  
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  setWishlist: React.Dispatch<React.SetStateAction<Product[]>>;
  setProductsList: (products: Product[]) => void;
  setIsCartOpen: (isOpen: boolean) => void;
  setIsWishlistOpen: (isOpen: boolean) => void;
  setIsSearchOpen: (isOpen: boolean) => void;
  setIsAssistantOpen: (isOpen: boolean) => void;
  setSearchTerm: (term: string) => void;
  
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  addToCart: (product: Product, quantity: number, size: string, color: string) => void;
  removeFromCart: (productId: string, size: string, color: string) => void;
  updateCartQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  clearCart: () => void;
}

const VelouraContext = createContext<VelouraContextType | undefined>(undefined);

export function VelouraProvider({ 
  children,
  initialProducts = []
}: { 
  children: ReactNode;
  initialProducts?: Product[];
}) {
  const [productsList, setProductsListState] = useState<Product[]>(initialProducts);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Load cart and wishlist from localStorage on client mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("veloura_cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
      
      const savedWishlist = localStorage.getItem("veloura_wishlist");
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }
    } catch (e) {
      console.error("Failed to load local storage:", e);
    }
  }, []);

  // Save changes to localstorage
  useEffect(() => {
    if (cart.length > 0 || typeof window !== "undefined") {
      localStorage.setItem("veloura_cart", JSON.stringify(cart));
    }
  }, [cart]);

  useEffect(() => {
    if (wishlist.length > 0 || typeof window !== "undefined") {
      localStorage.setItem("veloura_wishlist", JSON.stringify(wishlist));
    }
  }, [wishlist]);

  const setProductsList = (prods: Product[]) => {
    setProductsListState(prods);
  };

  const openQuickView = (product: Product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  const closeQuickView = () => {
    setIsQuickViewOpen(false);
    setQuickViewProduct(null);
  };

  const addToCart = (product: Product, quantity: number, size: string, color: string) => {
    setCart((prev) => {
      // Find if item already exists with exact same size and color
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.size === size &&
          item.color === color
      );

      if (existingIndex > -1) {
        const nextCart = [...prev];
        nextCart[existingIndex].quantity += quantity;
        return nextCart;
      }

      return [...prev, { product, quantity, size, color }];
    });
    
    // Automatically trigger cart drawer slide-in for delightful feedback
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, size: string, color: string) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.size === size &&
            item.color === color
          )
      )
    );
  };

  const updateCartQuantity = (
    productId: string,
    size: string,
    color: string,
    quantity: number
  ) => {
    if (quantity <= 0) {
      removeFromCart(productId, size, color);
      return;
    }
    setCart((prev) => {
      return prev.map((item) => {
        if (
          item.product.id === productId &&
          item.size === size &&
          item.color === color
        ) {
          return { ...item, quantity };
        }
        return item;
      });
    });
  };

  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.id === productId);
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("veloura_cart");
  };

  return (
    <VelouraContext.Provider
      value={{
        cart,
        wishlist,
        productsList,
        isCartOpen,
        isWishlistOpen,
        isSearchOpen,
        isAssistantOpen,
        isQuickViewOpen,
        quickViewProduct,
        searchTerm,
        setCart,
        setWishlist,
        setProductsList,
        setIsCartOpen,
        setIsWishlistOpen,
        setIsSearchOpen,
        setIsAssistantOpen,
        openQuickView,
        closeQuickView,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        toggleWishlist,
        isInWishlist,
        clearCart,
        setSearchTerm,
      }}
    >
      {children}
    </VelouraContext.Provider>
  );
}

export function useVeloura() {
  const context = useContext(VelouraContext);
  if (context === undefined) {
    throw new Error("useVeloura must be used within a VelouraProvider");
  }
  return context;
}
