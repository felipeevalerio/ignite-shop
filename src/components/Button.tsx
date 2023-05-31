import { ComponentProps } from "react"
import { ButtonContainer } from "../styles/components/Button";

type ButtonProps = ComponentProps<typeof ButtonContainer>;

export function Button({ children, ...props }: ButtonProps) {
    return (
        <ButtonContainer {...props}>{children}</ButtonContainer>
    )
}