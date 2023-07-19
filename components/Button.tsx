import React, { ButtonHTMLAttributes } from "react";

type ButtonVariant =
	| "primary"
	| "secondary"
	| "outlined"
	| "indicator"
	| "starBtn"
	| "pdfButton";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant: ButtonVariant;
	bestValue?: Boolean;
	className?: string;
	type: "button" | "submit" | "reset";
	onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
	children,
	variant = "primary",
	bestValue,
	className,
	type,
	onClick,
	...rest
}) => {
	const getButtonClasses = (dynamicClass: any) => {
		switch (variant) {
			case "primary":
				return "py-2 px-4 bg-primary text-white rounded-full hover:bg-secondary hover:transition-all";
			case "secondary":
				return "py-2 px-4 bg-secondary text-white rounded-full hover:bg-secondary hover:transition-all";
			case "outlined":
				return "py-2 px-4 border-2 border-prime text-black rounded-full font-bold";
			case "pdfButton":
				return "p-2 text-xl outline-none border-none rounded-full cursor-pointer bg-primary text-white";
			case "indicator":
				return dynamicClass
					? "py-2 px-4 bg-indicator1 text-black rounded-full"
					: "py-2 px-4 bg-indicator2 text-black rounded-full";
			default:
				return "py-2 px-4 bg-none text-white hover:bg-secondary hover:transition-all";
		}
	};

	return (
		<button
			onClick={onClick}
			className={`${
				variant === "indicator" && "flex w-32 text-xs transition-all"
			} ${getButtonClasses(bestValue)} ${className}`}
			{...rest}>
			{children}
		</button>
	);
};

export default Button;
