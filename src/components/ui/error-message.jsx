import { forwardRef } from "react"
import { cn } from "@/lib/utils/cn"

const ErrorMessage = forwardRef(({ className, children, ...props }, ref) => {
  return (
    <p ref={ref} className={cn("text-sm text-red-600 dark:text-red-400", className)} role="alert" {...props}>
      {children}
    </p>
  )
})

ErrorMessage.displayName = "ErrorMessage"

export { ErrorMessage }
