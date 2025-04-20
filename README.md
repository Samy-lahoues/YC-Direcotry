# YC Directory - Startup Ecosystem Platform

🚀 **YC Directory** is a modern web platform that empowers entrepreneurs to pitch their startups and connect with like-minded founders in the startup ecosystem.

## ✨ Features

- **Startup Pitches** – Showcase your startup to potential collaborators and investors

- **Entrepreneur Network** – Connect with founders in your industry

- **Modern UI** – Built with a clean, responsive design

- **CMS-Powered** – Easy content management with Sanity.io

- **Performance Optimized** – Fast-loading Next.js application


## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)

- **CMS**: Sanity.io (Headless Content Management)

- **UI Components**: shadcn/ui (Radix + TailwindCSS)

- **Styling**: TailwindCSS

- **Error Monitoring**: Sentry

- **Form Validation**: Zod

- **Slug Generation**: `sluggify`


## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/yc-directory.git
cd yc-directory
```

### 2. Install Dependencies
```
npm install
# or
yarn install
# or
pnpm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file and add:
```env
AUTH_SECRET=your_sanity_project_id
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=
NEXTAUTH_URL=your_sentry_dsn=
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
NEXT_PUBLIC_SANITY_API_VERSION=
SANITY_WRITE_TOKEN=
SENTRY_AUTH_TOKEN=
```


### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```



Open [http://localhost:3000](http://localhost:3000/) in your browser.

## 📦 Scripts

- `dev` – Start development server

- `build` – Build for production

- `start` – Run production build

- `lint` – Check for code errors

- `sanity:studio` – Launch Sanity Studio


## 📂 Project Structure

Copy

Download

.
├── app/               # Next.js App Router
├── components/        # Reusable UI components (shadcn)
├── lib/               # Utilities (Sanity client, helpers)
├── schemas/           # Sanity CMS schemas
└── public/            # Static assets

## 📝 License

MIT

---

💡 **Need help?** Open an issue or contribute to make YC Directory better!

🔗 **Live Demo**: [https://yc-directory.vercel.app](https://yc-directory.vercel.app/) (example)

Let’s build the future of startups together! 🚀
