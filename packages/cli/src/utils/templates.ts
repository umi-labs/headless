// Define a template for components
export const componentTemplate = (componentName: string) => `
import React from 'react';

const ${componentName} = () => {
    return (
        <div>
            <h1>${componentName} Component</h1>
        </div>
    );
};

export default ${componentName};
`;

export const UTILS = `import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`