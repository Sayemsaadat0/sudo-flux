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

export const ServiceAddEditFormValidation = () =>
  yup.object().shape({
    service_title: yup.string().max(255).required('This field is required'),
    short_description: yup.string().max(1500).required('This field is required'),
    description: yup.string().required('This field is required'),
    price: yup.string().required('This field is required'),
    thumbnail: yup
      .mixed()
      .required('This field is required')
      .test(
        'format',
        'Invalid image format. Supported formats: jpg, jpeg, gif, png, bmp, tiff, webp, svg, ico.',
        (value: any) => {
          // Allow existing image URLs (for editing)
          if (typeof value === 'string' && value.includes('http')) {
            return true;
          }
          return value && value.type && SUPPORTED_FORMATS.includes(value.type);
        },
      ),
    // .test('format', 'Image Must be within 1 Mb.', (value: any) =>
    //     !value?.name && value?.includes('http') ? true : !value || value?.size <= 1000000,
    // ),
  });
