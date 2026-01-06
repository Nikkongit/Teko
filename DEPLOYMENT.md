# Teko Website - Deployment Guide

## 🚀 Production Build Complete

Your Teko website is now ready for deployment! This guide will help you deploy it to production.

## 📋 What's Included

### Pages
- **Home** (`/`) - Banner slider, about section, innovations showcase, features, testimonials
- **About** (`/about`) - Company vision and values
- **Innovations** (`/innovations`) - Technology showcases
- **Features** (`/features`) - Product capabilities
- **Contact** (`/contact`) - Contact form with database persistence

### Features
- ✅ Responsive design with dark/light theme toggle
- ✅ Interactive banner slider (3 slides)
- ✅ Scroll-based stacking card animations
- ✅ SQLite database for contact form submissions
- ✅ Full-stack Next.js application
- ✅ Optimized images with next/image
- ✅ Production build ready

## 🛠️ Tech Stack

- **Framework**: Next.js 16.1.1 (App Router)
- **Styling**: Custom CSS + Tailwind CSS 4
- **Database**: SQLite with better-sqlite3
- **Font**: Google Fonts (Outfit)
- **Language**: TypeScript

## 📦 Deployment Options

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```

3. **Follow prompts** and your site will be live!

**Note**: For SQLite database persistence on Vercel, consider upgrading to a PostgreSQL or MySQL database for production, or use Vercel's KV storage.

### Option 2: Netlify

1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Build and Deploy**:
   ```bash
   npm run build
   netlify deploy --prod
   ```

### Option 3: Traditional Hosting (VPS/Dedicated Server)

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Start production server**:
   ```bash
   npm start
   ```

3. **Use PM2 for process management**:
   ```bash
   npm install -g pm2
   pm2 start npm --name "teko-web" -- start
   pm2 save
   pm2 startup
   ```

4. **Configure Nginx as reverse proxy**:
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

### Option 4: Docker Deployment

1. **Create Dockerfile**:
   ```dockerfile
   FROM node:20-alpine AS base
   
   FROM base AS deps
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci
   
   FROM base AS builder
   WORKDIR /app
   COPY --from=deps /app/node_modules ./node_modules
   COPY . .
   RUN npm run build
   
   FROM base AS runner
   WORKDIR /app
   ENV NODE_ENV production
   
   COPY --from=builder /app/public ./public
   COPY --from=builder /app/.next/standalone ./
   COPY --from=builder /app/.next/static ./.next/static
   
   EXPOSE 3000
   CMD ["node", "server.js"]
   ```

2. **Build and run**:
   ```bash
   docker build -t teko-web .
   docker run -p 3000:3000 teko-web
   ```

## 🗄️ Database Considerations

### Current Setup
- Using SQLite (`prisma/dev.db`) for local development
- Contact form submissions are stored locally

### For Production
Consider upgrading to a cloud database for better scalability:

1. **PostgreSQL** (Recommended for Vercel):
   ```bash
   npm install pg
   ```
   Update `src/lib/db.ts` to use PostgreSQL connection

2. **MySQL**:
   ```bash
   npm install mysql2
   ```

3. **MongoDB**:
   ```bash
   npm install mongodb
   ```

## ✅ Pre-Deployment Checklist

- [x] Production build completes successfully (`npm run build`)
- [x] All pages load without errors
- [x] Contact form submits and stores data
- [x] Theme toggle works (dark/light mode)
- [x] Banner slider functions correctly
- [x] All images are optimized
- [x] Responsive design tested
- [ ] Update metadata in `src/app/layout.tsx` (title, description)
- [ ] Add your own domain
- [ ] Set up SSL certificate
- [ ] Configure analytics (Google Analytics, etc.)
- [ ] Test contact form in production
- [ ] Set up error monitoring (Sentry, etc.)

## 🔧 Environment Variables

For production, you may want to set:

```env
NODE_ENV=production
DATABASE_URL=your_production_database_url
```

## 📊 Performance

The production build includes:
- Static page generation where possible
- Optimized images with next/image
- Code splitting and lazy loading
- CSS optimization

## 🎨 Customization

To customize the website:

1. **Colors**: Edit CSS variables in `src/app/globals.css` (lines 6-37)
2. **Content**: Update page components in `src/app/*/page.tsx`
3. **Images**: Replace images in `public/assets/images/`
4. **Metadata**: Update `src/app/layout.tsx`

## 📞 Support

For issues or questions:
- Check Next.js documentation: https://nextjs.org/docs
- Review the code in `src/` directory
- Contact your development team

---

**Your website is production-ready! 🎉**

Choose your deployment method above and go live!
