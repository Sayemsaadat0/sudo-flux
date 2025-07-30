'use client';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import React, { useState } from 'react';
// import MenuIcon from '../icons/publicIcon/MenuIcon';
import { usePathname } from 'next/navigation';
// import { defaultNavMenuData } from '@/data/defaultNavMenuData';
import Link from 'next/link';
import { ArrowRight, MenuIcon } from 'lucide-react';
import { defaultNavMenuData } from '@/dummy-data/dummy-data';
import Logo from '../logo/Logo';
import Button from '@/components/ui/button';
// import Logo from '../logo/Logo';
// import Button from '@/components/ui/button';

// Hamburger menu
const DefaultHamburgerMenu: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <aside>
            <Sheet open={open} onOpenChange={() => setOpen(!open)}>
                <SheetTrigger>
                    <MenuIcon size={'32'} />
                </SheetTrigger>
                <SheetContent className='bg-sudo-white-1'>
                    <SheetTitle></SheetTitle>
                    <DefaultNavMenuList />
                </SheetContent>
            </Sheet>
        </aside>
    );
};

// Menu List
export const DefaultNavMenuList: React.FC = () => {
    const pathname = usePathname();

    return (
        <div className="flex flex-col pl-7 py-16 lg:gap-3 lg:pl-0 lg:py-0 lg:flex-row lg:items-center whitespace-nowrap">
            {defaultNavMenuData.map((i) => (
                <div key={Math.random()}>
                    <Link
                        className={` text-sudo-paragraph-20 px-4 py-1 rounded-full  p- ${pathname === i.url ? 'bg-sudo-blue-2' : ''
                            }`}
                        href={i.url}
                    >
                        <span data-hover={i.title} className='flip-animate'>
                            {i.title}
                        </span>
                    </Link>
                </div>
            ))}
        </div>
    );
};

// Default Navbar
const DefaultNavbar: React.FC = () => {
    return (
        <div className="w-full bg-sudo-white-2 fixed top-0 left-0 z-30">
            <nav className="flex relative py-3 justify-between sudo-container items-center ">
                <div>
                    <Link href={'/'}>
                        <Logo />
                    </Link>
                </div>
                <div className="hidden  p-2   rounded-full lg:block absolute right-1/2  transform translate-x-1/2">
                    <div className="flex  justify-center">
                        <DefaultNavMenuList />
                    </div>
                </div>
                <div className="flex items-center gap-2 md:gap-[10px] cursor-pointer xl:gap-1 justify-end">
                    <div>
                        <Link href={'/quote'}>
                            <Button variant={'outlineBtn'} label={'Get a Quote'} />
                        </Link>
                    </div>
                    <div className=' bg-sudo-blue-5  text-sudo-white-1 rounded-full flex'>
                        <Link className=' p-2.5' href={'/#'}>
                            <ArrowRight className='-rotate-45 transition-all hover:rotate-0 duration-300' size={'20'} />
                        </Link>
                    </div>
                    <div className="block lg:hidden pl-2">
                        <DefaultHamburgerMenu />
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default DefaultNavbar;
