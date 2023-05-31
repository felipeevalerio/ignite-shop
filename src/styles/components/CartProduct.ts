import { styled } from "..";

export const CartProductContainer = styled('li', {
    display: 'flex',
    alignItems: 'center',
    gap: '1.25rem',
})

export const CartProductInfo = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,

    span: {
        display: 'flex',
        flexDirection: 'column',
        gap: 2
    },

    button: {
        border: 0,
        fontWeight: 'bold',
        color: '$green500',
        background: 'transparent',
        textAlign: 'left',
        cursor: 'pointer',
        maxWidth: 65
    }
})

export const ImageContainer = styled('div', {
    background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
    borderRadius: 8,
    padding: '0.25rem',
    display: 'flex',
    alignItems: 'center',
    maxWidth: 102,
    img: {
        mixBlendMode: 'multiply',
        objectFit: 'cover'
    }
});