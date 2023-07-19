import Image from "next/image";
import React from "react";

interface TextIconProps {
	icon: string;
	text: string;
	container?: string;
	color?: string;
}

function TextIcon({ icon, text, container, color }: TextIconProps) {
	return (
		<div className={`flex gap-4 mb-5 ${container}`}>
			<Image width={100} height={100} src={icon} alt="Icon" />
			<p style={{ color: color }}>{text}</p>
		</div>
	);
}

export default TextIcon;
