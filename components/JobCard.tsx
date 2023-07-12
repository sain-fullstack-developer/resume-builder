import React from "react";
import { formatDate, staticImagesPath } from "../utils/utilFunctions";

interface JobCardProps {
	title: string;
	text: string;
	imageAlt: string;
	imageSrc: string;
	companyName: string;
	location: string;
	postedOn: string;
	category: string;
	hiddenShow?: boolean;
}

const JobCard: React.FC<JobCardProps> = ({
	title,
	text,
	imageAlt,
	imageSrc,
	companyName,
	location,
	postedOn,
	category,
	hiddenShow,
}) => {
	const [isShow, setIsShow] = React.useState(false);
	return (
		<div className="text-white w-full h-full bg-transperentBlack rounded-xl p-4 py-8 relative">
			<div className="flex justify-center items-center mb-1 rounded-full bg-primary-100 dark:bg-primary-900">
				<img
					className="w-full h-full rounded-2xl"
					src={imageSrc}
					alt={imageAlt}
				/>
			</div>
			<h1 className="mb-1 text-lg font-semibold">Position: {title}</h1>
			<h3 className="mb-1 text-lg">
				Location: <span className="text-base">{location}</span>
			</h3>
			<div className="absolute bottom-1 grid place-items-center left-40 animate-pulse text-2xl bg-transperentPrimary hover:bg-none h-8 w-8 rounded-full">
				<img
					onClick={() => setIsShow(!isShow)}
					className={`w-4 h-4 cursor-pointer animate-pulse ${
						isShow ? "rotate-180" : "rotate-0"
					}`}
					src={staticImagesPath("down-arrow.png")}
					alt="down-arrow"
				/>
			</div>
			<div className={isShow ? "block" : "hidden"}>
				<h3 className="mb-1 text-lg">
					Company Name: <span className="text-base">{companyName}</span>
				</h3>
				<h3 className="mb-1 text-lg">
					PostedOn:
					<span className="text-base">{formatDate(new Date(postedOn))}</span>
				</h3>
				<h3 className="mb-1 text-lg">
					Category: <span className="text-base">{category}</span>
				</h3>
				<p className="text-lg line-clamp-4 break-words">
					Job Decription: <span className="text-base">{text}</span>
				</p>
			</div>
		</div>
	);
};

export default JobCard;
