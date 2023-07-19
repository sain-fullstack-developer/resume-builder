"use client";
// import CourseCard from "@/components/CourseCard";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ToggleMode from "@/components/ToggleMode";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import JobCard from "@/components/JobCard";

export default function Home() {
	const [onDarkMode, setOnDarkMode] = useState(false);
	const [data, setData] = useState<any[] | undefined>([]);
	// const [courseData, setCourseData] = useState<any>();

	const handleDarkToggle = () => {
		setOnDarkMode(!onDarkMode);
	};

	useEffect(() => {
		async function jobDataFetch() {
			const response = await axios.get(
				"http://api.adzuna.com/v1/api/jobs/in/search/1?app_id=50de75e6&app_key=a862edf0013e2afca771317622b66cda&results_per_page=20&what=javascript%20developer&content-type=application/json"
			);
			console.log("response", response.data);
			return setData(response.data.results.slice(0, 8));
		}

		jobDataFetch();
	}, []);

	return (
		<main className="min-h-screen">
			<div className="relative">
				<ToggleMode
					positionClass="top-24"
					isDarkMode={onDarkMode}
					handleDarkMode={handleDarkToggle}
				/>
				<Header onDarkMode={onDarkMode} />

				<main
					className={`grid px-12 py-6 ${
						onDarkMode ? "bg-black" : "bg-primary"
					}`}>
					<section className="my-6">
						<div className="grid  px-4 mx-auto max-w-screen-xl lg:gap-8 xl:gap-0 lg:grid-cols-12">
							<div className="place-self-center mr-auto lg:col-span-7">
								<h1 className="mb-4 max-w-2xl text-4xl font-black tracking-widest md:text-5xl xl:text-6xl dark:text-white">
									Create Your Professional Resume Effortlessly in Minutes
								</h1>
								<p className="mb-6 max-w-2xl font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
									Select a template to create your professional resume
								</p>
								<Link
									href="/template"
									className="inline-flex justify-center items-center py-3 px-5 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
									Get started
									<svg
										className="ml-2 -mr-1 w-5 h-5"
										fill="currentColor"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg">
										<path
											fill-rule="evenodd"
											d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
											clip-rule="evenodd"></path>
									</svg>
								</Link>
							</div>
							<div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
								<Image
									width={500}
									height={100}
									src="/character.png"
									alt="mockup"
								/>
							</div>
						</div>
					</section>

					<section className="my-6">
						<div className=" px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
							<div className="mb-8 max-w-screen-md lg:mb-16">
								<h2 className="mb-4 text-4xl font-semibold text-gray-900 dark:text-white">
									Designed for professionals like you
								</h2>
								<p className="text-gray-500 sm:text-xl dark:text-gray-400">
									Free Resume builder application is designed to help job
									seekers create a professional-looking resume quickly and
									easily and select from a variety of templates, customize
									resume with your own information and download it.
								</p>
							</div>
							<div className="md:grid md:grid-cols-2 lg:grid-cols-3 sm:gap-4">
								{data &&
									data !== undefined &&
									data.length > 0 &&
									data.map((list: any, index: any) => {
										return (
											<JobCard
												key={index}
												imageAlt="jobposting"
												imageSrc="/ad-1.jpg"
												title={list.title}
												text={list.description}
												companyName={list.company.display_name}
												location={list.location.display_name}
												postedOn={list.created}
												category={list.category.label}
												redirect_url={list.redirect_url}
											/>
										);
									}, [])}
							</div>
						</div>
					</section>

					<section className="my-6">
						<div className="gap-16 items-center  px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
							<div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
								<h2 className="mb-4 text-4xl font-semibold text-gray-900 dark:text-white">
									Find Your Dream Job with our Resume Builder and Job Search API
								</h2>
								<p className="mb-4">
									Our resume builder application helps students and job seekers
									to create a professional resume that stands out from the
									crowd. With our easy-to-use interface and customizable
									templates, you can create a resume in just a few clicks.
									Additionally, we have integrated a free job search API into
									our application, which allows you to search for job listings
									from various sources in one place. With the power of our job
									search API, you can easily find and apply for jobs that match
									your skills and experience. Start building your professional
									resume today and take the first step towards landing your
									dream job!
								</p>
								<p>
									We are strategists, designers and developers. Innovators and
									problem solvers. Small enough to be simple and quick.
								</p>
							</div>
							<div className="grid grid-cols-2 gap-4 mt-8">
								<Image
									width={100}
									height={100}
									className="w-full rounded-lg"
									src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png"
									alt="office content 1"
								/>
								<Image
									width={100}
									height={100}
									className="mt-4 w-full rounded-lg lg:mt-10"
									src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png"
									alt="office content 2"
								/>
							</div>
						</div>
					</section>
				</main>
				<Footer onDarkMode={onDarkMode} />
			</div>
		</main>
	);
}
