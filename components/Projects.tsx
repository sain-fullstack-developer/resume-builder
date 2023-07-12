import React from "react";
import Heading from "../elements/Heading";
import DetailsColumn from "../elements/DetailsColumn";

interface ProjectsProps {
	data: any[];
	color?: string;
	level: number;
	headClass?: string;
	underline?: boolean;
}

function Projects({ data, color, level, headClass, underline }: ProjectsProps) {
	return (
		<div>
			<Heading
				underline={underline}
				level={level}
				text="Projects"
				className={headClass}
			/>
			{data?.map((project, index) => {
				return (
					<div className="r-sec-project-details" key={index}>
						<DetailsColumn
							sideHeading="Project Name"
							content={project.projectName}
							contentBold
							color={color}
						/>
						<DetailsColumn
							sideHeading="Project Link"
							content={
								<a href={project.projectUrl} target="_blank" rel="noreferrer">
									{project.projectUrl}
								</a>
							}
							color={color}
						/>
						<DetailsColumn
							sideHeading="Project Details"
							content={project.details}
							color={color}
						/>
					</div>
				);
			})}
		</div>
	);
}

export default Projects;
