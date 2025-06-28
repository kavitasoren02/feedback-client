import { forwardRef } from "react"
import { cn } from "@/lib/utils/cn"

const Label = forwardRef(({ className, required = false, children, ...props }, ref) => {
    return (
        <label
            ref={ref}
            className={cn(
                "block text-sm font-medium text-foreground",
                required && "after:content-['*'] after:ml-0.5 after:text-red-500",
                className,
            )}
            {...props}
        >
            {children}
        </label>
    )
})

Label.displayName = "Label"

export { Label }
