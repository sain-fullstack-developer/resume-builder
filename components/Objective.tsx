import React from "react";
import Heading from "../elements/Heading";
import { apiDataTypes } from "../utils/typeInterfaces";

interface ObjectiveProps {
	data: apiDataTypes;
	title: string;
	classContainer?: string;
	headingClass?: string;
	level: number;
	textClass?: string;
}

function Objective({
	data,
	title,
	classContainer,
	headingClass,
	level,
	textClass,
}: ObjectiveProps) {
	return (
		<div className={`${classContainer}`}>
			<Heading underline level={level} text={title} className={headingClass} />
			<p className={`tracking-widest ${textClass}`}>{data.objective}</p>
		</div>
	);
}

export default Objective;
