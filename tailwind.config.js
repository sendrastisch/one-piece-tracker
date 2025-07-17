/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html", "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            screens: {
                tall: {raw: '(min-height: 896px)',}
            }, fontFamily: {
                fell: ['"IM Fell English SC"', 'serif'],
            }
        },
    },
    plugins: [],
}

