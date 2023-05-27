import { styled } from "..";

export const ShoppingCartContainer = styled('button', {
    padding: '0.75rem',
    backgroundColor: '$gray800',
    border: 0,
    borderRadius: 6,
    position: 'relative',
    cursor: 'pointer',
})

export const QuantityNotification = styled('span', {
    position: 'absolute',
    fontSize: '$sm',
    width: 24,
    top: '-0.75rem',
    right: '-0.75rem',
    fontWeight: 'bold',
    height: 24,
    lineHeight: '160%',
    variants: {
        hasItems: {
            true: {
                display: 'flex',
                justifyContent: 'center',
                textAlign: 'center',
                backgroundColor: '$green500',
                borderRadius: '50%',
                color: '$white',
                height: 27,
                width: 27,
                border: '3px solid $gray900',
            },
            false: {
                display: 'none'
            }
        }
    },
})