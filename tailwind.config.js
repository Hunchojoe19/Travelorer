/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#0EA5E9",
                brand: {
                    blue: "#38bdf8",
                    cyan: "#22d3ee",
                    dark: "#0a0a0a",
                    text: "#1e293b",
                    gray: "#F5F5F7",
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            backgroundImage: {
                'hero-gradient': 'linear-gradient(180deg, #38bdf8 0%, #bae6fd 60%, #ffffff 100%)',
                'footer-glow': 'radial-gradient(circle at center, rgba(56, 189, 248, 0.15) 0%, rgba(0, 0, 0, 0) 70%)',
            }
        },
    },
    plugins: [],
}
