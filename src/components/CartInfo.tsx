import { useContext } from "react";
import { CartInfoContainer, TotalInfo } from "../styles/components/CartInfo";
import { useMutation } from "react-query";
import axios from "axios";
import Image from 'next/image';
import closeImg from '../assets/close.svg';
import { ShoppingCartContext } from "../context/ShoppingCartContext";
import { CartProduct } from "./CartProduct";
import { Button } from "./Button";
import { formatPriceToBRL } from "../utils/NumberUtils";

export function CartInfo() {
    const { mutate, isLoading } = useMutation(handleBuyProduct);
    const { isCartOpen, handleIsCartOpenVisibility, cart, getProductQuantity, getTotalValue } = useContext(ShoppingCartContext);

    async function handleBuyProduct() {
        const allPriceIds = cart.map((product) => {
            return product.priceId;
        })

        const response = await axios.post('/api/checkout', {
            priceIds: allPriceIds
        });

        const { checkoutURL } = response.data;

        window.location.href = checkoutURL;
    }

    function handleCloseCartInfo() {
        handleIsCartOpenVisibility(false);
    }

    const formattedPrice = formatPriceToBRL(getTotalValue());

    return isCartOpen && (
        <CartInfoContainer>
            <button onClick={handleCloseCartInfo}>
                <Image src={closeImg} alt="" width={24} height={24} />
            </button>

            <h2>Sacola de compras</h2>

            <ul>
                {cart.map(product => {
                    return (
                        <CartProduct key={product.id} product={product} />
                    )
                })}
            </ul>

            <TotalInfo>
                <span><p>Quantidade</p><p>{getProductQuantity()} itens</p></span>
                <span><strong>Valor total</strong><strong>{formattedPrice}</strong></span>
                <Button disabled={isLoading} onClick={() => mutate()}>Comprar agora</Button>
            </TotalInfo>
        </CartInfoContainer>
    )
}