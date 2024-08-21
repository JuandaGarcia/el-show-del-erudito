/** @type {import('next').NextConfig} */
const runtimeCaching = require('next-pwa/cache')
const withPWA = require('next-pwa')({
	disable: process.env.NODE_ENV === 'development',
	dest: 'public',
	skipWaiting: true,
	runtimeCaching,
})

const nextConfig = {}

module.exports = withPWA(nextConfig)
