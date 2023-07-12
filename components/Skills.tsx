import React from "react";
import CircleRating from "./CirclePercentage";
import { getBulletPoints } from "../utils/utilFunctions";
import Heading from "../elements/Heading";

interface SkillsProps {
	data: any[];
	classContainer?: string;
	classMap?: string;
	circle?: boolean;
	bullets?: boolean;
	filledBullets?: string;
	emptyBullets?: string;
	title: string;
	headClass?: string;
	level: number;
	underline?: boolean;
}

function Skills({
	data,
	classContainer,
	classMap,
	circle,
	bullets,
	filledBullets,
	emptyBullets,
	title,
	headClass,
	level,
	underline,
}: SkillsProps) {
	return (
		<div className={`${classContainer}`}>
			<Heading
				underline={underline}
				text={title}
				level={level}
				className={headClass}
			/>
			<div
				className={
					circle ? `grid grid-cols-3 gap-6` : `skills-content-bullets`
				}>
				{data?.map((list, index) => (
					<div
						key={index}
						className={
							bullets
								? `flex justify-between mb-4 ${classMap}`
								: `mb-8 ${classMap}`
						}>
						{circle && <CircleRating value={list.rating} />}
						<p>{list.title}</p>
						{bullets && (
							<ul className="flex">
								{getBulletPoints(
									list.rating,
									`h-3 w-3 rounded-full mr-3 ${
										index === 4 && "mr-0"
									} ${filledBullets}`,
									`h-3 w-3 rounded-full mr-3 ${emptyBullets}`
								)}
							</ul>
						)}
					</div>
				))}
			</div>
		</div>
	);
}

export default Skills;
