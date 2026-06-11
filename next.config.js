/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  // For MDX, we're using next-mdx-remote/rsc which compiles content dynamically.
  // No need for @next/mdx webpack setup here unless .mdx files are routes themselves.
};

module.exports = nextConfig;
