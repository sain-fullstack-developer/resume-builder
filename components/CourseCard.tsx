import Image from "next/image";
import React from "react";

interface CourseCardProps {
	courseName: string;
	courseBy: string;
	platform: string;
	src: string;
	alt: string;
}

const CourseCard: React.FC<CourseCardProps> = ({
	courseName,
	courseBy,
	platform,
	src,
	alt,
}) => {
	return (
		<div className="relative shadow-lg w-full bg-transperentPrimary rounded-xl p-4 hover:scale-105 cursor-pointer transition-all text-white">
			<img className="rounded-xl my-2" src={src} alt={alt} />
			<div className="rounded-xl my-2 text-lg font-semibold flex gap-2 capitalize">
				<p>CourseName:</p>
				<p>{courseName}</p>
			</div>
			<div className="rounded-xl my-2 text-lg font-semibold flex gap-2 capitalize">
				<p>Instructor: </p>
				<p>{courseBy}</p>
			</div>
			<div className="rounded-xl my-2 text-lg font-base flex gap-2 capitalize">
				<p>Platform: </p>
				<p>{platform}</p>
			</div>
			<div className="w-10 h-10 rounded-full bg-transperentPrimary absolute bottom-2 right-2 grid place-items-center hover:bg-transperentBlack">
				<div className="bg-none border-2 border-white w-3 h-3 border-r-0 border-t-0 rotate-arrowRight animate-pulse"></div>
			</div>
		</div>
	);
};

export default CourseCard;
