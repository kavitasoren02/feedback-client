import { forwardRef } from "react"
import { cn } from "@/lib/utils/cn"

const Textarea = forwardRef(({ className, error = false, ...props }, ref) => {
    return (
        <textarea
            className={cn(
                "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-vertical",
                error && "border-red-500 focus-visible:ring-red-500",
                className,
            )}
            ref={ref}
            aria-invalid={error}
            {...props}
        />
    )
})

Textarea.displayName = "Textarea"

export { Textarea }
