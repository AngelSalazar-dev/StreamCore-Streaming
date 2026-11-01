/** @type {import('next').NextConfig} */
const nextConfig = {
  // Multiple lockfiles confuse Turbopack's root inference (it picked a
  // package-lock.json in the user home), which breaks next/font resolution.
  turbopack: {
    root: __dirname,
  },
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'image.tmdb.org' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
