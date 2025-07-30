import React from 'react'
import { cn } from "@/lib/utils";
import { IconType, iconVariants } from "../icon";


const Deleteicon: React.FC<IconType> = ({ size, className, ...props }) => {
    return (
        <svg {...props} className={cn(iconVariants({ size, className }))} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M5 19C4.45 19 3.979 18.804 3.587 18.412C3.195 18.02 2.99933 17.5493 3 17V4H2V2H7V1H13V2H18V4H17V17C17 17.55 16.804 18.021 16.412 18.413C16.02 18.805 15.5493 19.0007 15 19H5ZM15 4H5V17H15V4ZM7 15H9V6H7V15ZM11 15H13V6H11V15Z" fill="currentColor" />
        </svg>

    )
}

export default Deleteicon