/* 
title
description
price
thumbnail
status
*/

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

export const PriceAddEditFormValidation = () =>
  yup.object().shape({
    title: yup.string().max(255).required('This field is required'),
    price: yup.string().max(255).required('This field is required'),
    description: yup.string().max(1500).required('This field is required'),
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
    // .test(
    //     'fileSize',
    //     'Image must be less than or equal to 1MB.',
    //     (value: any) => {
    //         if (typeof value === 'string') {
    //             return true; // allow existing URLs
    //         }
    //         // Check if the file size is within the limit
    //         return value && value.size <= 1000000; // 1MB
    //     }
    // ),
  });
