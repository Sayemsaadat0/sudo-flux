# Sudo Flux

A modern, full-featured business website built with Next.js. This application showcases services, portfolio, blog posts, and includes an admin panel for content management.

## 📋 Overview

Sudo Flux is a professional business website that helps companies showcase their services, portfolio, and connect with potential clients. The website includes:

- **Public-facing pages** for visitors to learn about services, view portfolio, read blogs, and contact the business
- **Admin panel** for managing content, users, and website data
- **Visitor tracking** to understand how users interact with the website
- **Authentication system** to secure admin access
- **Responsive design** that works on all devices

## ✨ Features

### For Visitors
- 🏠 **Home Page** - Beautiful landing page with hero section, services overview, and company information
- 📝 **Blog Section** - Read and browse blog posts about industry insights and updates
- 💼 **Portfolio** - View completed projects and case studies
- 🛠️ **Services** - Detailed information about offered services
- 💼 **Careers** - Browse job openings and apply for positions
- 📞 **Contact** - Get in touch through contact forms
- ❓ **FAQ** - Find answers to common questions
- 🆓 **Free Consultation** - Request a free consultation with the team
- 📄 **Legal Pages** - Privacy policy, terms & conditions, and licensing information

### For Administrators
- 🔐 **Secure Login** - Protected admin area with authentication
- 📊 **Dashboard** - Overview of website statistics and data
- ✏️ **Content Management** - Create, edit, and manage:
  - Blog posts
  - Services
  - Portfolio projects
  - Team members
  - Careers/job postings
  - FAQs
  - Industries
  - Categories
- 👥 **User Management** - Manage admin users and permissions
- 📈 **Analytics** - Track visitor data and engagement

### Technical Features
- ⚡ **Fast Performance** - Built with Next.js 15 for optimal speed
- 🎨 **Modern UI** - Beautiful animations and smooth scrolling
- 📱 **Mobile Responsive** - Works perfectly on phones, tablets, and desktops
- 🌙 **Dark Mode** - Support for light and dark themes
- 🔍 **SEO Optimized** - Built for search engine visibility
- 🚀 **Production Ready** - Ready to deploy to Vercel or any hosting platform

## 🛠️ Technologies Used

This project is built with modern web technologies:

### Core Framework
- **Next.js 15.4.5** - React framework for production
- **React 19.1.0** - JavaScript library for building user interfaces
- **TypeScript 5** - Typed JavaScript for better code quality

### Styling & UI
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion 12.23.12** - Animation library for smooth transitions
- **GSAP 3.13.0** - Professional animation library
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library

### Backend & Database
- **Mongoose 8.18.0** - MongoDB object modeling
- **NextAuth 4.24.11** - Authentication for Next.js
- **bcryptjs 3.0.2** - Password hashing
- **jsonwebtoken 9.0.2** - JSON Web Token implementation

### Forms & Validation
- **Formik 2.4.6** - Form management
- **Yup 1.7.0** - Schema validation

### Rich Text Editing
- **Tiptap 3.4.2** - Rich text editor framework

### Data Fetching
- **TanStack React Query 5.86.0** - Powerful data synchronization
- **Axios 1.11.0** - HTTP client

### State Management
- **Zustand 5.0.8** - Lightweight state management

### Email & File Storage
- **Nodemailer 6.10.1** - Email sending
- **Resend 6.1.0** - Email API service
- **Vercel Blob 1.1.1** - File storage

### Utilities
- **date-fns 4.1.0** - Date utility library
- **clsx 2.1.1** - Conditional classnames
- **Sonner 2.0.7** - Toast notifications
- **Lenis 1.0.42** - Smooth scrolling

### Development Tools
- **ESLint 9** - Code linting
- **TypeScript** - Type checking

## 🚀 Getting Started

Follow these simple steps to get the project running on your computer.

### Prerequisites

Before you begin, make sure you have these installed:
- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn** or **pnpm**
- **MongoDB** - Database for storing data ([Download here](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for free cloud database)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/sudo-flux.git
   ```

2. **Navigate to the project folder**
   ```bash
   cd sudo-flux
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```
   or if you're using yarn:
   ```bash
   yarn install
   ```
   or if you're using pnpm:
   ```bash
   pnpm install
   ```

4. **Set up environment variables**
   
   Create a `.env.local` file in the root directory and add your configuration:
   ```env
   # Database
   MONGODB_URI=your_mongodb_connection_string
   
   # NextAuth
   NEXTAUTH_URL=http://localhost:4000
   NEXTAUTH_SECRET=your_secret_key_here
   
   # Email (optional, for contact forms)
   RESEND_API_KEY=your_resend_api_key
   
   # File Upload (optional)
   BLOB_READ_WRITE_TOKEN=your_vercel_blob_token
   ```
   
   > **Note:** Replace the placeholder values with your actual credentials. You can generate a `NEXTAUTH_SECRET` by running: `openssl rand -base64 32` in your terminal.

5. **Run the development server**
   ```bash
   npm run dev
   ```
   or:
   ```bash
   yarn dev
   ```
   or:
   ```bash
   pnpm dev
   ```

6. **Open your browser**
   
   Visit [http://localhost:4000](http://localhost:4000) to see your website!

## 📜 Available Scripts

Once you have the project set up, you can use these commands:

- `npm run dev` - Start the development server (runs on port 4000)
- `npm run build` - Build the project for production
- `npm run start` - Start the production server (run `build` first)
- `npm run lint` - Check your code for errors

## 📁 Project Structure

```
sudo-flux/
├── src/
│   ├── app/              # Next.js app router pages
│   │   ├── (root)/       # Public pages (home, blog, portfolio, etc.)
│   │   ├── (admin)/      # Admin panel pages
│   │   └── api/          # API routes
│   ├── components/       # Reusable React components
│   ├── models/           # Database models (Mongoose)
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions and helpers
│   └── store/            # State management
├── public/               # Static files (images, icons)
└── package.json          # Project dependencies
```

## 🔧 Configuration

### MongoDB Setup

1. **Local MongoDB:**
   - Install MongoDB on your computer
   - Start MongoDB service
   - Use connection string: `mongodb://localhost:27017/sudo-flux`

2. **MongoDB Atlas (Cloud - Recommended for beginners):**
   - Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free cluster
   - Get your connection string
   - Add it to `.env.local` as `MONGODB_URI`

## 🚢 Deployment

The easiest way to deploy this project is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy!

Vercel will automatically detect Next.js and configure everything for you.

## 📝 Notes

- The development server runs on port **4000** (not the default 3000)
- Make sure MongoDB is running before starting the app
- Check the console for any errors if something doesn't work

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📄 License

This project is private and proprietary.

---

**Happy Coding! 🎉**
