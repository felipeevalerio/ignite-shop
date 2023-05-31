import { QuantityNotification, ShoppingCartContainer } from "../styles/components/ShoppingCart";
import { useContext } from "react";
import { ShoppingCartContext } from "../context/ShoppingCartContext";
import { ShoppingCartColor, ShoppingCartIcon } from "../assets/ShoppingCartIcon";

export function ShoppingCart() {
    const { getProductQuantity } = useContext(ShoppingCartContext);
    const { handleIsCartOpenVisibility } = useContext(ShoppingCartContext);

    const quantity = getProductQuantity();

    function openShoppingCart() {
        handleIsCartOpenVisibility(true);
    }

    return (
        <ShoppingCartContainer onClick={openShoppingCart}>
            <QuantityNotification hasItems={!!quantity}>{quantity}</QuantityNotification>
            <ShoppingCartIcon color={!quantity ? ShoppingCartColor.gray500 : ShoppingCartColor.gray300}/>
        </ShoppingCartContainer>
    );
}