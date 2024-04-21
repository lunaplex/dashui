import { createResolver } from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    resolve('components/**/*.vue'),
    resolve('ui.config/**/*.ts'),
    resolve('colors.ts')
  ],
  theme: {
    extend: {
      keyframes: {
        accordionSlideDown: {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        accordionSlideUp: {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 }
        },
        selectSlideDown: {
          from: { transform: 'translateY(-10px)' },
          to: { transform: 'translateY(0)' }
        },
        selectSlideUp: {
          from: { transform: 'translateY(10px)' },
          to: { transform: 'translateY(0)' }
        }
      },
      animation: {
        accordionSlideDown: 'accordionSlideDown 150ms ease-in-out',
        accordionSlideUp: 'accordionSlideUp 150ms ease-in-out',
        selectSlideDown: 'selectSlideDown 150ms ease-in-out',
        selectSlideUp: 'selectSlideUp 150ms ease-in-out'
      }
    }
  }
}
