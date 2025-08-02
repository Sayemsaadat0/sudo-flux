

import Button from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import Logo from '../logo/Logo'
import { footerLinks } from '@/dummy-data/dummy-data'

export default function Footer() {
    return (
        <footer
            className='relative bg-sudo-white-1  text-sudo-neutral-6 md:h-[600px]'
            style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
        >
            <div className='sudo-container p relative md:h-[calc(100vh+600px)] md:-top-[100vh]'>
                <div className='md:h-[600px]  md:sticky md:top-[calc(100vh-600px)]'>
                    <div className='py-16 flex shrink-0 gap-20'>
                        {/* grid w-full grid-cols-1  py-8 lg:grid-cols-2 gap-12 lg:gap-16 */}
                        <div className="flex flex-col md:flex-row  w-full py-8 justify-between gap-12 lg:gap-16 ">
                            {/* Left Section - Logo and Subscribe */}
                            <div className="space-y-8  md:w-fit">
                                {/* Logo */}
                                <Logo />

                                {/* Subscribe Section */}
                                <div className="space-y-4 ">
                                    <h3 className="text-xl font-semibold text-sudo-neutral-6">Subscribe</h3>
                                    <p className="text-sudo-neutral-4 max-w-sm">Join our newsletter for the latest updates, news, and more!</p>

                                    {/* Email Input and Button */}
                                    <div className="flex flex-col  gap-3 max-w-md">
                                        <div className='flex-1 '>
                                            <input
                                                type="email"
                                                placeholder="Enter Email"
                                                className="flex-1 px-4 w-full py-2 bg-sudo-white-3 border border-sudo-white-4  rounded-full focus:outline-none focus:ring-0focus:border-transparent"
                                            />
                                        </div>
                                        <Button className='text-sudo-white-1' label='Subscribe' />
                                    </div>
                                </div>
                            </div>

                            {/* Right Section - Links */}
                            <div className="grid grid-cols-1  w-full sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-12">
                                {footerLinks.map((section, i) => (
                                    <div className="space-y-4" key={i}>
                                        <h4 className="text-lg font-semibold text-sudo-neutral-6">{section.title}</h4>
                                        <nav className="flex flex-col space-y-3">
                                            {section.links.map((link, j) => (
                                                <Link
                                                    data-hover={link.label}
                                                    key={j}
                                                    href={link.href}
                                                    className="text-sudo-neutral-4 text-left !px-0  flip-animate hover:text-sudo-neutral-6 transition-colors duration-200"
                                                >
                                                    {link.label}
                                                </Link>
                                            ))}
                                        </nav>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                    <div className=" border-t border-sudo-white-4 py-6 text-center text-sudo-neutral-4 text-sm">
                        <p>
                            &copy; {new Date().getFullYear()} YourCompanyName. All rights reserved.
                        </p>
                        <div className="hidden sm:flex flex-col md:flex-row justify-center gap-4 mt-2 text-xs sm:text-sm">
                            <Link href="/privacy-policy" className="hover:text-sudo-neutral-6 transition-colors duration-200">
                                Privacy Policy
                            </Link>
                            <span className='hidden md:block'>|</span>
                            <Link href="/terms-of-service" className="hover:text-sudo-neutral-6 transition-colors duration-200">
                                Terms of Service
                            </Link>
                            <span className='hidden md:block'>|</span>
                            <Link href="/cookies" className="hover:text-sudo-neutral-6 transition-colors duration-200">
                                Cookie Policy
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </footer>
    )
}