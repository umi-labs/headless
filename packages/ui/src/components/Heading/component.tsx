import { Type as HeadingProps } from "./schema";
import { cn } from "../../lib/utils";

export default function Heading({
  children,
  variant = "h1",
  classNames = "",
}: HeadingProps) {
  switch (variant) {
    case "h1":
      return <h1 className={cn(classNames)}>{children}</h1>;
    case "h2":
      return <h2 className={cn(classNames)}>{children}</h2>;
    case "h3":
      return <h3 className={cn(classNames)}>{children}</h3>;
    case "h4":
      return <h4 className={cn(classNames)}>{children}</h4>;
    case "h5":
      return <h5 className={cn(classNames)}>{children}</h5>;
    case "h6":
      return <h6 className={cn(classNames)}>{children}</h6>;
    default:
      return <h1 className={cn(classNames)}>{children}</h1>;
  }
}

Heading.displayName = "Heading";
