/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        emeraldDark: "#1A7458",
        pistachio: "#7AB839"
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "Inter", "Segoe UI", "sans-serif"]
      },
      boxShadow: {
        card: "0 4px 24px -4px rgba(26, 116, 88, 0.12)",
        "card-hover": "0 12px 40px -8px rgba(26, 116, 88, 0.2)"
      },
      keyframes: {
        "hero-float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" }
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        }
      },
      animation: {
        "hero-float": "hero-float 5s ease-in-out infinite",
        marquee: "marquee 28s linear infinite"
      }
    }
  },
  plugins: []
};
