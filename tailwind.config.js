/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			rotate: {
				arrowRight: "220deg",
			},
			backgroundColor: {
				primary: "var(--primary)",
				secondary: "var(--primary-full)",
				primaryTemp: "var(--temp0-primary)",
				secondaryTemp: "var(--temp0-text-primary)",
				primaryTempOne: "blue",
				secondaryTempOne: "",
				transperentPrimary: "rgba(255, 255, 255, 0.3)",
				transperentBlack: "rgba(0, 0, 0, 0.4)",
			},
			textColor: {
				primary: "var(--transperant-primary)",
				secondary: "var(--transperant-secondary)",
				primaryTemp: "var(--temp0-text-primary)",
				secondaryTemp: "",
			},
			fontSize: {
				h1: "4rem",
			},
			gridTemplateColumns: {
				interestHobbiesInput: "0.5fr 100px",
				temp0top: "0.3fr 1fr",
				temp0two: "0.6fr 0.3fr 0.3fr 0.3fr 1fr",
				temp1One: "340px 1fr",
				temp2One: "400px 1fr",
				temp2Two: "1fr 0.4fr 1fr",
				temp3One: "240px 1fr",
				temp3Two: "0.2fr 1fr",
				temp5One: "0.4fr 1fr",
				compDetails: "max-content 1fr",
			},
			borderRadius: { select: "0 30px 30px 0" },
			backgroundImage: {
				heroPattern: "url('/public/home-bg.jpg')",
			},
			width: {
				vw: "100vw",
			},
		},
	},
	plugins: [],
};
