import * as yup from 'yup';

export const CategoryAddEditFormValidation = yup.object().shape({
  name: yup.string().max(255).required('Category name is required'),
  status: yup.string().oneOf(['active', 'inactive'], 'Status must be either active or inactive').default('active'),
});
