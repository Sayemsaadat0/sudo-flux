import * as yup from 'yup';

const SUPPORTED_FORMATS = [
  'image/jpg',
  'image/jpeg',
  'image/gif',
  'image/png',
  'image/bmp',
  'image/tiff',
  'image/webp',
  'image/svg+xml',
  'image/x-icon',
];

export const BlogAddEditFormValidation = yup.object().shape({
  title: yup.string().max(255).required('Title is required'),
  content: yup.string().required('Content is required'),
  author: yup.string().optional(),
  tags: yup.string().optional(),
  published: yup.boolean().default(true),
  metaTitle: yup.string().optional(),
  metaDescription: yup.string().optional(),
  slug: yup.string().optional(),
  banner_image: yup
    .mixed()
    .test(
      'format',
      'Invalid image format. Supported formats: jpg, jpeg, gif, png, bmp, tiff, webp, svg, ico.',
      (value: any) => {
        // Allow null/undefined for optional image
        if (!value) return true;
        // Allow existing image URLs (for editing) - both full URLs and relative paths
        if (typeof value === 'string' && (value.includes('http') || value.startsWith('/'))) {
          return true;
        }
        return value && value.type && SUPPORTED_FORMATS.includes(value.type);
      },
    ),
});
