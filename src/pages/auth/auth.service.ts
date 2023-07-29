import * as Yup from 'yup';

export const signUpInitialValues = {
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
};

export const signInInitialValues = {
    email: '',
    password: ''
};

export const signUpValidationSchema = Yup.object({
    name: Yup.string().required('Name is required.'),
    email: Yup.string().email().required('First name is required.'),
    password: Yup.string().min(8).required('Password is required.'),
    passwordConfirm: Yup.string()
        .oneOf([Yup.ref('password'), ''], 'Passwords must match.')
        .required('Password confirmation is required.'),
});

export const signInValidationSchema = Yup.object({
    email: Yup.string().email().required('Name is required.'),
    password: Yup.string().required('Password is required.'),
});