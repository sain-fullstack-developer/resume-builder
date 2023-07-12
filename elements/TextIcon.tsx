import React from "react";

interface TextIconProps {
	icon: string;
	text: string;
	container?: string;
	color?: string;
}

function TextIcon({ icon, text, container, color }: TextIconProps) {
	return (
		<div className={`grid grid-cols-compDetails gap-4 mb-5 ${container}`}>
			<img src={icon} alt="Icon" />
			<p style={{ color: color }}>{text}</p>
		</div>
	);
}

export default TextIcon;
