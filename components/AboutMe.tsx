import React from "react";
import Heading from "../elements/Heading";
import DetailsColumn from "../elements/DetailsColumn";
import { apiDataTypes } from "../utils/typeInterfaces";

interface AboutMeProps {
	data: apiDataTypes;
	color?: string;
	headClass?: string;
	level: number;
	title?: string;
	underline?: boolean;
}

const AboutMe: React.FC<AboutMeProps> = ({
	data,
	color,
	headClass,
	level,
	title,
	underline,
}) => {
	return (
		<div>
			<Heading
				underline={underline}
				level={level}
				text={title}
				className={headClass}
			/>
			<div className="mt-8">
				<DetailsColumn color={color} sideHeading="DOB " content={data?.dob} />
				<DetailsColumn color={color} sideHeading="AGE " content={data?.age} />
				<DetailsColumn
					color={color}
					sideHeading="Gender"
					content={data?.gender}
				/>
				<DetailsColumn color={color} sideHeading="BOP " content={data?.bop} />
			</div>
		</div>
	);
};

export default AboutMe;
