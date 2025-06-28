import { forwardRef } from "react"
import { cn } from "@/lib/utils/cn"

const Select = forwardRef(({ className, error = false, children, ...props }, ref) => {
    return (
        <select
            className={cn(
                "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                error && "border-red-500 focus-visible:ring-red-500",
                className,
            )}
            ref={ref}
            aria-invalid={error}
            {...props}
        >
            {children}
        </select>
    )
})

Select.displayName = "Select"

export { Select }
