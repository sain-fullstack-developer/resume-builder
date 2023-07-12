import React from "react";
import DetailsColumn from "../elements/DetailsColumn";
import { formatDate } from "../utils/utilFunctions";
import Heading from "../elements/Heading";
import { apiDataTypes } from "../utils/typeInterfaces";

interface ExperienceProps {
	data: apiDataTypes;
	classContainer?: string;
	classMapBlock?: string;
	headClass?: string;
	level: number;
	colorText?: string;
	underline?: boolean;
}

const Experience: React.FC<ExperienceProps> = ({
	data,
	classContainer,
	classMapBlock,
	headClass,
	level,
	colorText,
	underline,
}) => {
	return (
		<div className={`${classContainer}`}>
			<Heading
				underline={underline}
				level={level}
				text="experience"
				className={headClass}
			/>
			{data?.experience?.map((exp, index) => {
				return (
					<div className={`${classMapBlock}`} key={index}>
						<DetailsColumn
							contentBold
							sideHeading="Position"
							content={exp?.designation}
							color={colorText}
						/>
						<DetailsColumn
							sideHeading="Company Name"
							content={exp?.companyName}
							color={colorText}
						/>
						<DetailsColumn
							sideHeading="Time Period"
							content={
								exp.startYear
									? `${exp.startYear ? formatDate(exp.startYear) : ""} To ${
											exp.endYear ? formatDate(exp.endYear) : ""
									  }`
									: ""
							}
							color={colorText}
						/>
						<DetailsColumn
							sideHeading="Description"
							content={exp.details}
							color={colorText}
						/>
					</div>
				);
			})}
		</div>
	);
};

export default Experience;
