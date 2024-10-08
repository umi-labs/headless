import { ButtonType } from "./schema";
import "./button.scss";
import { cn } from "../../lib/utils";

const styles: Array<{ id: number; key: string; classes: string }> = [
  { id: 1, key: "primary", classes: "bg-black text-white" },
  { id: 2, key: "secondary", classes: "bg-black text-white" },
  { id: 3, key: "tertiary", classes: "bg-black text-white" },
];

const stylePicker = (key: string) => {
  return styles.find((style) => style.key === key);
};

export default function Button({
  label,
  variant = "primary",
  onClick,
  ...props
}: ButtonType) {
  console.log(stylePicker(variant));

  return (
    <button
      onClick={onClick}
      className={cn("")}
      data-variant={variant}
      {...props}
    >
      {label}
    </button>
  );
}

Button.displayName = "Button";
