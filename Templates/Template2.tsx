import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { LoadingState, RootState, TemplatesProps } from "./Template0";

import Objective from "@/components/Objective";
import Education from "@/components/Education";
import Activities from "@/components/Activities";
import Experience from "@/components/Experience";
import Heading from "@/elements/Heading";
import ContactBlock from "@/components/ContactBlock";
import Skills from "@/components/Skills";
import { fetchFormApiData } from "@/store/Store";

function Template2({ resumeRef, fillModeData }: TemplatesProps) {
	const dispatch = useDispatch();
	const apiData = useSelector((state: RootState) => state.apiData.data);
	const userId = useSelector((state: any) => state?.userId?.value);
	const loadingAndError = useSelector((state: LoadingState) => state.apiData);
	const imageUrl = apiData?.fileData?.imageUrl;

	useEffect(() => {
		dispatch(fetchFormApiData(userId) as any);
	}, [dispatch, userId]);

	const skills = fillModeData ? fillModeData?.skills : apiData?.skills;
	const techSkills = fillModeData
		? fillModeData?.techSkills
		: apiData?.techSkills;
	const interests = fillModeData ? fillModeData?.interests : apiData?.interests;
	const experience = fillModeData
		? fillModeData?.experience
		: apiData?.experience;
	const education = fillModeData ? fillModeData?.inputSets : apiData?.inputSets;
	const expertise = fillModeData ? fillModeData?.expertise : apiData?.expertise;
	const hobbies = fillModeData ? fillModeData?.hobbies : apiData?.hobbies;
	const projects = fillModeData ? fillModeData?.projects : apiData?.projects;

	// if (
	// 	!skills ||
	// 	!interests ||
	// 	!experience ||
	// 	!education ||
	// 	!techSkills ||
	// 	!expertise ||
	// 	!projects
	// ) {
	// 	return <p>Loading ....</p>;
	// }

	// if (loadingAndError.loading) {
	// 	return <Loading />;
	// }

	// if (loadingAndError.error) {
	// 	return <p>Error: {loadingAndError.error}</p>;
	// }

	return (
		<>
			<div
				ref={resumeRef}
				className="bg-primary min-h-screen relative pb-16 px-16">
				<section className="flex justify-center px-8 py-8">
					<div className="w-48 h-48 bg-gray-400 rounded-b-[6rem] grid place-items-center">
						<img
							src={imageUrl ? imageUrl : "/avatar.png"}
							alt="profile-pic"
							className="h-44 w-44 rounded-full mt-14"
						/>
					</div>
					<div className="uppercase text-white mt-12">
						<h1 className="text-6xl font-medium">
							{fillModeData ? fillModeData?.fullName : apiData?.fullName}
						</h1>
						<h3 className="text-3xl font-normal">
							{fillModeData ? fillModeData?.designation : apiData?.designation}
						</h3>
					</div>
				</section>

				<section className="flex mb-5">
					<div className="text-white pt-4">
						<Objective
							level={2}
							headingClass="text-center text-white mb-5 uppercase"
							data={fillModeData ? fillModeData : apiData}
							title="PROFILE"
						/>
					</div>
					<div className="grid place-items-center">
						<img src="/mortarboard.png" alt="Qualification-Icon" />
						<div></div>
					</div>
					<div className="r5-second-block-col-3">
						<Education
							level={2}
							headClass="text-white bg-white text-white w-1/2 py-2.5 pr-4 pl-2.5 mb-5 uppercase"
							color="white"
							data={fillModeData ? fillModeData : apiData}
						/>
					</div>
				</section>
				<div className="bg-white h-0.5 w-1/3"></div>
				<section className="grid grid-cols-3 mb-5 col-span-5">
					<div className="r5-second-block-col-1">
						<Activities
							headClass="text-white r5-heading-col-1"
							level={2}
							hobbies={hobbies}
							textColor="var(--white)"
						/>
					</div>
					<div className="r5-second-block-col-2 col-span-1">
						<img src="mortarboard.png" alt="Qualification-Icon" />
						<div className="h-80 w-0.5 bg-white mt-5"></div>
					</div>
					<div className="r5-second-block-col-3 col-span-6">
						<Experience
							colorText="var(--white)"
							level={2}
							headClass="text-white bg-white w-1/2 py-2.5 pr-4 pl-2.5 mb-5 uppercase"
							data={fillModeData ? fillModeData : apiData}
						/>
					</div>
				</section>
				<div className="bg-white h-0.5 w-1/3"></div>
				<section className="grid grid-col-temp2Two mb-5 sections-r5">
					<div className="text-white pt-4">
						<Heading level={2} className="r5-heading-col-1" text="Contact" />
						<ContactBlock color data={fillModeData ? fillModeData : apiData} />
					</div>
					<div className="grid place-items-center">
						<img src="settings.png" alt="Settings-Icon" />
						<div></div>
					</div>
					<div className="r5-forth-block-col-3">
						<Skills
							title="Skills"
							data={skills}
							level={2}
							headClass="text-white bg-white w-1/2 py-2.5 pr-4 pl-2.5 mb-5 uppercase"
							classMap="text-white"
							bullets
							emptyBullets="r5-bullet-null"
							filledBullets="bg-white"
						/>
					</div>
				</section>
			</div>
		</>
	);
}

export default Template2;
