import { cn } from "@/lib/utils";
import { IconType, iconVariants } from "../icon";


const CheckIcon: React.FC<IconType> = ({ size, className, ...props }) => {
    return (
        <svg {...props} className={cn(iconVariants({ size, className }))} xmlns="http://www.w3.org/2000/svg" width="17" height="12" viewBox="0 0 17 12" fill="none">
            <path d="M-9.7505e-05 5.2667L1.63324 3.63336L6.13307 8.00016L14.5 -3.22579e-05L16.1333 1.6333L6.13307 11.2668L-9.7505e-05 5.2667Z" fill="#5A4EAE" />
        </svg>
    );
};

export default CheckIcon;
