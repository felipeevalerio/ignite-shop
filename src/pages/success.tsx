import Link from "next/link";
import { ImageContainer, SuccessContainer } from "../styles/pages/success";
import Image from 'next/image'
import { GetServerSideProps } from "next";
import { stripe } from "../lib/stripe";
import Stripe from "stripe";
import Head from "next/head";

export interface SuccessProps {
    customerName: string;
    product: {
        name: string;
        image: string;
    }
}

export default function Success({customerName , product}: SuccessProps) {
    return (
        <>
            <Head>
                <title>Compra efetuada | Ignite Shop</title>
                <meta name="robots" content="noindex"/>
            </Head>
            <SuccessContainer>
                <h1>Compra efetuada</h1>

                <ImageContainer>
                    <Image src={product.image} width={120} height={110} alt={""}/>
                </ImageContainer>

                <p>Uhuul <strong>{customerName}</strong>, sua <strong>{product.name}</strong> já está a caminho</p>
            
                <Link href="/">Voltar ao catálogo</Link>
            </SuccessContainer>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    if (!query.sessionId) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    const sessionId = String(query.session_id);
    
    const sessionRequest = stripe.checkout.sessions.retrieve(sessionId);
    const itemsRequest = stripe.checkout.sessions.listLineItems(sessionId);

    const [session, items] = await Promise.all([sessionRequest, itemsRequest])

    const productId = items.data[0].price.product.toString();
    const product = await stripe.products.retrieve(productId);

    const customerName = session.customer_details.name;

    return {
        props: {
            customerName,
            product: {
                name: product.name,
                image: product?.images[0]
            }
        }
    }
}