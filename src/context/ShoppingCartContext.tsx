import { ReactNode, createContext, useState } from "react";

interface CartProduct {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
}

interface ShoppingCartContextActions {
    cart: CartProduct[];
    addToCart: (product: CartProduct) => void;
    removeFromCart: (productId: string) => void;
    getProductQuantity: () => number;
    getTotalValue: () => number;
}

export const ShoppingCartContext = createContext({} as ShoppingCartContextActions);

interface ShoppingCartProviderProps {
    children: ReactNode;
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
    const [cart, setCart] = useState<CartProduct[]>([]);
    
    function addToCart(product: CartProduct) {
        setCart((state) => [...state, product]);
    }

    function removeFromCart(productId: string) {
        const cartWithoutSelectedProduct = cart.filter(product => product.id !== productId);
        setCart(cartWithoutSelectedProduct);
    }
    
    function getProductQuantity() {
        return cart.length;
    }

    function getTotalValue() {
        return cart.reduce((acc, product) => {
            return acc + product.price;
        }, 0);
    }

    return (
        <ShoppingCartContext.Provider value={{cart, addToCart, removeFromCart, getProductQuantity, getTotalValue}}>
            {children}
        </ShoppingCartContext.Provider>   
    )
}