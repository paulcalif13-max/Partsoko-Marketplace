import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb", /* Vibrant Blue */
        secondary: "#1e293b", /* Dark Navy / Slate 800 */
        brandDark: "#0B1120", /* Calree deep midnight slate */
        brandRed: "#ef4444", /* Red accent */
        calreeGreen: "#00D066", /* Vibrant Calree Emerald Green */
        calreeGreenDark: "#059669",
        calreeGreenLight: "#34D399",
        calreeDark: "#0B1120",
        surface: "#f8fafc", /* Light background */
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'hover': '0 10px 40px -5px rgba(0, 0, 0, 0.08)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
        'fade-in': 'fadeIn 0.3s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      }
    },
  },
  plugins: [],
};
export default config;
