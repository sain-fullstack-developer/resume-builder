import React from "react";
import { ReactNode } from "react";

interface DetailsColumnProps {
	sideHeading: string;
	content: ReactNode | number;
	ClassContainer?: string;
	contentBold?: Boolean;
	color?: string;
}

const DetailsColumn: React.FC<DetailsColumnProps> = ({
	sideHeading,
	content,
	ClassContainer,
	contentBold,
	color,
}) => {
	return (
		<div
			style={{ color: color }}
			className={`grid grid-cols-2 mb-6 ${ClassContainer}`}>
			<p className="pr-4  font-semibold">{sideHeading} : </p>
			{contentBold ? (
				<p className="font-medium tracking-widest text-gray-600">
					<b>{content}</b>
				</p>
			) : (
				<p className="tracking-widest">{content}</p>
			)}
		</div>
	);
};

export default DetailsColumn;
