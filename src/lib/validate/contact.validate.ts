import * as yup from 'yup';

export const ContactFormValidation = () =>
  yup.object().shape({
    name: yup.string().max(255).required('This field is required'),
    email: yup.string().max(1500).required('This field is required'),
    // site: yup.string().required('This field is required'),
    message: yup.string().required('This field is required'),
  });
