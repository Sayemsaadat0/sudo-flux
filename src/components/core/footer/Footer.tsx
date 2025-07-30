

import Button from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import Logo from '../logo/Logo'

export default function Footer() {
    return (
        <footer
            className='relative bg-sudo-white-1  text-sudo-neutral-6 md:h-[600px]'
            style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
        >
            <div className='sudo-container p relative md:h-[calc(100vh+600px)] md:-top-[100vh]'>
                <div className='md:h-[600px]  md:sticky md:top-[calc(100vh-600px)]'>
                    <div className='py-16 flex shrink-0 gap-20'>
                        <div className="grid w-full grid-cols-1  py-8 lg:grid-cols-2 gap-12 lg:gap-16">
                            {/* Left Section - Logo and Subscribe */}
                            <div className="space-y-8 ">
                                {/* Logo */}
                                <Logo />

                                {/* Subscribe Section */}
                                <div className="space-y-4 ">
                                    <h3 className="text-xl font-semibold text-sudo-neutral-6">Subscribe</h3>
                                    <p className="text-sudo-neutral-4 max-w-sm">Join our newsletter for the latest updates, news, and more!</p>

                                    {/* Email Input and Button */}
                                    <div className="flex flex-col sm:flex-row gap-3 max-w-md">
                                        <div className='flex-1 '>
                                            <input
                                                type="email"
                                                placeholder="Enter Email"
                                                className="flex-1 px-4 w-full py-3 bg-sudo-white-3 border border-sudo-white-4  rounded-full focus:outline-none focus:ring-0focus:border-transparent"
                                            />
                                        </div>
                                        <Button className='text-sudo-white-1' label='Subscribe' />
                                    </div>
                                </div>
                            </div>

                            {/* Right Section - Links */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4  gap-8 lg:gap-12">
                                {/* Company Column */}
                                <div className="space-y-4">
                                    <h4 className="text-lg font-semibold text-sudo-neutral-6">Company</h4>
                                    <nav className="flex flex-col space-y-3">
                                        <Link href="/" className="text-sudo-neutral-4 hover:text-sudo-neutral-6 transition-colors duration-200">
                                            Home
                                        </Link>
                                        <Link href="/about" className="text-sudo-neutral-4 hover:text-sudo-neutral-6 transition-colors duration-200">
                                            About Us
                                        </Link>
                                        <Link href="/pricing" className="text-sudo-neutral-4 hover:text-sudo-neutral-6 transition-colors duration-200">
                                            Pricing
                                        </Link>
                                        <Link href="/work" className="text-sudo-neutral-4 hover:text-sudo-neutral-6 transition-colors duration-200">
                                            Work
                                        </Link>
                                        <Link href="/blog" className="text-sudo-neutral-4 hover:text-sudo-neutral-6 transition-colors duration-200">
                                            Blog
                                        </Link>
                                        <Link href="/faq" className="text-sudo-neutral-4 hover:text-sudo-neutral-6 transition-colors duration-200">
                                            FAQ
                                        </Link>
                                        <Link href="/contact" className="text-sudo-neutral-4 hover:text-sudo-neutral-6 transition-colors duration-200">
                                            Contact
                                        </Link>
                                    </nav>
                                </div>

                                {/* Socials Column */}
                                <div className="space-y-4">
                                    <h4 className="text-lg font-semibold text-sudo-neutral-6">Socials</h4>
                                    <nav className="flex flex-col space-y-3">
                                        <Link
                                            href="https://instagram.com"
                                            className="text-sudo-neutral-4 hover:text-sudo-neutral-6 transition-colors duration-200"
                                        >
                                            Instagram
                                        </Link>
                                        <Link
                                            href="https://twitter.com"
                                            className="text-sudo-neutral-4 hover:text-sudo-neutral-6 transition-colors duration-200"
                                        >
                                            Twitter
                                        </Link>
                                        <Link
                                            href="https://behance.net"
                                            className="text-sudo-neutral-4 hover:text-sudo-neutral-6 transition-colors duration-200"
                                        >
                                            Behance
                                        </Link>
                                    </nav>
                                </div>

                                {/* Template Column */}
                                <div className="space-y-4">
                                    <h4 className="text-lg font-semibold text-sudo-neutral-6">Template</h4>
                                    <nav className="flex flex-col space-y-3">
                                        <Link href="/style-guide" className="text-sudo-neutral-4 hover:text-sudo-neutral-6 transition-colors duration-200">
                                            Style Guide
                                        </Link>
                                        <Link href="/licenses" className="text-sudo-neutral-4 hover:text-sudo-neutral-6 transition-colors duration-200">
                                            Licenses
                                        </Link>
                                        <Link href="/changelog" className="text-sudo-neutral-4 hover:text-sudo-neutral-6 transition-colors duration-200">
                                            Changelog
                                        </Link>
                                        <Link href="/404" className="text-sudo-neutral-4 hover:text-sudo-neutral-6 transition-colors duration-200">
                                            404
                                        </Link>
                                        <Link href="/password" className="text-sudo-neutral-4 hover:text-sudo-neutral-6 transition-colors duration-200">
                                            Password
                                        </Link>
                                    </nav>
                                </div>
                                {/* Template Column */}
                                <div className="space-y-4">
                                    <h4 className="text-lg font-semibold text-sudo-neutral-6">Template</h4>
                                    <nav className="flex flex-col space-y-3">
                                        <Link href="/style-guide" className="text-sudo-neutral-4 hover:text-sudo-neutral-6 transition-colors duration-200">
                                            Style Guide
                                        </Link>
                                        <Link href="/licenses" className="text-sudo-neutral-4 hover:text-sudo-neutral-6 transition-colors duration-200">
                                            Licenses
                                        </Link>
                                        <Link href="/changelog" className="text-sudo-neutral-4 hover:text-sudo-neutral-6 transition-colors duration-200">
                                            Changelog
                                        </Link>
                                        <Link href="/404" className="text-sudo-neutral-4 hover:text-sudo-neutral-6 transition-colors duration-200">
                                            404
                                        </Link>
                                        <Link href="/password" className="text-sudo-neutral-4 hover:text-sudo-neutral-6 transition-colors duration-200">
                                            Password
                                        </Link>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}