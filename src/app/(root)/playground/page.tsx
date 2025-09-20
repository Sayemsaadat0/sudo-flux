'use client'
import { useUserLocation } from '@/hooks/useUserLocation';
import { useEffect } from 'react';

export default function MyComponent() {
  const { 
    locationData, 
    // billingDetails, 
    loading, 
    error, 
    fetchLocation, 
    // reset 
  } = useUserLocation();

  // Fetch location on component mount
  useEffect(() => {
    fetchLocation();
  }, [fetchLocation]);

  // Use the data in your component
  return (
    <div className='mt-20'>
      {loading && <p>Detecting your location...</p>}
      {error && <p>Error: {error}</p>}
      {locationData && (
        <p>You are in {locationData.city}, {locationData.country}</p>
      )}
    </div>
  );
}