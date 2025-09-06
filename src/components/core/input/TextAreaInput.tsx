import React from 'react';
// Updated to include onBlur prop

interface TextAreaInputProps {
  id?: string;
  name?: string;
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  className?: string;
  error?: string | boolean;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
}

const TextAreaInput: React.FC<TextAreaInputProps> = ({
  id,
  name,
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  className = '',
  error,
  required = false,
  disabled = false,
  rows = 4,
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={id || name} className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        id={id || name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        rows={rows}
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-vertical ${
          error
            ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:border-blue-500'
        } ${className}`}
      />
      {error && typeof error === 'string' && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default TextAreaInput;