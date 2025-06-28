import * as yup from 'yup';

export function generateFormSchema(fieldsFromAPI = [], extraFields = []) {
    const initialValues = {
        employee_id: '',
        form_id: '',
        form_data: {},
    };

    const formDataValidationShape = {};
    const extraFieldValidationShape = {};

    const getDefaultValue = (type) => {
        if (type === 'datetime-local') return new Date().toISOString().slice(0, 16);
        if (type === 'checkbox') return [];
        return '';
    };

    const getValidator = (field) => {
        if (field.type === 'checkbox') {
            let schema = yup.array().of(yup.string());
            return field.required
                ? schema.min(1, `${field.label} is required`)
                : schema;
        } else {
            let schema = yup.string();
            return field.required
                ? schema.required(`${field.label} is required`)
                : schema;
        }
    };

    fieldsFromAPI.forEach((field) => {
        const key = field.name;
        initialValues.form_data[key] = getDefaultValue(field.type);
        formDataValidationShape[key] = getValidator(field);
    });

    extraFields.forEach((field) => {
        const key = field.name;
        initialValues[key] = getDefaultValue(field.type);
        extraFieldValidationShape[key] = getValidator(field);
    });

    const validationSchema = yup.object().shape({
        employee_id: yup.string().required('Employee ID is required'),
        form_id: yup.string().required('Form ID is required'),
        ...extraFieldValidationShape,
        form_data: yup.object().shape(formDataValidationShape),
    });

    return {
        initialValues,
        validationSchema,
    };
}
