/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		deviceSizes: [320, 480, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	},
};

module.exports = nextConfig;
