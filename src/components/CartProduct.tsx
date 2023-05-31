import Image from "next/image";
import { Product, ShoppingCartContext } from "../context/ShoppingCartContext";
import { useContext } from "react";
import { CartProductContainer, CartProductInfo, ImageContainer } from "../styles/components/CartProduct";
import { formatPriceToBRL } from "../utils/NumberUtils";

interface CartProductProps {
    product: Product;
}

export function CartProduct({ product }: CartProductProps) {
    const { removeFromCart } = useContext(ShoppingCartContext);

    const formattedPrice = formatPriceToBRL(product.price);
    return (
        <CartProductContainer>
            <ImageContainer>
                <Image src={product.imageUrl} width={120} height={80} alt="" />
            </ImageContainer>
            <CartProductInfo>
                <span>
                    <p>{product.name}</p>
                    <strong>{formattedPrice}</strong>
                </span>
                <button onClick={() => removeFromCart(product.id)}>Remover</button>
            </CartProductInfo>
        </CartProductContainer>
    )
}