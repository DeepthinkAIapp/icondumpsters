# Icon Dumpsters - Professional Waste Management Solutions

A modern, responsive website for Icon Dumpsters, a professional dumpster rental service company.

## 🚀 Live Demo

**Production Site**: [https://icondumpsters.com](https://icondumpsters.com)

**Domain Configuration**: 
- Primary domain: `icondumpsters.com` (non-www)
- Canonical URL: `https://icondumpsters.com`
- All internal links and metadata use the non-www version for SEO consistency

## 🏗️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Deployment**: Vercel
- **Form Handling**: Internal API endpoints (`/api/lead`, `/api/analytics`)
- **Icons**: Heroicons
- **Domain**: HostGator (with Vercel deployment)

## 📁 Project Structure

```
iconmain/
├── app/
│   ├── layout.tsx          # Global layout with header/footer
│   ├── page.tsx            # Homepage with services and pricing
│   ├── blog/
│   │   └── page.tsx        # Blog page
│   ├── [city]/             # City-specific pages (Salt Lake City, Sandy, etc.)
│   ├── [city]-dumpster-rental-guide-2025/  # SEO-optimized city guides
│   ├── services/           # Service pages
│   ├── contact/            # Contact page
│   ├── about/              # About page
│   ├── faq/                # FAQ page
│   ├── dumpster-calculator/ # Dumpster size calculator
│   ├── sitemap.ts          # Dynamic sitemap generation
│   └── globals.css         # Global styles
├── public/
│   ├── images/             # All dumpster images
│   ├── robots.txt          # Search engine crawling rules
│   └── favicon.ico         # Site favicon
├── images/                 # Source images
├── .htaccess              # Server configuration and redirects
└── vercel.json            # Vercel deployment config
```

## 🎨 Features

### **Homepage Sections**
- **Hero Section**: Professional banner with call-to-action
- **Our Services**: 6 service cards (Residential, Construction, Concrete, Roofing, Yard, Recyclable)
- **Main Content**: Company information with quote form
- **Popular Dumpster Sizes**: Pricing cards for 15, 20, and 30-yard dumpsters

### **Navigation**
- **Header**: Clean logo-only design with navigation menu
- **Services Link**: Smooth scroll to services section
- **Quote Form**: Submits to internal `/api/lead` endpoint for notifications and auto-replies
- **Mobile-First**: Fully responsive design

### **Local SEO Features**
- **City Pages**: Dedicated pages for 40+ Utah cities
- **SEO Guides**: Comprehensive dumpster rental guides for each city
- **Local Keywords**: Optimized for "dumpster rental near me" searches
- **Structured Data**: Proper meta tags and OpenGraph data

### **Business Information**
- **Company**: Icon Dumpsters
- **Phone**: (801) 918-6000
- **Email**: icondumpsters@gmail.com
- **Services**: 15-30 yard dumpster rentals
- **Theme Color**: Purple (#4e37a8)
- **Service Area**: Utah (Salt Lake City, Sandy, Murray, and 40+ other cities)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/DeepthinkAIapp/icondumpsters.git

# Navigate to project directory
cd icondumpsters

# Install dependencies
npm install

# Run development server
npm run dev
```

### Build for Production
```bash
# Build the project
npm run build

# Start production server
npm start
```

## 🌐 Deployment & Domain Configuration

The site is deployed on Vercel with a custom domain:

1. **Repository**: [https://github.com/DeepthinkAIapp/icondumpsters.git](https://github.com/DeepthinkAIapp/icondumpsters.git)
2. **Production URL**: [https://icondumpsters.com](https://icondumpsters.com)
3. **Domain Provider**: HostGator
4. **DNS Configuration**: CNAME pointing to Vercel

Old wordpress nameservers:
NS1565.WEBSITEWELCOME.COM
NS1566.WEBSITEWELCOME.COM

### Domain Setup
- **Primary Domain**: `icondumpsters.com`
- **WWW Redirect**: www automatically redirects to non-www (301 redirect)
- **SSL Certificate**: Automatic HTTPS via Vercel
- **SEO Optimization**: All internal links use canonical non-www URLs

### Vercel Configuration
- **Framework**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`

## 📱 Responsive Design

- **Mobile-First**: Optimized for all screen sizes
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Touch-Friendly**: Large buttons and touch targets
- **Performance**: Optimized images and fast loading

## 🎯 Key Features

### **Form Integration**
- **Formspree Endpoint**: `https://formspree.io/f/xanblnyj`
- **Email Destination**: icondumpsters@gmail.com
- **Required Fields**: Name, email, phone, zip, waste type, dumpster size, dates

### **Image Optimization**
- **Format**: JPEG and WebP images
- **Responsive**: Different sizes for different screen sizes
- **Caching**: Long-term cache headers for images
- **Alt Text**: SEO-optimized alt text for all images

### **SEO & Performance**
- **Meta Tags**: Proper title and description for all pages
- **Canonical URLs**: Consistent non-www URLs across all pages
- **Sitemap**: Dynamic sitemap generation
- **Robots.txt**: Proper search engine crawling rules
- **OpenGraph**: Social media sharing optimization
- **Loading**: Optimized for Core Web Vitals

## 🔧 Customization

### **Theme Colors**
- **Primary**: `#4e37a8` (Purple)
- **Secondary**: Orange for call-to-action buttons
- **Text**: White on purple backgrounds

### **Content Updates**
- **Services**: Edit service cards in `app/page.tsx`
- **Pricing**: Update prices in Popular Dumpster Sizes section
- **Contact**: Update phone/email in layout.tsx
- **City Pages**: Add new cities in the app directory structure

## 📞 Contact Information

- **Business**: Icon Dumpsters
- **Phone**: (801) 918-6000
- **Email**: icondumpsters@gmail.com
- **Services**: Professional dumpster rental services
- **Service Area**: Utah (40+ cities)

## 📄 License

This project is for Icon Dumpsters business use.

---

**Built with ❤️ using Next.js and Tailwind CSS**
