import { createResolver } from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    resolve('components/**/*.vue'),
    resolve('config/**/*.ts'),
    resolve('colors.ts')
  ],
  theme: {
    extend: {}
  }
}
