import { defineConfig } from 'astro/config'
import vercel from '@astrojs/vercel/serverless'
import tailwind from '@astrojs/tailwind'
import sitemap from '@astrojs/sitemap'
import compress from 'astro-compress'
import AstroPWA from '@vite-pwa/astro'

// https://astro.build/config
export default defineConfig({
	site: 'https://1tpp.dev',
	output: 'server',
	adapter: vercel({
		webAnalytics: {
			enabled: true
		},
		speedInsights: {
			enabled: true
		},
		imageService: true,
		imagesConfig: {
			deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
			devImageService: 'squoosh',
			sizes: [320, 640, 1280],
			domains: ['1tpp.dev']
		}
	}),
	integrations: [
		tailwind(),
		sitemap({
			customPages: [`https://1tpp.dev/`]
		}),
		compress(),
		AstroPWA({
			mode: 'development',
			base: '/',
			scope: '/',
			includeAssets: ['favicon.svg'],
			registerType: 'autoUpdate',
			manifest: {
				name: '1tpp.dev',
				short_name: '1tpp',
				theme_color: '#222222',
				start_url: '/',
				display: 'standalone',
				prefer_related_applications: false,
				icons: [
					{
						src: 'pwa-192x192.png',
						sizes: '192x192',
						type: 'image/png'
					},
					{
						src: 'pwa-512x512.png',
						sizes: '512x512',
						type: 'image/png'
					},
					{
						src: 'pwa-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any maskable'
					}
				]
			},
			workbox: {
				navigateFallback: '/404',
				globPatterns: ['**/*.{css,js,html,svg,png,ico,txt,astro}']
			},
			devOptions: {
				enabled: true,
				navigateFallbackAllowlist: [/^\/404$/]
			}
		})
	],
	vite: {
		logLevel: 'info',
		define: {
			__DATE__: `'${new Date().toISOString()}'`
		}
	}
})
