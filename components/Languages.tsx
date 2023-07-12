import React from "react";
import BarRating from "./BarRating";
import Heading from "../elements/Heading";

interface LanguagesProps {
	data: any[];
	title: string;
	level: number;
	headClass?: string;
	mapClass?: string;
	color?: string;
	barBg?: string;
	barborderColor?: string;
}

function Languages({
	data,
	title,
	level,
	headClass,
	mapClass,
	color,
	barBg,
	barborderColor,
}: LanguagesProps) {
	return (
		<div>
			<Heading text={title} className={headClass} level={level} />
			{data.map((list, index) => {
				return (
					<>
						<div key={index} className={`mb-8 ${mapClass}`}>
							<p
								className="mb-2 uppercase tracking-widest"
								style={{ color: color }}>
								{list.language}
							</p>
							<BarRating
								borderColor={barborderColor}
								bgColor={barBg}
								value={list.rating}
							/>
						</div>
					</>
				);
			})}
		</div>
	);
}

export default Languages;
