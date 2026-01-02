/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                rival: {
                    dark: '#0B0E14',
                    card: '#151921',
                    teal: '#2FE9A9', // Adjusted to match the 'Coming Soon' and bright accents more closely
                    cyan: '#00F0FF',
                    accent: '#FF5E3A', // The specific bright orange/red from the buttons
                    text: '#E0E0E0',
                    muted: '#888888',
                }
            },
            fontFamily: {
                sans: ['Rajdhani', 'sans-serif'],
                display: ['Bebas Neue', 'sans-serif'],
                oswald: ['Oswald', 'sans-serif'],
                handwriting: ['"Dancing Script"', 'cursive'],
            },
            skew: {
                '15': '15deg',
                '-15': '-15deg',
            }
        },
    },
    plugins: [],
}
