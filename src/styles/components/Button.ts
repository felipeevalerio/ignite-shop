import { styled } from "..";

export const ButtonContainer = styled('button', {
    backgroundColor: '$green500',
    border: 0,
    color: '$white',
    borderRadius: 8,
    fontSize: '$md',
    padding: '1.25rem',
    cursor: 'pointer',
    fontWeight: 'bold',

    '&:not(:disabled):hover': {
        backgroundColor: '$green300'
    },

    '&:disabled': {
        opacity: 0.6,
        cursor: 'not-allowed'
    }
})