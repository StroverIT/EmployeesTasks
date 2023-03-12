/** @type {import('next').NextConfig} */
const nextConfig = {
  matcher: ["/", "/:notunderscore((?!_next).+)"],
  reactStrictMode: false,
  swcMinify: true,
};

module.exports = nextConfig;
