import * as yup from "yup"

const FIELD_TYPES_WITH_OPTIONS = ["select", "radio", "checkbox"]

const VALID_FIELD_TYPES = [
    "text",
    "email",
    "password",
    "number",
    "tel",
    "url",
    "textarea",
    "select",
    "radio",
    "checkbox",
    "date",
    "time",
    "datetime-local",
]

const fieldSchema = yup.object().shape({
    label: yup
        .string()
        .required("Field label is required")
        .min(1, "Field label cannot be empty")
        .max(100, "Field label must be less than 100 characters"),

    id: yup
        .string(),

    type: yup
        .string()
        .required("Field type is required")
        .oneOf(VALID_FIELD_TYPES, `Field type must be one of: ${VALID_FIELD_TYPES.join(", ")}`),

    required: yup.boolean().default(false),

    options: yup
        .array()
        .of(yup.string().required("Option value cannot be empty").min(1, "Option value must have at least 1 character"))
        .when("type", {
            is: (type) => FIELD_TYPES_WITH_OPTIONS.includes(type),
            then: (schema) =>
                schema
                    .required("Options are required for select, radio, and checkbox fields")
                    .min(1, "At least one option is required for select, radio, and checkbox fields")
                    .test("unique-options", "All options must be unique", (options) => {
                        if (!options) return true
                        const uniqueOptions = new Set(options)
                        return uniqueOptions.size === options.length
                    }),
            otherwise: (schema) => schema.notRequired(),
        }),

    placeholder: yup
        .string()
        .max(200, "Placeholder must be less than 200 characters")
        .when("type", {
            is: (type) => !["select", "radio", "checkbox"].includes(type),
            then: (schema) => schema,
            otherwise: (schema) => schema.strip(),
        }),
})

export const formConfigSchema = yup.object().shape({
    title: yup
        .string()
        .required("Form title is required")
        .min(1, "Form title cannot be empty")
        .max(200, "Form title must be less than 200 characters"),

    description: yup.string().max(1000, "Form description must be less than 1000 characters"),

    fields: yup
        .array()
        .of(fieldSchema)
        .required("At least one field is required")
        .min(1, "Form must have at least one field")
        .max(50, "Form cannot have more than 50 fields")
        .test("unique-labels", "All field labels must be unique", (fields) => {
            if (!fields) return true
            const labels = fields.map((field) => field.label?.toLowerCase()).filter(Boolean)
            const uniqueLabels = new Set(labels)
            return uniqueLabels.size === labels.length
        }),

    is_active: yup.boolean().required("Active status is required"),
})

export { VALID_FIELD_TYPES, FIELD_TYPES_WITH_OPTIONS }
