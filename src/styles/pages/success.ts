import { styled } from "..";

export const SuccessContainer = styled('main', {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto',
    height: 656,

    h1: {
        fontSize: '$2xl',
        color: '$gray100'
    },

    p: {
        fontSize: '$xl',
        color: '$gray300',
        maxWidth: 560,
        textAlign: 'center',
        marginTop: '2rem',
        lineHeight: 1.4
    },

    a: {
        marginTop: '5rem',
        display: 'block',
        textDecoration: 'none',
        color: '$green500',
        fontWeight: 'bold',

        '&:hover': {
            color: '$green300'
        }
    },

    ul: {
        display: 'flex',
        position: 'relative',
        
    }
})

export const ImageContainer = styled('div', {
    width: '100%',
    maxWidth: 140,
    marginTop: '4rem',
    height: 140,
    background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
    borderRadius: '50%',
    padding: '0.25rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    '& + &': {
        marginLeft: -52
    },
    
    variants: {
        orderOfImages: {
            "1": {
                zIndex: 1
            },
            "2": {
                zIndex: 2
            }, 
            "3": {
                zIndex: 3
            }, 
            "4": {
                zIndex: 4
            }, 
        },
    },

    img: {
        objectFit: 'cover',
        mixBlendMode: 'multiply',
        borderRadius: 'inherit'
    }
})