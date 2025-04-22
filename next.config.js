/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Force Next.js to use PostCSS (though usually automatic)
    // postcss: true, // This flag might be deprecated or unnecessary, let's confirm later if needed
  },
};

export default nextConfig; 