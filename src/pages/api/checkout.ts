import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../lib/stripe";

export interface CheckoutRequest {
    priceIds?: string[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { priceIds } = req.body as CheckoutRequest;

    if (req.method !== 'POST') {
        return res.status(405).json({error: 'Method not allowed'});
    }

    if (!priceIds.length) {
        return res.status(400).json({error: 'Price not found.'})
    }

    const checkoutItems = priceIds.map((priceId) => {
        return {
            price: priceId,
            quantity: 1
        }
    })

    console.log(checkoutItems);

    const checkoutSession = await stripe.checkout.sessions.create({
        mode: 'payment',
        line_items: checkoutItems,
        success_url: `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: process.env.NEXT_URL
    })

    return res.status(201).json({
        checkoutURL: checkoutSession.url
    })
}