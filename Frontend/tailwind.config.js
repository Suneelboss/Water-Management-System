/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter var",
          "SF Pro Display",
          "SF Pro Text",
          "system-ui",
          "sans-serif",
        ],
      },
      colors: {
        water: {
          100: "#E6F7FF",
          200: "#BAE7FF",
          300: "#91D5FF",
          400: "#69C0FF",
          500: "#40A9FF", // Primary water blue
          600: "#1890FF",
          700: "#096DD9",
          800: "#0050B3",
          900: "#003A8C",
        },
        alert: {
					info: '#40A9FF',
					success: '#52C41A',
					warning: '#FAAD14',
					error: '#FF4D4F',
				}
      },
      screens: {
        showMenu: "858px",
        showPicture: "974px",
        showFooter: "990px",
        showCarousel: "1250PX",
      },
    },
  },
  plugins: [],
};
