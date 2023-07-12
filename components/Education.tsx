import React from "react";
import DetailsColumn from "../elements/DetailsColumn";
import Heading from "../elements/Heading";
import { apiDataTypes } from "../utils/typeInterfaces";

interface EducationProps {
	data: apiDataTypes;
	classContainer?: string;
	color?: string;
	headClass?: string;
	level: number;
	underline?: boolean;
}

function Education({
	data,
	classContainer,
	color,
	headClass,
	level,
	underline,
}: EducationProps) {
	return (
		<div className={`${classContainer}`}>
			<Heading
				underline={underline}
				level={level}
				text="Education"
				className={headClass}
			/>
			{data?.inputSets?.map((list, i) => {
				return (
					<div key={i} className="my-4 mr-0">
						<DetailsColumn
							sideHeading="Studied In"
							content={list.details}
							color={color}
						/>
						<DetailsColumn
							sideHeading="Year Of Passing"
							content={list.year}
							color={color}
						/>
						<DetailsColumn
							sideHeading="Percentage Scored"
							content={list.percentage ? `${list.percentage}%` : ""}
							color={color}
						/>
					</div>
				);
			})}
		</div>
	);
}

export default Education;
