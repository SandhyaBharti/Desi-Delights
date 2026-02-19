import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within CartProvider');
    }
    return context;
};

export const CartProvider = ({ children, userId }) => {
    // Use a user-specific localStorage key so carts don't bleed across accounts
    const cartKey = userId ? `cartItems_${userId}` : null;

    const [cartItems, setCartItems] = useState([]);

    // Load the correct cart whenever the logged-in user changes
    useEffect(() => {
        if (cartKey) {
            const savedCart = localStorage.getItem(cartKey);
            setCartItems(savedCart ? JSON.parse(savedCart) : []);
        } else {
            // No user logged in → show empty cart
            setCartItems([]);
        }
    }, [cartKey]);

    // Persist the cart to the correct user-specific key
    useEffect(() => {
        if (cartKey) {
            localStorage.setItem(cartKey, JSON.stringify(cartItems));
        }
    }, [cartItems, cartKey]);

    const addToCart = (product, quantity = 1) => {
        setCartItems((prev) => {
            const existingItem = prev.find((item) => item._id === product._id);

            if (existingItem) {
                return prev.map((item) =>
                    item._id === product._id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }

            return [...prev, { ...product, quantity }];
        });
    };

    const removeFromCart = (productId) => {
        setCartItems((prev) => prev.filter((item) => item._id !== productId));
    };

    const updateQuantity = (productId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }

        setCartItems((prev) =>
            prev.map((item) =>
                item._id === productId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const getTotalItems = () => {
        return cartItems.reduce((sum, item) => sum + item.quantity, 0);
    };

    const getTotalPrice = () => {
        return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    };

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
