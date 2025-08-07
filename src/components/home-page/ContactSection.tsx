// 'use client'

// import { useState } from 'react'
// import { Github, Twitter, Linkedin, Instagram } from 'lucide-react'

// export default function ContactSection() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     message: ''
//   })

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     console.log('Form submitted:', formData)
//   }

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }))
//   }

//   return (
//     <section className="min-h-screen bg-gray-50">
//       <div className="min-h-screen flex items-center justify-center px-6 py-20">
//         <div className="w-full max-w-7xl mx-auto">
//           <div className="grid lg:grid-cols-2 gap-20 items-start">

//             {/* Left Side */}
//             <div className="space-y-12">
//               <div>
//                 <h1 className="text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-black leading-none tracking-tighter text-sudo-neutral-6">
//                  {` LET'S`}
//                 </h1>
//                 <h1 className="text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-black leading-none tracking-tighter text-sudo-neutral-6 -mt-6 lg:-mt-12">
//                   TALK
//                 </h1>
//               </div>

//               <div className="space-y-6 max-w-lg">
//                 <p className="text-xl text-gray-700 leading-relaxed">
//                   Ready to bring your vision to life? We specialize in creating digital experiences that drive results and exceed expectations.
//                 </p>

//                 <div className="space-y-3">
//                   <p className="text-lg text-gray-600">
//                     <span className="font-semibold text-sudo-neutral-6">Email:</span> hello@agency.com
//                   </p>
//                   <p className="text-lg text-gray-600">
//                     <span className="font-semibold text-sudo-neutral-6">Phone:</span> +1 (555) 123-4567
//                   </p>
//                   <p className="text-lg text-gray-600">
//                     <span className="font-semibold text-sudo-neutral-6">Location:</span> San Francisco, CA
//                   </p>
//                 </div>

//                 <div className="pt-6">
//                   <p className="text-sm font-semibold text-sudo-neutral-6 mb-4 tracking-wide">
//                     FOLLOW US
//                   </p>
//                   <div className="flex gap-4">
//                     <a 
//                       href="#" 
//                       className="w-12 h-12 bg-sudo-white-1 border border-sudo-neutral-1 rounded-lg flex items-center justify-center text-gray-600 hover:text-sudo-neutral-6 hover:border-gray-400"
//                     >
//                       <Github className="w-5 h-5" />
//                     </a>
//                     <a 
//                       href="#" 
//                       className="w-12 h-12 bg-sudo-white-1 border border-sudo-neutral-1 rounded-lg flex items-center justify-center text-gray-600 hover:text-sudo-neutral-6 hover:border-gray-400"
//                     >
//                       <Twitter className="w-5 h-5" />
//                     </a>
//                     <a 
//                       href="#" 
//                       className="w-12 h-12 bg-sudo-white-1 border border-sudo-neutral-1 rounded-lg flex items-center justify-center text-gray-600 hover:text-sudo-neutral-6 hover:border-gray-400"
//                     >
//                       <Linkedin className="w-5 h-5" />
//                     </a>
//                     <a 
//                       href="#" 
//                       className="w-12 h-12 bg-sudo-white-1 border border-sudo-neutral-1 rounded-lg flex items-center justify-center text-gray-600 hover:text-sudo-neutral-6 hover:border-gray-400"
//                     >
//                       <Instagram className="w-5 h-5" />
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Right Side - Form */}
//             <div>
//               <div className="bg-sudo-white-1 rounded-3xl p-12 shadow-2xl border border-gray-100 relative overflow-hidden">
//                 <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full -translate-y-16 translate-x-16"></div>
//                 <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-gray-100 to-gray-200 rounded-full translate-y-12 -translate-x-12"></div>

//                 <div className="relative z-10">
//                   <div className="mb-12">
//                     <h2 className="text-4xl font-black text-sudo-neutral-6 mb-4 tracking-tight">
//                       START YOUR
//                     </h2>
//                     <h2 className="text-4xl font-black text-sudo-neutral-6 -mt-2 tracking-tight">
//                       PROJECT
//                     </h2>
//                     <p className="text-gray-600 mt-4 text-lg">
//                       {`Tell us about your ideas and we'll get back to you within 24 hours.`}
//                     </p>
//                   </div>

//                   <form onSubmit={handleSubmit} className="space-y-8">
//                     <div>
//                       <label className="block text-sm font-bold text-sudo-neutral-6 mb-3 tracking-wide uppercase">
//                         Your Name
//                       </label>
//                       <input
//                         type="text"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleChange}
//                         className="w-full h-16 bg-gray-50 border-2 border-sudo-neutral-1 rounded-2xl px-6 text-xl text-sudo-neutral-6 focus:border-sudo-blue-6 focus:bg-sudo-white-1 focus:outline-none"
//                         placeholder="John Doe"
//                         required
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-bold text-sudo-neutral-6 mb-3 tracking-wide uppercase">
//                         Email Address
//                       </label>
//                       <input
//                         type="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         className="w-full h-16 bg-gray-50 border-2 border-sudo-neutral-1 rounded-2xl px-6 text-xl text-sudo-neutral-6 focus:border-sudo-blue-6 focus:bg-sudo-white-1 focus:outline-none"
//                         placeholder="john@example.com"
//                         required
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-bold text-sudo-neutral-6 mb-3 tracking-wide uppercase">
//                         Project Details
//                       </label>
//                       <textarea
//                         name="message"
//                         value={formData.message}
//                         onChange={handleChange}
//                         rows={6}
//                         className="w-full bg-gray-50 border-2 border-sudo-neutral-1 rounded-2xl p-6 text-xl text-sudo-neutral-6 focus:border-sudo-blue-6 focus:bg-sudo-white-1 resize-none focus:outline-none"
//                         placeholder="Tell us about your vision, goals, and what you'd like to achieve..."
//                         required
//                       />
//                     </div>

