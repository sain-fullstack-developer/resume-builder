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
			className={`grid grid-cols-compDetails gap-3 mb-3 ${ClassContainer}`}>
			<p>{sideHeading} : </p>
			{contentBold ? (
				<p className="font-medium tracking-widest">
					<b>{content}</b>
				</p>
			) : (
				<p className="tracking-widest">{content}</p>
			)}
		</div>
	);
};

export default DetailsColumn;
