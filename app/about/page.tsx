"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ToggleMode from "@/components/ToggleMode";
import React from "react";

function AboutPage() {
	const [onDarkMode, setOnDarkMode] = React.useState(false);

	const handleDarkToggle = () => {
		setOnDarkMode(!onDarkMode);
	};
	return (
		<div className="relative">
			<ToggleMode
				positionClass="top-24"
				isDarkMode={onDarkMode}
				handleDarkMode={handleDarkToggle}
			/>
			<Header onDarkMode={onDarkMode} />
			<main
				className={`py-5 px-14 text-white ${
					!onDarkMode ? "bg-primary" : "bg-black"
				}  min-h-screen`}>
				<h1 className="text-2xl mb-10">
					Welcome to our Resume Builder Application, built with React!
				</h1>
				<p className="text-xl leading-tight mb-10">
					Sainath Kommagoni's Resume Builder Application is a powerful and
					user-friendly tool that allows users to quickly and easily create
					professional-quality resumes. The application is built using the React
					framework and offers a range of customizable templates to choose from,
					ensuring that users can create a resume that fits their unique style
					and preferences.
				</p>
				<p className="text-xl leading-tight mb-10">
					Users can fill in their personal information, work experience,
					education, skills, and other relevant details, and the application
					automatically formats and structures the data to create a polished and
					professional-looking resume. The Resume Builder Application also
					includes helpful tips and suggestions for each section, ensuring that
					users highlight their strengths and achievements in the best possible
					way.
				</p>
				<p className="text-xl leading-tight mb-10">
					One of the key features of the application is its ability to generate
					a downloadable PDF of the user's resume, making it easy to share with
					potential employers or clients. This feature ensures that users have a
					high-quality, professional-looking resume in a format that is widely
					accepted and easy to use.
				</p>
				<p className="text-xl leading-tight mb-10">
					Whether you're a recent graduate, a seasoned professional, or anywhere
					in between, the Resume Builder Application is a valuable tool for
					anyone looking to create a standout resume. With its customizable
					templates, user-friendly interface, and powerful features, this
					application streamlines the process of creating a polished and
					professional resume, helping users to stand out from the crowd and
					achieve their career goals.
				</p>
				<p className="text-xl leading-tight mb-10">
					Thank you for choosing Resume Builder Application. We are confident
					that our platform will help you stand out from the crowd and land the
					job of your dreams.
				</p>
			</main>
			<Footer onDarkMode={onDarkMode} />
		</div>
	);
}

export default AboutPage;
