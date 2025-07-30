import { cn } from "@/lib/utils";
import { IconType, iconVariants } from "../icon";


const PlayIcon: React.FC<IconType> = ({ size, className, ...props }) => {
    return (
        <svg {...props} className={cn(iconVariants({ size, className }))} xmlns="http://www.w3.org/2000/svg" width="15" height="17" viewBox="0 0 15 17" fill="none">
            <path d="M13.452 6.42447C15.0819 7.36553 15.0819 9.71819 13.4519 10.6593L4.28336 15.9527C2.65338 16.8938 0.615924 15.7175 0.615924 13.8353L0.615925 3.24836C0.615925 1.36624 2.65339 0.18991 4.28336 1.13097L13.452 6.42447Z" fill="#5A4EAE" />
        </svg>
    );
};

export default PlayIcon;
