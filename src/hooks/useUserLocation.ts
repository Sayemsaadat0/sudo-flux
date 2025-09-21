import { useState, useCallback } from 'react';

/**
 * Location data interface for standardized location information
 */
export interface LocationData {
  city: string;
  country: string;
  countryCode: string;
  region: string;
  regionName: string;
  postal: string;
  timezone: string;
  ip: string;
}

/**
 * Billing details interface for form integration
 */
export interface BillingDetails {
  billing_city: string;
  billing_country: string;
  billing_state: string;
  billing_street: string;
  billing_zipcode: string;
}

/**
 * Hook return type
 */
export interface UseUserLocationReturn {
  locationData: LocationData | null;
  billingDetails: BillingDetails | null;
  loading: boolean;
  error: string | null;
  fetchLocation: () => Promise<void>;
  reset: () => void;
}

/**
 * Custom hook for fetching user's location using multiple IP geolocation services
 * 
 * Features:
 * - Multiple fallback services for reliability
 * - Automatic timeout handling (5 seconds per service)
 * - Clean error handling
 * - Loading states
 * - Reset functionality
 * 
 * @returns Object containing location data, loading state, and utility functions
 */
export const useUserLocation = (): UseUserLocationReturn => {
  // State management
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [billingDetails, setBillingDetails] = useState<BillingDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Maps raw location data to standardized format
   */
  const mapToLocationData = useCallback((data: any): LocationData => {
    return {
      city: data.city || data.loc?.split(",")[0] || "",
      country: data.country_name || data.country || "",
      countryCode: data.countryCode || data.country_code || "",
      region: data.region || data.loc?.split(",")[1]?.trim() || "",
      regionName: data.regionName || data.region || "",
      postal: data.postal || data.postalCode || data.postcode || data.zip || "",
      timezone: data.timezone || "",
      ip: data.ip || "",
    };
  }, []);

  /**
   * Maps location data to billing details format
   */
  const mapToBillingDetails = useCallback((data: LocationData): BillingDetails => {
    return {
      billing_city: data.city,
      billing_country: data.country,
      billing_state: data.regionName || data.region,
      billing_street: data.city || data.country,
      billing_zipcode: data.postal,
    };
  }, []);

  /**
   * Fetches location data from a specific service
   */
  const fetchFromService = useCallback(async (url: string, serviceName: string): Promise<any> => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        signal: AbortSignal.timeout(5000),
      });

      if (response.ok) {
        return await response.json();
      }
      throw new Error(`HTTP ${response.status}`);
    } catch (error) {
      console.log(`${serviceName} failed:`, error);
      return null;
    }
  }, []);

  /**
   * Main function to fetch user location with multiple fallback services
   */
  const fetchLocation = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      // Array of services to try in order of preference
      const services = [
        {
          url: "https://ipinfo.io/json",
          name: "ipinfo.io"
        },
        {
          url: "http://ip-api.com/json",
          name: "ip-api.com"
        },
        {
          url: "https://ipapi.com/ip_api.php?ip=",
          name: "ipapi.com"
        }
      ];

      let data = null;

      // Try each service until one succeeds
      for (const service of services) {
        data = await fetchFromService(service.url, service.name);
        if (data) {
          console.log(`Successfully fetched location from ${service.name}`);
          break;
        }
      }

      if (data) {
        // Process and store the location data
        const processedLocationData = mapToLocationData(data);
        const processedBillingDetails = mapToBillingDetails(processedLocationData);

        setLocationData(processedLocationData);
        setBillingDetails(processedBillingDetails);

        // Log the detected location for debugging (commented out for production)
        console.log("Detected location from IP:", {
          city: processedLocationData.city,
          country: processedLocationData.country,
          countryCode: processedLocationData.countryCode,
          region: processedLocationData.region,
          postal: processedLocationData.postal,
          timezone: processedLocationData.timezone,
          ip: processedLocationData.ip,
        });
      } else {
        // All services failed
        const errorMessage = "All IP geolocation services failed";
        setError(errorMessage);
        console.log(errorMessage + ", using manual input");

        // Set empty values
        setLocationData(null);
        setBillingDetails({
          billing_city: "",
          billing_country: "",
          billing_state: "",
          billing_street: "",
          billing_zipcode: "",
        });
      }
    } catch (error) {
      const errorMessage = "Could not fetch location data";
      console.error(errorMessage + ":", error);
      setError(errorMessage);
      
      // Set default values if IP tracking fails
      setLocationData(null);
      setBillingDetails({
        billing_city: "",
        billing_country: "",
        billing_state: "",
        billing_street: "",
        billing_zipcode: "",
      });
    } finally {
      setLoading(false);
    }
  }, [fetchFromService, mapToLocationData, mapToBillingDetails]);

  /**
   * Reset all state to initial values
   */
  const reset = useCallback((): void => {
    setLocationData(null);
    setBillingDetails(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    locationData,
    billingDetails,
    loading,
    error,
    fetchLocation,
    reset,
  };
};
