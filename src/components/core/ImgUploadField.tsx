
'use client';

import React, { useState, useEffect } from 'react';
import { getImgToB64 } from '@/lib/getImgToB64';
import Image from 'next/image';
import ChangeIcon from './icons/dashboard/ChangeIcon';
import ImgUploadIcon from './icons/dashboard/ImgUploadIcon';

interface ImgUploadFieldProps {
  setValue?: (value: File | null) => void;
  error?: any;
  value?: string | File | null; // Accepts Base64 string, File, or null
}

const ImgUploadField: React.FC<ImgUploadFieldProps> = ({ setValue, error, value }) => {
  const [prevImg, setPrevImg] = useState<string | null>(null);

  useEffect(() => {
    if (typeof value === 'string') {
      setPrevImg(value);
    } else if (value instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => setPrevImg(reader.result as string);
      reader.readAsDataURL(value);
    } else {
      setPrevImg(null);
    }
  }, [value]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.files && e.target.files[0]) {
        const selectedFile = e.target.files[0];
        setValue?.(selectedFile); // Update parent state
        const imgBase64 = await getImgToB64(selectedFile); // Convert File to Base64
        setPrevImg(imgBase64 || null); // Update preview
      }
    } catch (error) {
      console.error('Error handling file upload:', error);
      setPrevImg(null); // Reset preview on error
    }
  };

  return (
    <div
      className={`border-2 border-dashed border-s-gray-light  rounded-[15px] min-w-[250px] min-h-[250px] max-w-[300px]`}
    >
      <label className="relative cursor-pointer" htmlFor="dropzone-file">
        <div className="flex items-center justify-center max-w-[500px] object-cover mx-auto">
          {prevImg ? (
            <div className="p-4 mx-auto relative rounded-[15px] min-w-72 max-h-[200px]">
              <Image
                className="object-cover shrink-0 w-full rounded-[15px] max-h-[200px]"
                src={prevImg}
                width={500}
                height={300}
                alt="Uploaded preview"
              />
              <span className="text-black cursor-pointer transition-all absolute z-20 rounded-[8px] bg-white p-2 top-8 right-8 flex items-center gap-2">
                <ChangeIcon />
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-4 rounded-[10px] py-10">
              <ImgUploadIcon size="80" />
              <p className="mb-2 text-center p-1 rounded-[5px]">Click to upload</p>
              <p className="text-xs text-center">SVG, PNG, JPG, Webp, or GIF</p>
            </div>
          )}
        </div>
        <input
          onChange={handleFileChange}
          name="file"
          id="dropzone-file"
          type="file"
          accept="image/*"
          className="hidden"
        />
      </label>
      {error && <p className="text-red-400 mt-6 text-center">{error}</p>}
    </div>
  );
};

export default ImgUploadField;
