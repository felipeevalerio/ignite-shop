import { ReactNode, createContext, useState } from "react";

export interface Product {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
    priceId: string;
}

interface ShoppingCartContextActions {
    cart: Product[];
    isCartOpen: boolean;
    handleIsCartOpenVisibility: (isOpen: boolean) => void; 
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    getProductQuantity: () => number;
    getTotalValue: () => number;
}

export const ShoppingCartContext = createContext({} as ShoppingCartContextActions);

interface ShoppingCartProviderProps {
    children: ReactNode;
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
    const [cart, setCart] = useState<Product[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    
    function addToCart(product: Product) {
        const productAlreadyInCart = cart.find(p => p.id === product.id);
        
        if (!productAlreadyInCart) {
            setCart((state) => [...state, product]);
        }
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

    function handleIsCartOpenVisibility(isOpen: boolean) {
        setIsCartOpen(isOpen);
    }

    const valueContext: ShoppingCartContextActions = {
        addToCart,
        handleIsCartOpenVisibility,
        cart, 
        isCartOpen,
        removeFromCart, 
        getProductQuantity, 
        getTotalValue
    }

    return (
        <ShoppingCartContext.Provider value={valueContext}>
            {children}
        </ShoppingCartContext.Provider>   
    )
}