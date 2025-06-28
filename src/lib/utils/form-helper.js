import { FIELD_TYPES_WITH_OPTIONS } from "../validation/form-builder"

export const requiresOptions = (fieldType) => {
    return FIELD_TYPES_WITH_OPTIONS.includes(fieldType)
}

export const getDefaultField = (type = "text") => {
    const baseField = {
        label: "",
        type,
        required: false,
        placeholder: "",
    }

    if (requiresOptions(type)) {
        baseField.options = [""]
    } else {
        baseField.options = []
    }

    return baseField
}

export const cleanFieldData = (field) => {
    const cleanedField = { ...field }

    if (!requiresOptions(field.type)) {
        delete cleanedField.options
    }

    if (requiresOptions(field.type)) {
        delete cleanedField.placeholder
    }

    return cleanedField
}

export const validateField = (field) => {
    const errors = []

    if (!field.label || field.label.trim() === "") {
        errors.push("Field label is required")
    }

    if (!field.type) {
        errors.push("Field type is required")
    }

    if (requiresOptions(field.type)) {
        if (!field.options || field.options.length === 0) {
            errors.push("At least one option is required for this field type")
        } else {
            const emptyOptions = field.options.filter((option) => !option || option.trim() === "")
            if (emptyOptions.length > 0) {
                errors.push("All options must have values")
            }

            const uniqueOptions = new Set(field.options.filter(Boolean))
            if (uniqueOptions.size !== field.options.filter(Boolean).length) {
                errors.push("All options must be unique")
            }
        }
    }

    return errors
}

export const generateFormPreview = (config) => {
    return {
        title: config.title || "Untitled Form",
        description: config.description || "",
        fields: config.fields.map((field, index) => ({
            id: `field_${index}`,
            ...cleanFieldData(field),
        })),
        isActive: config.is_active,
    }
}
