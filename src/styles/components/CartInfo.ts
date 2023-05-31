import { styled } from "..";

export const CartInfoContainer = styled('aside', {
    boxShadow: '-4px 0 30px 0 rgba(0,0,0,0.8)',
    position: 'fixed',
    right: 0,
    top: 0,
    maxWidth: 480,
    height: '100vh',
    backgroundColor: '$gray800',
    width: '100%',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',

    'button:first-child': {
       cursor: 'pointer',
       background: 'transparent',
       border: 0,
       width: 24,
       alignSelf: 'flex-end'
    },

    h2: {
        fontSize: '$md',
        margin: '1.5rem 0 2rem',
    },

    ul: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
    }
    
})

export const TotalInfo = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 'auto',
    gap: 6,

    span: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        
        '& + &': {
            marginBottom: 50
        }
    },
})