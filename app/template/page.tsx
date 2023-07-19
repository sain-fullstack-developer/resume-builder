"use client";
import React from "react";
import ToggleMode from "../../components/ToggleMode";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Link from "next/link";
import Image from "next/image";

const SelectTemplate = () => {
	const [onDarkMode, setOnDarkMode] = React.useState(false);
	const templatesList = [
		"/resume-1.png",
		"/resume-2.png",
		"/resume-3.png",
		"/resume-4.png",
		"/resume-5.png",
	];

	const handleDarkToggle = () => {
		setOnDarkMode(!onDarkMode);
	};

	return (
		<>
			<Header onDarkMode={onDarkMode} />
			<main
				className={`${
					!onDarkMode ? "bg-primary" : "bg-black"
				}  p-6 md:p-14 md:px-20 relative`}>
				<ToggleMode isDarkMode={onDarkMode} handleDarkMode={handleDarkToggle} />
				<h1 className="text-2xl sm:text-3xl text-white font-semibold mb-8 text-center uppercase tracking-widest">
					Select Resume Template
				</h1>
				<div className="grid grid-cols-1 gap-2 md:gap-4 lg:gap-14 md:grid-cols-2 lg:grid-cols-3 place-items-center">
					{templatesList.map((list, index) => (
						<Link
							className="w-full h-full p-6 bg-transperentPrimary shadow-xl rounded-2xl"
							key={index}
							href={
								index === 0 || index === 1
									? `/form/${index}`
									: `/page-not-found`
							}>
							<Image
								width={400}
								height={400}
								className="w-full h-full hover:scale-105 transition-all rounded-xl shadow-2xl"
								src={list}
								alt={`template-${index}`}
							/>
						</Link>
					))}
				</div>
			</main>
			<Footer onDarkMode={onDarkMode} />
		</>
	);
};

export default SelectTemplate;
