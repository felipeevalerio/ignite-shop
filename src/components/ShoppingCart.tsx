import Image from "next/image";
import { QuantityNotification, ShoppingCartContainer } from "../styles/components/ShoppingCart";
import shoppingCartImg from '../assets/shopping-cart.svg';

export function ShoppingCart() {
    return (
        <ShoppingCartContainer>
            <QuantityNotification hasItems>1</QuantityNotification>
            <Image 
                src={shoppingCartImg} 
                alt="" 
                width={24}
                height={24}
            />
        </ShoppingCartContainer>
    );
}