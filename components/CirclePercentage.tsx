import React from "react";

interface circleRatingProps {
	value: number;
}

const CircleRating: React.FC<circleRatingProps> = ({ value }) => {
	const radius = 30;
	const circumference = 2 * Math.PI * radius;
	const dashArray = circumference;
	const dashOffset = circumference - (value / 5) * circumference;

	return (
		<svg width={2 * radius} height={2 * radius}>
			<circle
				cx={radius}
				cy={radius}
				r={radius - 10}
				fill="none"
				stroke="black"
				strokeWidth="10"
			/>
			<circle
				cx={radius}
				cy={radius}
				r={radius - 3}
				fill="none"
				stroke="white"
				strokeWidth="10"
				strokeDasharray={dashArray}
				strokeDashoffset={dashOffset}
				strokeLinecap="round"
			/>
			<text
				x={radius}
				y={radius + 5}
				textAnchor="middle"
				fontSize="18"
				fontWeight="bold">
				{value}
			</text>
		</svg>
	);
};

export default CircleRating;
