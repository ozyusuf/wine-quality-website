/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                wine: {
                    red: '#722F37',
                    darkRed: '#4A0404',
                    white: '#F7E7CE',
                    gold: '#D4AF37',
                },
                tech: {
                    purple: '#9D4EDD',
                    blue: '#00D9FF',
                    dark: '#0A0A0F',
                    surface: '#151520',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Outfit', 'sans-serif'],
                serif: ['Playfair Display', 'serif'],
            },
            animation: {
                'slow-spin': 'spin 20s linear infinite',
                'float': 'float 6s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                }
            }
        },
    },
    plugins: [],
}
