import * as Yup from 'yup';

export const TeamAddEditFormValidation = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  
  title: Yup.string()
    .required('Title is required')
    .min(2, 'Title must be at least 2 characters')
    .max(100, 'Title must be less than 100 characters'),
  
  linkedin: Yup.string()
    .url('Please enter a valid LinkedIn URL')
    .optional(),
  
  status: Yup.string()
    .oneOf(['current', 'former'], 'Status must be either current or former')
    .required('Status is required'),
  
  image: Yup.mixed()
    .optional()
    .test('fileSize', 'File size must be less than 5MB', (value) => {
      if (!value) return true; // Optional field
      if (typeof value === 'string') return true; // Existing image URL
      if (value instanceof File) {
        return value.size <= 5 * 1024 * 1024; // 5MB
      }
      return true;
    })
    .test('fileType', 'Only image files are allowed', (value) => {
      if (!value) return true; // Optional field
      if (typeof value === 'string') return true; // Existing image URL
      if (value instanceof File) {
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
        return allowedTypes.includes(value.type);
      }
      return true;
    }),
});
