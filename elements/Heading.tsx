import React from "react";

interface HeadingProps {
	level: number;
	text: string | undefined;
	className?: string;
	underline?: boolean;
}

const Heading = ({ level, text, className, underline }: HeadingProps) => {
	if (level === 2) {
		className =
			className &&
			`text-primaryTemp font-bold mt-10 mb-5 relative w-max uppercase ${
				underline
					? "before:content before:block before:absolute before:rounded-lg before:-bottom-1 before:h-[2px] before:w-full before:bg-secondaryTemp"
					: ""
			}`;
	}
	if (level === 3) {
		className =
			className &&
			`text-white font-bold mt-10 mb-5 relative w-max uppercase ${
				underline
					? "before:content before:block before:absolute before:rounded-lg before:-bottom-1 before:h-[2px] before:w-full before:bg-white"
					: ""
			}`;
	}
	const HeadingTag = `h${level}`;

	return React.createElement(HeadingTag, { className }, text);
};

export default Heading;
