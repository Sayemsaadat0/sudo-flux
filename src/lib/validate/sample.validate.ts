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

export const SampleAddEditFormValidation = () =>
  yup.object().shape({
    title: yup.string().max(255).required('This field is required'),
    description: yup.string().max(1500).required('This field is required'),
    image1: yup
      .mixed()
      .required('This field is required')
      .test(
        'format',
        'Invalid image format. Supported formats: jpg, jpeg, gif, png, bmp, tiff, webp, svg, ico.',
        (value: any) => {
          if (typeof value === 'string' && value.includes('http')) {
            return true;
          }
          return value && value.type && SUPPORTED_FORMATS.includes(value.type);
        },
      ),
    image2: yup
      .mixed()
      .required('This field is required')
      .test(
        'format',
        'Invalid image format. Supported formats: jpg, jpeg, gif, png, bmp, tiff, webp, svg, ico.',
        (value: any) => {
          if (typeof value === 'string' && value.includes('http')) {
            return true;
          }
          return value && value.type && SUPPORTED_FORMATS.includes(value.type);
        },
      ),
  });
