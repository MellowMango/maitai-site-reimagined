This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Project Overview

This repository contains the source code for the Maitai marketing website (v2), built to showcase the Maitai platform's features and benefits.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **UI Library:** [React](https://reactjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animation:** [Framer Motion](https://www.framer.com/motion/)
- **Fonts:** [next/font](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) (for Geist Sans/Mono and local Greycliff CF)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Project Structure

- **/app:** Contains the core application code using the Next.js App Router.
  - `layout.tsx`: Root layout, loads global styles and fonts.
  - `page.tsx`: Main landing page content.
  - `globals.css`: Global stylesheets and Tailwind directives.
  - **/components:** Reusable UI components shared across the application.
- **/public:** Static assets.
  - **/fonts:** Local font files (e.g., Greycliff CF).
- `tailwind.config.ts`: Tailwind CSS configuration file.
- `postcss.config.mjs`: PostCSS configuration (used by Tailwind).
- `next.config.mjs`: Next.js configuration file.

## Styling

Styling is primarily handled using **Tailwind CSS**. Key aspects include:

- **Utility Classes:** Tailwind utility classes are used directly in components for most styling.
- **Custom Theme:** A custom theme is defined in `tailwind.config.ts`, including:
  - **Brand Colors:** `maitai-lagoon`, `maitai-lime`, `maitai-pineapple`, etc.
  - **Custom Font Family:** `font-greycliff` is defined, mapping to the locally hosted Greycliff CF font.
  - **Typography Scale:** Custom font sizes (`display`, `h1`, `h2`, etc.) are defined.
  - **Animations/Keyframes:** Custom animations like `overlayShow` and `contentShow` are configured.
- **Global Styles:** `app/globals.css` imports Tailwind base, components, and utilities. It also defines base `:root` CSS variables (though Tailwind handles dark mode primarily via `dark:` prefixes) and minimal `body` styles.
- **Font Loading:** The primary brand font, **Greycliff CF**, is loaded locally using `next/font/local` in `app/layout.tsx`. It's made available globally via the CSS variable `--font-greycliff`, which is referenced in `tailwind.config.ts`.
- **Dynamic Styling & Safelisting:** Some dynamic styles, particularly for the sticky header's color transitions (`app/components/Header.tsx`), are handled using conditional classes applied directly in the component. To prevent Tailwind from purging these dynamically generated classes during production builds, relevant classes are explicitly added to the `safelist` array in `tailwind.config.ts`.

## Key Components

- `Header.tsx`: Site navigation header with sticky scroll behavior.
- `Footer.tsx`: Site footer.
- `DemoModal.tsx`: Modal component for requesting a demo.
- `MetricsStrip.tsx`: Component displaying key metrics/benefits.
- `QuickStart.tsx`: Section outlining steps to get started.
- `PricingSection.tsx`: Component displaying pricing plans.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Deployment

This Next.js application is typically deployed on [Vercel](https://vercel.com), the creators of Next.js. The project is configured for easy deployment on their platform.
