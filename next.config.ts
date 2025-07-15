import type { NextConfig } from 'next';

/** @type {import('next').NextConfig} */

const nextConfig: NextConfig = {
	/* config options here */
	eslint: {
		ignoreDuringBuilds: true,
	},
	images: {
		domains: ['storage.googleapis.com', 'framer-app-6e2ea.firebasestorage.app'],
	},
};

export default nextConfig;
