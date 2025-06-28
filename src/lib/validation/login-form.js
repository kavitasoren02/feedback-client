import * as yup from 'yup';

const loginSchema = yup.object().shape({
    email: yup
        .string()
        .email('Invalid email format')
        .required('Email is required'),

    password: yup
        .string()
        .required('Password is required'),
});

export default loginSchema;


export const registerEmployeeSchema = yup.object().shape({
    full_name: yup
        .string()
        .required('Full name is required')
        .max(20, 'Full name must be 20 characters or less'),
    
    email: yup
        .string()
        .email("Invalid email")
        .required('Email is required')
        .max(50, 'Email must be 50 characters or less'),
    
    employee_id: yup
        .string()
        .required('Employee ID is required'),
    
    department: yup
        .string()
        .required('Department is required')
        .max(20, 'Department must be 20 characters or more'),

    role: yup
        .string()
        .required("Role is required."),

    manager_id: yup
        .string()
        .required("Manager is required."),
    
    password: yup
        .string()
        .required('Password is required')
})