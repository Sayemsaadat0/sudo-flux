import * as yup from 'yup';

export const OrderAddEditFormValidation = () =>
  yup.object().shape({
    name: yup.string().max(255).required('This field is required'),
    email: yup.string().max(255).required('This field is required'),
    // url: yup.string().max(255).required('This field is required'),
    type: yup.string().max(255).required('This field is required'),
    // appointment: yup.string().max(255).required('This field is required'),
    service: yup.string().max(255).required('This field is required'),
    // message: yup.string().max(1500).required('This field is required'),
  });
