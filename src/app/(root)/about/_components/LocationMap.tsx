'use client'
import { useState } from "react";
import { RefreshCw, MapPin } from "lucide-react";

interface LocationMapProps {
    city: string;
    country: string;
    fallbackColor: string;
    priority?: boolean;
    onLoad?: () => void;
    onError?: () => void;
}

const LocationMap: React.FC<LocationMapProps> = ({
    city,
    country,
    fallbackColor,
    priority = false,
    onLoad,
    onError
}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const handleMapLoad = () => {
        setIsLoading(false);
        setHasError(false);
        onLoad?.();
    };

    const handleMapError = () => {
        setIsLoading(false);
        setHasError(true);
        onError?.();
    };

    const handleRetry = () => {
        setHasError(false);
        setIsLoading(true);
    };

    // Generate Google Maps embed URL
    const getMapUrl = () => {
        const query = encodeURIComponent(`${city}, ${country}`);
        return `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${query}&zoom=13&maptype=roadmap`;
    };

    return (
        <div className="relative w-full h-full">
            {/* Loading State */}
            {isLoading && (
                <div className="absolute inset-0 bg-sudo-neutral-5/30 flex items-center justify-center z-20">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sudo-purple-3 mx-auto mb-2"></div>
                        <p className="text-sudo-white-6 text-xs">Loading map...</p>
                    </div>
                </div>
            )}

            {/* Error State with Retry */}
            {hasError ? (
                <div className={`w-full h-full bg-gradient-to-br ${fallbackColor} flex items-center justify-center`}>
                    <div className="text-center">
                        <MapPin className="w-12 h-12 text-sudo-purple-3 mx-auto mb-2" />
                        <p className="text-sudo-white-1 font-semibold mb-1">{city}</p>
                        <p className="text-sudo-white-6 text-sm mb-3">{country}</p>
                        <button
                            onClick={handleRetry}
                            className="flex items-center gap-1 text-sudo-purple-3 hover:text-sudo-purple-2 transition-colors text-xs"
                        >
                            <RefreshCw className="w-3 h-3" />
                            Retry
                        </button>
                    </div>
                </div>
            ) : (
                <iframe
                    src={getMapUrl()}
                    className="w-full h-full border-0"
                    style={{ filter: 'grayscale(100%) invert(90%) hue-rotate(180deg)' }}
                    onLoad={handleMapLoad}
                    onError={handleMapError}
                    title={`Map of ${city}, ${country}`}
                    loading={priority ? "eager" : "lazy"}
                    allowFullScreen
                />
            )}
        </div>
    );
};

export default LocationMap;
