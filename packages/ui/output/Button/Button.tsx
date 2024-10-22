import { cn } from "@/lib/utils";

interface ButtonProps {
    label: string;
    onClick: (...args_0: unknown[]) => unknown;
    variant?: ("primary" | "secondary" | "tertiary") | undefined;
}

const baseStyles =
  "inline-block rounded-full border-2 px-4 py-2 text-sm font-medium";

const styles: Array<{ id: number; key: string; classes: string }> = [
  { id: 1, key: "primary", classes: "bg-black text-white" },
  { id: 2, key: "secondary", classes: "bg-white text-black" },
  { id: 3, key: "tertiary", classes: "bg-blue text-white" },
];

const stylePicker = (key: string) => {
  return styles.find((style) => style.key === key);
};

export default function Button({
  label,
  variant = "primary",
  onClick,
  ...props
}: ButtonProps) {

  return (
    <button
      onClick={onClick}
      className={cn(baseStyles, stylePicker(variant)?.classes)}
      {...props}
    >
      {label}
    </button>
  );
}

