import { ButtonType } from "./schema";
import "./button.scss";

export default function Button({ label, variant, onClick, ...props }: ButtonType) {
    return <button onClick={onClick} data-variant={variant} {...props}>{label}</button>;
}

Button.displayName = "Button";