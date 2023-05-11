import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../lib/stripe";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { priceId } = req.body

    if (req.method !== 'POST') {
        return res.status(405).json({error: 'Method not allowed'});
    }

    if (!priceId) {
        return res.status(400).json({error: 'Price not found.'})
    }

    const checkoutSession = await stripe.checkout.sessions.create({
        mode: 'payment',
        line_items: [
            {
                price: priceId,
                quantity: 1
            }
        ],
        success_url: `${process.env.NEXT_URL}/success`,
        cancel_url: process.env.NEXT_URL
    })

    return res.status(201).json({
        checkoutURL: checkoutSession.url
    })
}