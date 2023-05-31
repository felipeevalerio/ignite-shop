import Link from "next/link";
import { ImageContainer, SuccessContainer } from "../styles/pages/success";
import Image from 'next/image'
import { GetServerSideProps } from "next";
import { stripe } from "../lib/stripe";
import Head from "next/head";

export interface SuccessProps {
    customerName: string;
    products: string[]
}

export default function Success({customerName , products}: SuccessProps) {
    return (
        <>
            <Head>
                <title>Compra efetuada | Ignite Shop</title>
                <meta name="robots" content="noindex"/>
            </Head>
            <SuccessContainer>
                <h1>Compra efetuada</h1>
                <ul>
                    {products.map((image, i) => {
                        return <ImageContainer orderOfImages={i} key={image}>
                            <Image  src={image} width={120} height={110} alt={""}/>
                        </ImageContainer>
                    })}
                </ul>

                <p>Uhuul <strong>{customerName}</strong>, sua compra de {products.length} camisetas já está a caminho</p>
            
                <Link href="/">Voltar ao catálogo</Link>
            </SuccessContainer>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const sessionId = String(query.session_id);

    if (!sessionId) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    const sessionRequest = stripe.checkout.sessions.retrieve(sessionId);
    const itemsRequest = stripe.checkout.sessions.listLineItems(sessionId);

    const [session, items] = await Promise.all([sessionRequest, itemsRequest])

    const productId = items.data[0].price.product.toString();
    const products = items.data;

    const allImagesOfProducts: string[] = [];

    for (let product of products) {
        const response = await stripe.products.retrieve(product.price.product.toString());
        allImagesOfProducts.push(response.images[0]);
    }

    const product = stripe.products.retrieve(productId);


    const customerName = session.customer_details.name;

    return {
        props: {
            customerName,
            products: allImagesOfProducts
        }
    }
}