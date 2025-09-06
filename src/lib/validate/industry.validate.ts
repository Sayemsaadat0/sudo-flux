import * as Yup from 'yup';

export const IndustryAddEditFormValidation = Yup.object({
  title: Yup.string()
    .required('Title is required')
    .min(2, 'Title must be at least 2 characters')
    .max(100, 'Title must be less than 100 characters'),
  description: Yup.string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must be less than 500 characters'),
  publish: Yup.boolean()
    .required('Publish status is required'),
});
