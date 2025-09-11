import * as yup from 'yup';

export const CareerAddEditFormValidation = yup.object().shape({
  title: yup.string().max(255).required('Job title is required'),
  department: yup.string().optional(),
  location: yup.string().optional(),
  type: yup.string().oneOf(['full_time', 'part_time', 'contract', 'internship']).default('full_time'),
  description: yup.string().required('Job description is required'),
  responsibilities: yup.array().of(yup.string()).optional(),
  requirements: yup.array().of(yup.string()).optional(),
  status: yup.string().oneOf(['open', 'closed']).default('open'),
});
