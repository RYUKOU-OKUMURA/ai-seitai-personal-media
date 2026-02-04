/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#197fe6",
        "background-light": "#f6f7f8",
        "background-dark": "#111921",
      },
      fontFamily: {
        "display": ['LINE Seed JP', 'Hiragino Sans', 'sans-serif'],
        "sans": ['LINE Seed JP', 'Hiragino Sans', 'sans-serif'],
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
    },
  },
  plugins: [],
}
