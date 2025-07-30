import { cva, VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { IconType } from '../core/icons/icon'; // Assuming IconType is the type for the icon prop
import { cn } from '@/lib/utils'; // Utility for combining class names

// Button variants using class-variance-authority
export const buttonVariants = cva(
  'leading-none text-sudo-white-1 transition-all disabled:bg-slate-300 cursor-pointer',
  {
    variants: {
      variant: {
        primarybtn:
          'rounded-full bg-sudo-blue-5 py-2.5 px-3 md:px-[32px]  hover:bg-sudo-blue-4 hover:border-none transition-all',
        outlineBtn:
          'rounded-full bg-none text-sudo-neutral-9 border border-sudo-neutral-3 hover:border-sudo-neutral-2 py-2.5 px-3 md:px-[32px]   hover:bg-sudo-white-1  transition-all',
        textBtn:
          'rounded-full bg-none text-sudo-neutral-9 border py-2.5 px-3 md:px-[32px] md:py-3.5 ',
        paginationBtn:
          'rounded-full border bg-oc-primary-1-500 px-3 py-2 text-white rounded-full',
        ghostBtn: 'rounded-full border border-sudo-neutral-9 text-sudo-neutral-9 bg-oc-white-600 px-3 py-2',
      },
    },
    defaultVariants: {
      variant: 'primarybtn', // Changed to 'primarybtn' instead of 'roundedBtn'
    },
  }
);

// Define the Button props interface
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  label?: string;
  icon?: IconType;
  reverse?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant,
  className,
  label,
  icon,
  reverse = false,
  ...props
}: ButtonProps) => {
  return (
    <button className={`group ${cn(buttonVariants({ variant, className }))}`} {...props}>
      <div
        className={
          icon &&
          `text-sudo-button-20 flex justify-center items-center gap-2  ${reverse ? "flex-row-reverse gap-2" : "flex-row"
          }`
        }
      >
        <span data-hover={label} className="whitespace-nowrap text-sudo-button-20 flip-animate-group-hover  ">{label}</span>
        {icon && <span><>{icon}</></span>}
      </div>
    </button>
  );
};

export default Button;
