import React from 'react'
import { cn } from "@/lib/utils";
import { IconType, iconVariants } from "../icon";


const ArrowIcon: React.FC<IconType> = ({ size, className, ...props }) => {
    return (
        <svg {...props} className={cn(iconVariants({ size, className }))} width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.7071 8.20711C13.0976 7.81658 13.0976 7.18342 12.7071 6.79289L6.34315 0.428932C5.95262 0.0384079 5.31946 0.0384079 4.92893 0.428932C4.53841 0.819456 4.53841 1.45262 4.92893 1.84315L10.5858 7.5L4.92893 13.1569C4.53841 13.5474 4.53841 14.1805 4.92893 14.5711C5.31946 14.9616 5.95262 14.9616 6.34315 14.5711L12.7071 8.20711ZM3.88203e-09 8.5L12 8.5L12 6.5L-3.88203e-09 6.5L3.88203e-09 8.5Z" fill="currentColor" />
        </svg>
    )
}

export default ArrowIcon