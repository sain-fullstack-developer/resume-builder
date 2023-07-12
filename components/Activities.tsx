import React from "react";
import Heading from "../elements/Heading";

interface ActivitiesProps {
	hobbies?: any[];
	interests?: any[];
	level: number;
	headClass?: string;
	defaultTemp?: boolean;
	textColor?: string;
	headBlock?: string;
	underline?: boolean;
}

function Activities({
	hobbies,
	interests,
	level,
	headClass,
	defaultTemp,
	headBlock,
	underline,
}: ActivitiesProps) {
	return (
		<div>
			{hobbies ? (
				<>
					<Heading
						level={level}
						text="hobbies"
						underline={underline}
						className={
							defaultTemp
								? `r1-h3tag before:bg-white text-white m-auto ${headClass}`
								: headClass
						}
					/>
					<div className={`r-col-sec-hobbies-block ${headBlock}`}>
						<ul>
							{hobbies?.map((hobby, i) => (
								<li key={i}>{hobby.hobbie}</li>
							))}
						</ul>
					</div>
				</>
			) : interests ? (
				<>
					<Heading
						level={level}
						underline={underline}
						text="interests"
						className={
							defaultTemp
								? `before:bg-white text-white m-auto ${headClass}`
								: headClass
						}
					/>
					<div className="r-col-sec-hobbies-block">
						<ul>
							{interests?.map((list, i) => (
								<li key={i}>{list.interest}</li>
							))}
						</ul>
					</div>
				</>
			) : (
				""
			)}
		</div>
	);
}

export default Activities;
