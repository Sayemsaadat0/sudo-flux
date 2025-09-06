import { useState, useEffect } from 'react';

/**
 * A reusable debounce hook that delays updating a value until after a specified delay
 * has passed since the last time the value was updated.
 * 
 * @param value - The value to debounce
 * @param delay - The delay in milliseconds (default: 500ms)
 * @returns The debounced value
 * 
 * @example
 * ```tsx
 * const [searchTerm, setSearchTerm] = useState('');
 * const debouncedSearchTerm = useDebounce(searchTerm, 300);
 * 
 * useEffect(() => {
 *   if (debouncedSearchTerm) {
 *     // Perform search API call
 *     searchAPI(debouncedSearchTerm);
 *   }
 * }, [debouncedSearchTerm]);
 * ```
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set up a timer to update the debounced value after the delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up the timer if the value changes before the delay completes
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * A more advanced debounce hook that provides additional utilities
 * 
 * @param value - The value to debounce
 * @param delay - The delay in milliseconds (default: 500ms)
 * @returns An object containing the debounced value and utility functions
 * 
 * @example
 * ```tsx
 * const [searchTerm, setSearchTerm] = useState('');
 * const { debouncedValue, isDebouncing, cancel } = useDebounceAdvanced(searchTerm, 300);
 * 
 * const handleCancel = () => {
 *   cancel();
 *   setSearchTerm('');
 * };
 * ```
 */
export function useDebounceAdvanced<T>(value: T, delay: number = 500) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const [isDebouncing, setIsDebouncing] = useState(false);

  useEffect(() => {
    // If the value is different from the debounced value, we're debouncing
    setIsDebouncing(value !== debouncedValue);

    const handler = setTimeout(() => {
      setDebouncedValue(value);
      setIsDebouncing(false);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay, debouncedValue]);

  const cancel = () => {
    setDebouncedValue(value);
    setIsDebouncing(false);
  };

  return {
    debouncedValue,
    isDebouncing,
    cancel,
  };
}

/**
 * A hook for debouncing multiple values at once
 * Useful when you have multiple search/filter inputs that should be debounced together
 * 
 * @param values - An object containing the values to debounce
 * @param delay - The delay in milliseconds (default: 500ms)
 * @returns The debounced values object
 * 
 * @example
 * ```tsx
 * const [filters, setFilters] = useState({
 *   search: '',
 *   category: '',
 *   status: ''
 * });
 * 
 * const debouncedFilters = useDebounceMultiple(filters, 300);
 * 
 * useEffect(() => {
 *   // All filters are debounced together
 *   fetchData(debouncedFilters);
 * }, [debouncedFilters]);
 * ```
 */
export function useDebounceMultiple<T extends Record<string, any>>(
  values: T,
  delay: number = 500
): T {
  const [debouncedValues, setDebouncedValues] = useState<T>(values);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValues(values);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [values, delay]);

  return debouncedValues;
}
