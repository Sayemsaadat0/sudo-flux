import { cva, VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { IconType } from '../core/icons/icon'; // Assuming IconType is the type for the icon prop
import { cn } from '@/lib/utils';

export const buttonVariants = cva(
  'leading-none text-sudo-white-1 transition-all disabled:bg-slate-300 cursor-pointer',
  {
    variants: {
      variant: {
        primarybtn:
          'rounded-full bg-sudo-blue-5 hover:bg-sudo-blue-4 hover:border-none transition-all',
        outlineBtn:
          'rounded-full bg-none text-sudo-neutral-9 border border-sudo-neutral-3 hover:border-sudo-neutral-2 hover:bg-sudo-white-1 transition-all',
        textBtn:
          'rounded-full bg-none text-sudo-neutral-9 border',
        paginationBtn:
          'rounded-full border bg-oc-primary-1-500 px-3 py-2 text-white rounded-full',
        ghostBtn: 'rounded-full border border-sudo-neutral-9 text-sudo-neutral-9 bg-oc-white-600 px-3 py-2',
      },
    },
    defaultVariants: {
      variant: 'primarybtn',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  label?: string;
  icon?: IconType;
  reverse?: boolean;
  icon_style?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Button: React.FC<ButtonProps> = ({
  variant,
  className,
  label,
  icon,
  icon_style,
  reverse = false,
  size = 'md',
  ...props
}: ButtonProps) => {
  // Responsive size classes
  const sizeClasses = {
    sm: {
      container: 'gap-1.5 sm:gap-2 py-1 sm:py-1.5 px-2 sm:px-3',
      text: 'text-xs sm:text-sm whitespace-nowrap flip-animate-group-hover px-1.5 sm:px-2',
      icon: 'p-1 sm:p-1.5'
    },
    md: {
      container: 'gap-2 py-1.5 sm:py-2 px-2.5 sm:px-3',
      text: 'text-sm sm:text-base whitespace-nowrap flip-animate-group-hover px-2 sm:px-3',
      icon: 'p-1.5 sm:p-2'
    },
    lg: {
      container: 'gap-2.5 sm:gap-3 py-2 sm:py-2.5 px-3 sm:px-4',
      text: 'text-base sm:text-lg whitespace-nowrap flip-animate-group-hover px-2.5 sm:px-3',
      icon: 'p-2 sm:p-2.5'
    }
  };

  const currentSize = sizeClasses[size];

  return (
    <button className={`group ${cn(buttonVariants({ variant, className }))}`} {...props}>
      <div
        className={cn(
          "text-sudo-regular-16",
          icon ? currentSize.container : "py-2 sm:py-3",
          icon && (reverse ? "flex-row-reverse" : "flex-row")
        )}
      >
        <div className='flex justify-center items-center'>
          <span 
            data-hover={label} 
            className={cn(
              "flip-animate-group-hover",
              currentSize.text
            )}
          >
            {label}
          </span>
          {icon && (
            <span 
              className={cn(
                ' border hidden md:block opacity-75 border-sudo-neutral-3 rounded-full -rotate-[30deg] group-hover:rotate-0 transition-all duration-500',
                currentSize.icon,
                icon_style
              )}
            >
              <>{icon}</>
            </span>
          )}
        </div>
      </div>
    </button>
  );
};

export default Button;