//                     <div className="pt-4">
//                       <button
//                         type="submit"
//                         className="w-full bg-sudo-neutral-6 hover:bg-gray-800 text-white text-xl font-black h-16 rounded-2xl tracking-wide cursor-pointer"
//                       >
//                         SEND MESSAGE
//                       </button>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

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
        h-screen
        bg-cover
        bg-center
        bg-no-repeat
        bg-fixed
        relative
        overflow-hidden
      "
      // style={{
      //   // Corrected: Wrapped the URL in url('') to make it a valid CSS value
      //   backgroundImage: "url('https://images.unsplash.com/photo-1636955903101-d6b4b926018c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      // }}
    >
      {/* Overlay to darken background */}
      <div className="absolute inset-0 bg-sudo-neutral-6" />

      {/* Content wrapper */}
      <div className="relative z-10 h-full flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-6xl mx-auto ">
          <div className="grid lg:grid-cols-2 gap-12 items-center h-full">
            {/* Left Side */}
            <div className="space-y-6   text-sudo-white-1">
              <div>
                <h1 className="text-sudo-header-42 font-heading font-black leading-tight">
                  We’d Love to Hear From You
                </h1>
              </div>

              <div className="space-y-4 max-w-md">
                <p className="text-sudo-paragraph-20 text-sudo-white-4 leading-relaxed">
                  Ready to bring your vision to life? We create digital experiences that drive results.
                </p>

                <div className="space-y-2 text-sudo-neutral-1">
                  <p className="text-base">
                    <span className="font-semibold">Email:</span> hello@agency.com
                  </p>
                  <p className="text-base">
                    <span className="font-semibold">Phone:</span> +1 (555) 123-4567
                  </p>
                </div>

                <div className="pt-4">
                  <p className="text-sudo-title-22 font-semibold mb-3 text-sudo-blue-1 tracking-wide">
                    FOLLOW US
                  </p>
                  <div className="flex gap-3">
                    {[Github, Twitter, Linkedin, Instagram].map((Icon, i) => (
                      <a
                        key={i}
                        href="#"
                        className="w-10 h-10 bg-sudo-white-1 bg-opacity-10 backdrop-blur-sm  border-opacity-20 rounded-lg flex items-center justify-center hover:bg-sudo-blue-3 hover:border-opacity-40 transition-all duration-300"
                      >
                        <Icon className="w-4 h-4 text-sudo-neutral-6" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div>
              <div className="bg-gradient-to-bl from-sudo-blue-2 to-sudo-white-2  backdrop-blur-md rounded-2xl p-8 shadow-2xl  relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-sudo-blue-2 to-sudo-purple-1 rounded-full -translate-y-7 translate-x-7 opacity-60" />
                <div className="absolute bottom-0 left-0 w-28 h-28 bg-gradient-to-tr from-pink-400 to-blue-100 rounded-full translate-y-10 -translate-x-10 opacity-60" />

                <div className="relative z-10">
                  <div className="mb-8">
                    <h2 className="text-sudo-title-28 font-semibold mb-2 tracking-tight">
                      START YOUR PROJECT
                    </h2>
                    <p className="text-sudo-neutral-4 text-base">
                      {`Tell us about your ideas and we'll get back to you within 24 hours.`}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-xs font-bold text-sudo-neutral-6 mb-2 tracking-wide uppercase">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full h-12 bg-sudo-white-1 bg-opacity-80 border-2 border-sudo-neutral-1 rounded-xl px-4 text-base text-sudo-neutral-6 focus:border-sudo-blue-6 focus:bg-sudo-white-1 focus:outline-none transition-all duration-300"
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
                        className="w-full h-12 bg-sudo-white-1 bg-opacity-80 border-2 border-sudo-neutral-1 rounded-xl px-4 text-base text-sudo-neutral-6 focus:border-sudo-blue-6 focus:bg-sudo-white-1 focus:outline-none transition-all duration-300"
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
                        rows={4}
                        className="w-full bg-sudo-white-1 bg-opacity-80 border-2 border-sudo-neutral-1 rounded-xl p-4 text-base text-sudo-neutral-6 focus:border-sudo-blue-6 focus:bg-sudo-white-1 resize-none focus:outline-none transition-all duration-300"
                        placeholder="Tell us about your vision and goals..."
                        required
                      />
                    </div>

                    <div className="pt-2 w-full ">
                      <Button type='submit' icon_style="border border-sudo-white-1  text-sudo-neutral-5  bg-sudo-white-2 opacity-100" className="text-sudo-white-2 !rounded-lg w-full" label="Free Consultation" />
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