import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility function to conditionally join and merge CSS classes
 * Combines clsx for conditional classes and tailwind-merge for Tailwind CSS conflicts
 */
export function cn(...inputs) {
    return twMerge(clsx(inputs))
}
