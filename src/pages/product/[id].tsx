import { ImageContainer, ProductContainer, ProductDetails } from "../../styles/pages/product";
import Image from 'next/image';
import { GetStaticPaths, GetStaticProps } from "next";
import { stripe } from '../../lib/stripe';
import Stripe from "stripe";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import axios from "axios";
import Head from "next/head";
import { ShoppingCartContext } from "../../context/ShoppingCartContext";
import { useContext } from "react";
import { formatPriceToBRL } from "../../utils/NumberUtils";
import { Button } from "../../components/Button";

interface ProductProps {
    product: {
        id: string;
        name: string;
        imageUrl: string;
        price: number;
        description: string;
        defaultPriceId: string;
    }
}

export default function Product({ product }: ProductProps) {
    const { isFallback } = useRouter();


    const { addToCart } = useContext(ShoppingCartContext);

    if (isFallback) {
        return <p>Loading...</p>
    }

    async function handleOpenCart() {
        addToCart({
            id: product.id,
            imageUrl: product.imageUrl,
            name: product.name,
            price: product.price,
            priceId: product.defaultPriceId
        });
    }

    const formattedPrice = formatPriceToBRL(product.price)

    return (
        <>
            <Head>
                <title>{product.name} | Ignite Shop</title>
            </Head>
            <ProductContainer>
                <ImageContainer>
                    <Image 
                        src={product.imageUrl} 
                        width={520} 
                        height={480}
                        alt=""
                    />
                </ImageContainer>

                <ProductDetails>
                    <h1>{product.name}</h1>
                    <span>{formattedPrice}</span>

                    <p>{product.description}</p>
                    <Button onClick={handleOpenCart}>Comprar agora</Button>
                </ProductDetails>
            </ProductContainer>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [{params: {id: "prod_NbVjN74Y2y66GH"}}],
        fallback: true
    }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
    const productId = params.id

    const product = await stripe.products.retrieve(productId, {
        expand: ['default_price']
    });

    const price = product.default_price as Stripe.Price

    return {
        props: {
            product: {
                id: product.id,
                name: product.name,
                description: product.description,
                imageUrl: product.images[0],
                price: price.unit_amount / 100,
                defaultPriceId: price.id
            }
        },
        revalidate: 60 * 60 * 1 // 1 hour
    }
}