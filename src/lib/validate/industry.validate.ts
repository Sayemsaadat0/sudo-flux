import * as Yup from 'yup';

export const IndustryAddEditFormValidation = Yup.object({
  name: Yup.string()
    .required('Industry name is required')
    .min(2, 'Industry name must be at least 2 characters')
    .max(100, 'Industry name must be less than 100 characters'),
  description: Yup.string()
    .max(500, 'Description must be less than 500 characters'),
  icon: Yup.mixed()
    .nullable()
    .test('fileSize', 'File size must be less than 5MB', (value) => {
      if (!value) return true; // Allow empty/null values
      if (value instanceof File) {
        return value.size <= 5 * 1024 * 1024; // 5MB
      }
      return true;
    })
    .test('fileType', 'Only image files are allowed', (value) => {
      if (!value) return true; // Allow empty/null values
      if (value instanceof File) {
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
        return allowedTypes.includes(value.type);
      }
      return true;
    })
});
