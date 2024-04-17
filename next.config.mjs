/* eslint-disable no-underscore-dangle */
/** @type {import('next').NextConfig} */
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const nextConfig = {
  sassOptions: {
    // prependData: `@import "src/styles/globals.scss";`,
    includePaths: [path.join(__dirname, 'styles')],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack', 'url-loader'],
    });

    return config;
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'codeit-images.codeit.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};
export default nextConfig;
