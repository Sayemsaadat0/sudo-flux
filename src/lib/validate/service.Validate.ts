import * as yup from 'yup';

export const ServiceAddEditFormValidation = yup.object().shape({
  title: yup.string().max(255).required('Service title is required'),
  subTitle: yup.string().max(255).required('Service subtitle is required'),
  statsString: yup.string().max(255).required('Stats string is required'),
  description: yup.string().required('Service description is required'),
  benefits: yup.array().of(yup.string().required('Benefit cannot be empty')).min(1, 'At least one benefit is required'),
  category: yup.string().required('Category is required'),
});