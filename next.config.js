/** @type {import('next').NextConfig} */
const nextConfig = {
  matcher: ["/", "/:notunderscore((?!_next).+)"],
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
