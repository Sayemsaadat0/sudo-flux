import { getBaseUrl } from './getBaseUrl';

/**
 * Convert relative image URL to full URL
 * @param imagePath - Relative image path (e.g., "/uploads/blogs/image.jpg")
 * @returns Full URL or undefined if no image path
 */
export const getImageUrl = (imagePath?: string | null): string | undefined => {
  if (!imagePath) return undefined;

  // If it's already a full URL, return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  // If it's a relative path, prepend the base URL
  return `${getBaseUrl()}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
};

/**
 * Convert an array of objects with image URLs to full URLs
 * @param items - Array of objects that may contain image URLs
 * @param imageField - The field name that contains the image URL (default: 'banner_image')
 * @returns Array with converted image URLs
 */
export const convertImageUrls = <T extends Record<string, any>>(
  items: T[],
  imageField: string = 'banner_image'
): T[] => {
  return items.map(item => ({
    ...item,
    [imageField]: getImageUrl(item[imageField])
  }));
};

/**
 * Convert a single object with image URL to full URL
 * @param item - Object that may contain image URL
 * @param imageField - The field name that contains the image URL (default: 'banner_image')
 * @returns Object with converted image URL
 */
export const convertImageUrl = <T extends Record<string, any>>(
  item: T,
  imageField: string = 'banner_image'
): T => {
  return {
    ...item,
    [imageField]: getImageUrl(item[imageField])
  };
};

