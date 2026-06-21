# Login & Signup Page Design

A modern, animated authentication page built with **Next.js 14**, **React**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

## Features

- **Login Form** — Email/password with validation, show/hide password, remember me, forgot password
- **Signup Form** — First/last name, email, password strength, confirm password, terms agreement
- **OTP Verification** — 6-digit code input with auto-focus and 60s resend timer
- **3D Tilt Card** — Mouse-following perspective effect on the auth card
- **Animated Background** — Floating gradient orbs, particle effects, grid pattern
- **Social Login** — Google and GitHub OAuth buttons
- **Dark/Light Theme** — Toggle with localStorage persistence
- **Framer Motion Animations** — Smooth transitions between forms

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| Next.js 14 | React framework with App Router |
| TypeScript | Type safety |
| Tailwind CSS | Utility-first styling |
| Framer Motion | Animations & transitions |

## Project Structure

```
app/
├── page.tsx              # Main auth page (login / signup / OTP)
├── layout.tsx            # Root layout with metadata
├── globals.css           # Global styles & Tailwind directives
├── components/
│   └── auth/
│       ├── Background.tsx    # Animated background orbs & particles
│       ├── LoginForm.tsx     # Login form with validation
│       ├── SignupForm.tsx    # Signup form with validation
│       ├── OTPForm.tsx       # OTP verification form
│       └── ThemeToggle.tsx   # Dark/light theme switch
└── hooks/
    └── useTheme.ts         # Theme context provider
```

## Quick Start (Local Development)

### 1. Install Dependencies

Open a terminal in the project folder and run:

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production

```bash
npm run build
```

The static export will be generated in the `dist/` folder.

## Deploy to Vercel

### Option A: Vercel CLI

```bash
npm i -g vercel
vercel
```

### Option B: GitHub + Vercel Dashboard

1. Push this project to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and import the repo
3. Vercel auto-detects Next.js — just click **Deploy**

## Preview (Static HTML)

A simplified static preview (`preview.html`) is included for quick viewing without installing dependencies. Open it directly in any browser, or run:

```bash
node server.js
```

Then visit [http://localhost:8080](http://localhost:8080).

## License

MIT
