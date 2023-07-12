import React, { CSSProperties } from "react";

interface BarRatingProps {
	value: number;
	bgColor?: string;
	borderColor?: string;
}

const BarRating = ({ value, bgColor, borderColor }: BarRatingProps) => {
	const barStyle: CSSProperties = {
		width: "200px",
		height: "10px",
		border: `2px solid ${borderColor}`,
		background: "none",
		position: "relative",
	};

	const fillStyle: CSSProperties = {
		height: "100%",
		background: bgColor,
		position: "absolute",
		left: "0",
		top: "0",
	};

	const fillWidth = (value: number) => {
		return `${value * 40}px`;
	};

	return (
		<div style={barStyle}>
			<div style={{ ...fillStyle, width: fillWidth(value) }} />
		</div>
	);
};

export default BarRating;
