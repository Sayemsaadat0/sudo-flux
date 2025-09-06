import * as Yup from 'yup';

export const ContactAddEditFormValidation = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email address')
    .max(100, 'Email must be less than 100 characters'),
  phone: Yup.string()
    .max(20, 'Phone number must be less than 20 characters')
    .matches(/^[\+]?[1-9][\d]{0,15}$/, 'Invalid phone number format'),
  subject: Yup.string()
    .max(200, 'Subject must be less than 200 characters'),
  message: Yup.string()
    .required('Message is required')
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters'),
  status: Yup.string()
    .oneOf(['new', 'in_progress', 'resolved'], 'Invalid status')
    .required('Status is required')
});