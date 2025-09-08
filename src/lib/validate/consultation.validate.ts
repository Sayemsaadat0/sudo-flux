import * as yup from 'yup';

export const ConsultationAddEditFormValidation = yup.object().shape({
  name: yup.string().max(255).required('Name is required'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  phone: yup.string().required('Phone number is required'),
  company: yup.string().optional(),
  projectType: yup.string().required('Project type is required'),
  budget: yup.string().required('Budget range is required'),
  timeline: yup.string().required('Timeline is required'),
  description: yup.string().required('Project description is required'),
  status: yup.string().oneOf(['new', 'in-progress', 'completed', 'cancelled'], 'Invalid status').default('new'),
});
