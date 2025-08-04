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
          'rounded-full bg-sudo-blue-5   hover:bg-sudo-blue-4 hover:border-none transition-all',
        outlineBtn:
          'rounded-full bg-none text-sudo-neutral-9 border border-sudo-neutral-3 hover:border-sudo-neutral-2   hover:bg-sudo-white-1  transition-all',
        textBtn:
          'rounded-full bg-none text-sudo-neutral-9 border     ',
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
  icon_style?: string
}

const Button: React.FC<ButtonProps> = ({
  variant,
  className,
  label,
  icon,
  icon_style,
  reverse = false,
  ...props
}: ButtonProps) => {
  return (
    <button className={`group ${cn(buttonVariants({ variant, className }))}`} {...props}>
      <div
        className={cn(
          "text-sudo-regular-16",
          icon ? "gap-2 py-1 px-1" : "py-3",
          icon && (reverse ? "flex-row-reverse" : "flex-row")
        )}
      >
        <div className=' flex justify-center items-center'>
          <span data-hover={label} className={cn("whitespace-nowrap text-sudo-button-20  flip-animate-group-hover px-3")}>{label}</span>
          {icon && <span className={cn('border opacity-75 border-sudo-neutral-3 p-2 rounded-full -rotate-[30deg] group-hover:rotate-0 transition-all duration-500', icon_style)}><>{icon}</></span>}
        </div>
      </div>
    </button>
  );
};

export default Button;
