/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '4443',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4443',
      },
    ],
  },
};

export default nextConfig;
