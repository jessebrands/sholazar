/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            gridTemplateColumns: {
                'layout': 'auto 1fr minmax(350px, auto)',
                'properties': '1fr 2fr'
            },
            gridTemplateRows: {
                'layout': 'auto 1fr auto'
            },
            colors: {
                'gray': {
                    '50': '#f6f6f6',
                    '100': '#e7e7e7',
                    '200': '#d1d1d1',
                    '300': '#b0b0b0',
                    '400': '#888888',
                    '500': '#6d6d6d',
                    '600': '#5d5d5d',
                    '700': '#4A4A4A',
                    '800': '#303030',
                    '900': '#1F1F1F',
                    '950': '#131313',
                },
            }
        },
    },
    plugins: [],
}

