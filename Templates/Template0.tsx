import AboutMe from "@/components/AboutMe";
import Activities from "@/components/Activities";
import ContactBlock from "@/components/ContactBlock";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Objective from "@/components/Objective";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Heading from "@/elements/Heading";
import { fetchFormApiData } from "@/store/Store";
import { apiDataTypes } from "@/utils/typeInterfaces";
import Image from "next/image";
import React, { MutableRefObject, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export interface TemplatesProps {
	resumeRef: MutableRefObject<any>;
	fillModeData: apiDataTypes;
	fillImage: string;
}

export interface RootState {
	userId: any;
	apiData: { data: apiDataTypes };
}
export interface LoadingState {
	apiData: { loading: boolean; error: string | null };
}

const TemplateDefault: React.FC<TemplatesProps> = ({
	resumeRef,
	fillModeData,
	fillImage,
}) => {
	const dispatch = useDispatch();
	const userId = useSelector((state: any) => state.userId.value);
	const reduxData = useSelector((state: RootState) => state?.apiData?.data);
	// const loadingAndError = useSelector((state: LoadingState) => state.apiData);

	const imageUrl = fillModeData ? fillImage : reduxData?.fileData?.imageUrl;

	console.log(imageUrl);

	const result = fillModeData ? fillModeData : reduxData;

	useEffect(() => {
		dispatch(fetchFormApiData(userId) as any);
	}, [dispatch, userId]);

	const skills = fillModeData ? result.skills : result.skills;
	const techSkills = fillModeData ? result.techSkills : result.techSkills;
	const interests = fillModeData ? result.interests : result.interests;
	const experience = fillModeData ? result : result;
	const education = fillModeData ? result : result;
	const expertise = fillModeData ? result.expertise : result.expertise;
	const projects = fillModeData ? result.projects : result.projects;
	const hobbies = fillModeData ? result.hobbies : result.hobbies;

	return (
		<>
			<div className="relative">
				<div id="container" ref={resumeRef} className="flex rounded-r-3xl">
					<div className="px-5 bg-primary grid grid-rows-4 gap-2 text-white justify-center">
						<Image
							width={400}
							height={400}
							className="w-64 h-64 m-auto rounded-full text-white"
							src={imageUrl ? imageUrl : "/avatar.png"}
							alt="professional profile"
						/>
						<section>
							<AboutMe
								color="var(--white)"
								level={3}
								title="About Me"
								headClass="relative m-auto"
								data={result}
								underline
							/>
						</section>
						<section>
							<Heading
								underline
								level={3}
								text="Contact"
								className="relative"
							/>
							<ContactBlock data={fillModeData ? result : result} color />
						</section>
						{interests && (
							<section className="">
								<Activities
									level={3}
									underline
									headClass="text-white"
									interests={interests}
									textColor="var(--white)"
									defaultTemp
								/>
							</section>
						)}
						{hobbies && (
							<section>
								<Activities
									level={3}
									underline
									headClass="text-white"
									hobbies={hobbies}
									textColor="var(--white)"
									defaultTemp
								/>
							</section>
						)}
					</div>
					<div className="bg-white py-16 px-5 text-primaryTemp">
						<h1 className="text-8xl font-normal uppercase mt-4 text-gray-700">
							{fillModeData ? result?.fullName : result?.fullName}
						</h1>
						<div className="grid text-sm font-bold mb-6 text-gray-700 uppercase">
							<div>
								{fillModeData ? result?.designation : result?.designation}
							</div>
							<div className="bg-gray-800 w-full h-2 m-auto text-gray-700"></div>
						</div>
						<section className="mb-4">
							<Objective
								headingClass="relative"
								textClass="text-black"
								title="Career Objective"
								level={2}
								data={fillModeData ? result : result}
							/>
						</section>
						<section>
							<Education
								color=""
								data={education}
								underline
								level={2}
								headClass="relative text-gray-700"
							/>
						</section>
						{techSkills && (
							<section>
								<Heading
									level={2}
									underline
									text="TECHNICAL PROFICIENCIES"
									className="relative text-gray-700"
								/>
								<p className="text-5 text-gray-700 mb-5 font-medium tracking-widest">
									{techSkills?.join(", ")}
								</p>
							</section>
						)}
						<section>
							<Experience
								colorText="text-black"
								data={experience}
								level={2}
								underline
								headClass="relative text-gray-700"
							/>
						</section>
						<section>
							<Projects
								level={2}
								underline
								headClass="relative text-gray-700"
								data={projects}
								color="var(--temp0-text-primary)"
							/>
						</section>
						<section className="mb-4">
							<Skills
								bullets
								emptyBullets="bg-gray-200 border-black border-2"
								filledBullets="bg-black"
								data={expertise}
								title="Expertise"
								classMap="text-gray-700 r-expertise-ul"
								level={2}
								underline
								headClass="text-white"
							/>
						</section>
						<section>
							<Skills
								bullets
								emptyBullets="bg-gray-200 border-black border-2"
								filledBullets="bg-black"
								data={skills}
								title="Skills"
								classMap="text-gray-700 r-skills-ul"
								level={2}
								underline
								headClass="text-white"
							/>
						</section>
					</div>
				</div>
			</div>
		</>
	);
};

export default TemplateDefault;
