import { forwardRef } from "react"
import { cn } from "@/lib/utils/cn"

const HelperText = forwardRef(({ className, children, ...props }, ref) => {
    return (
        <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props}>
            {children}
        </p>
    )
})

HelperText.displayName = "HelperText"

export { HelperText }
