'use client'

import { useState } from 'react'
import { Github, Twitter, Linkedin, Instagram,  } from 'lucide-react'
import Button from '../ui/button'

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section
      className="
        min-h-screen
        py-12
        sm:py-16
        md:py-20
        lg:py-24
        bg-cover
        bg-center
        bg-no-repeat
        bg-fixed
        relative
        overflow-hidden
      "
      style={{
        // Corrected: Wrapped the URL in url('') to make it a valid CSS value
        backgroundImage: "url('https://images.unsplash.com/photo-1636955903101-d6b4b926018c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      {/* Overlay to darken background */}
      <div className="absolute inset-0 bg-sudo-neutral-6/40" />

      {/* Content wrapper */}
      <div className="relative z-10 h-full flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-start lg:items-center">
            {/* Left Side */}
            <div className="space-y-4 sm:space-y-6 text-sudo-white-1 order-2 lg:order-1">
              <div>
                <h1 className="text-sudo-title-28 lg:text-sudo-title-48  md:leading-[60px] font-heading font-black leading-tight">
                  We&apos;d Love to Hear From You
                </h1>
              </div>

              <div className="space-y-3 sm:space-y-4 max-w-md">
                <p className="text-sm sm:text-base lg:text-sudo-paragraph-20 text-sudo-white-4 leading-relaxed">
                  Ready to bring your vision to life? We create digital experiences that drive results.
                </p>

                <div className="space-y-2 text-sudo-neutral-1">
                  <p className="text-sm sm:text-base">
                    <span className="font-semibold">Email:</span> hello@agency.com
                  </p>
                  <p className="text-sm sm:text-base">
                    <span className="font-semibold">Phone:</span> +1 (555) 123-4567
                  </p>
                </div>

                <div className="pt-3 sm:pt-4">
                  <p className="text-sm sm:text-base lg:text-sudo-title-22 font-semibold mb-2 sm:mb-3 text-sudo-blue-1 tracking-wide">
                    FOLLOW US
                  </p>
                  <div className="flex gap-2 sm:gap-3">
                    {[Github, Twitter, Linkedin, Instagram].map((Icon, i) => (
                      <a
                        key={i}
                        href="#"
                        className="w-8 h-8 sm:w-10 sm:h-10 bg-sudo-white-1 bg-opacity-10 backdrop-blur-sm border-opacity-20 rounded-lg flex items-center justify-center hover:bg-sudo-blue-3 hover:border-opacity-40 transition-all duration-300"
                      >
                        <Icon className="w-3 h-3 sm:w-4 sm:h-4 text-sudo-neutral-6" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="order-1 lg:order-2">
              <div className="bg-gradient-to-bl from-sudo-blue-2 to-sudo-white-2 backdrop-blur-md rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-sudo-blue-2 to-sudo-purple-1 rounded-full -translate-y-4 sm:-translate-y-7 translate-x-4 sm:translate-x-7 opacity-60" />
                <div className="absolute bottom-0 left-0 w-20 h-20 sm:w-28 sm:h-28 bg-gradient-to-tr from-pink-400 to-blue-100 rounded-full translate-y-6 sm:translate-y-10 -translate-x-6 sm:-translate-x-10 opacity-60" />

                <div className="relative z-10">
                  <div className="mb-6 sm:mb-8">
                    <h2 className="text-lg sm:text-xl lg:text-sudo-title-28 font-semibold mb-2 tracking-tight">
                      START YOUR PROJECT
                    </h2>
                    <p className="text-sm sm:text-base text-sudo-neutral-4">
                      {`Tell us about your ideas and we'll get back to you within 24 hours.`}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                    <div>
                      <label className="block text-xs font-bold text-sudo-neutral-6 mb-2 tracking-wide uppercase">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full h-10 sm:h-12 bg-sudo-white-1 bg-opacity-80 border-2 border-sudo-neutral-1 rounded-lg sm:rounded-xl px-3 sm:px-4 text-sm sm:text-base text-sudo-neutral-6 focus:border-sudo-blue-6 focus:bg-sudo-white-1 focus:outline-none transition-all duration-300"
                        placeholder="John Doe"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-sudo-neutral-6 mb-2 tracking-wide uppercase">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full h-10 sm:h-12 bg-sudo-white-1 bg-opacity-80 border-2 border-sudo-neutral-1 rounded-lg sm:rounded-xl px-3 sm:px-4 text-sm sm:text-base text-sudo-neutral-6 focus:border-sudo-blue-6 focus:bg-sudo-white-1 focus:outline-none transition-all duration-300"
                        placeholder="john@example.com"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-sudo-neutral-6 mb-2 tracking-wide uppercase">
                        Project Details
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={3}
                        className="w-full bg-sudo-white-1 bg-opacity-80 border-2 border-sudo-neutral-1 rounded-lg sm:rounded-xl p-3 sm:p-4 text-sm sm:text-base text-sudo-neutral-6 focus:border-sudo-blue-6 focus:bg-sudo-white-1 resize-none focus:outline-none transition-all duration-300"
                        placeholder="Tell us about your vision and goals..."
                        required
                      />
                    </div>

                    <div className="pt-2 w-full">
                      <Button 
                        type='submit' 
                        icon_style="border border-sudo-white-1 text-sudo-neutral-5 bg-sudo-white-2 opacity-100" 
                        className="text-sudo-white-2 !rounded-lg w-full text-sm sm:text-base" 
                        label="Send Now"
                        size="md"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}