import { forwardRef } from "react"
import { cn } from "@/lib/utils/cn"

const Checkbox = forwardRef(({ className, children, id, ...props }, ref) => {
    return (
        <div className="flex items-center space-x-2">
            <input
                type="checkbox"
                ref={ref}
                id={id}
                className={cn(
                    "h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
                    className,
                )}
                {...props}
            />
            {children && (
                <label htmlFor={id} className="text-sm font-medium leading-none cursor-pointer">
                    {children}
                </label>
            )}
        </div>
    )
})
Checkbox.displayName = "Checkbox"

export { Checkbox }
