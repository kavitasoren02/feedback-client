import { forwardRef, useState } from "react"
import { cn } from "@/lib/utils/cn"
import { Input } from "../ui/Input"
import { Textarea } from "../ui/textarea"
import { Select } from "../ui/select"
import { Label } from "../ui/label"
import { ErrorMessage } from "../ui/error-message"
import { HelperText } from "../ui/helper-text"
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { RadioGroup, RadioItem } from "../ui/radio"
import { Checkbox } from "../ui/checkbox"
import { FileInput } from "../ui/file-input"

const InputWithLabel = forwardRef(
    (
        {
            label,
            error,
            helperText,
            required = false,
            type = "text",
            options = [],
            placeholder,
            rows = 4,
            resize = true,
            containerClassName,
            labelProps,
            errorProps,
            helperProps,
            id,
            ...inputProps
        },
        ref,
    ) => {
        const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`
        const hasError = !!error
        const [showPassword, setShowPassword] = useState(false)
        const renderInput = () => {
            switch (type) {
                case 'select':
                    return (
                        <Select
                            ref={ref}
                            id={inputId}
                            error={hasError}
                            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
                            {...inputProps}
                        >
                            {placeholder && (
                                <option value="" disabled>
                                    {placeholder}
                                </option>
                            )}
                            {options.map((option, index) => {
                                const value = typeof option === "string" ? option : option.value
                                const displayText = typeof option === "string" ? option : option.label || option.value

                                return (
                                    <option key={index} value={value}>
                                        {displayText}
                                    </option>
                                )
                            })}
                        </Select>
                    )

                case "textarea":
                    return (
                        <Textarea
                            ref={ref}
                            id={inputId}
                            error={hasError}
                            placeholder={placeholder}
                            rows={rows}
                            className={cn(!resize && "resize-none")}
                            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
                            {...inputProps}
                        />
                    )

                case "radio":
                    return (
                        <RadioGroup
                            ref={ref}
                            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
                            {...inputProps}
                        >
                            {options.map((option, index) => {
                                const optionValue = typeof option === "string" ? option : option.value
                                const displayText = typeof option === "string" ? option : option.label || option.value
                                const radioId = `${inputId}-${index}`

                                return (
                                    <RadioItem
                                        key={index}
                                        value={optionValue}
                                        id={radioId}
                                        name={inputProps.name || inputId}
                                        {...inputProps}
                                    >
                                        {displayText}
                                    </RadioItem>
                                )
                            })}
                        </RadioGroup>
                    )

                case "checkbox":
                    return (
                        <Checkbox
                            ref={ref}
                            id={inputId}
                            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
                            {...inputProps}
                        >
                            {placeholder}
                        </Checkbox>
                    )

                case "file":
                    return (
                        <FileInput
                            ref={ref}
                            id={inputId}
                            error={hasError}
                            multiple={false}
                            accept={accept}
                            onFileChange={onFileChange}
                            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
                            {...inputProps}
                        />
                    )
                
                default:
                    return (
                        <div className="relative">
                            <Input
                                ref={ref}
                                id={inputId}
                                type={type === "password" && showPassword ? "text" : type}
                                error={hasError}
                                placeholder={placeholder}
                                aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
                                className={cn(
                                    type === "password" && "pr-10",
                                )}
                                {...inputProps}
                            />
                            {type === "password" && (
                                <div className="absolute top-3 right-4">
                                    {showPassword ? <FaRegEye className="cursor-pointer" onClick={() => setShowPassword(false)} /> : <FaRegEyeSlash className="cursor-pointer" onClick={() => setShowPassword(true)} />}
                                </div>
                            )}
                        </div>
                    )
            }
        }

        return (
            <div className={cn("space-y-2", containerClassName)}>
                {label && (
                    <Label htmlFor={inputId} required={required} {...labelProps}>
                        {label}
                    </Label>
                )}

                {renderInput()}

                {error && (
                    <ErrorMessage id={`${inputId}-error`} {...errorProps}>
                        {error}
                    </ErrorMessage>
                )}

                {helperText && !error && (
                    <HelperText id={`${inputId}-helper`} {...helperProps}>
                        {helperText}
                    </HelperText>
                )}
            </div>
        )
    },
)

InputWithLabel.displayName = "InputWithLabel"

export { InputWithLabel }
