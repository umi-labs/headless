import { type ThemeProviderProps } from "next-themes/dist/types";
import { ThemeProvider } from "./theme-provider";
import ContextProvider from "./context-provider";

export default function Provider({ children, ...props }: ThemeProviderProps) {
  return (
    <ThemeProvider {...props}>
      <ContextProvider>{children}</ContextProvider>
    </ThemeProvider>
  );
}
