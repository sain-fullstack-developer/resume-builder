import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, TemplatesProps } from "./Template0";
import Objective from "@/components/Objective";
import Education from "@/components/Education";
import Heading from "@/elements/Heading";
import ContactBlock from "@/components/ContactBlock";
import Experience from "@/components/Experience";
import Activities from "@/components/Activities";

import Skills from "@/components/Skills";
import { fetchFormApiData } from "@/store/Store";

function Template1({ resumeRef, fillModeData, fillImage }: TemplatesProps) {
	const dispatch = useDispatch();
	const apiData = useSelector((state: RootState) => state?.apiData?.data);
	const userId = useSelector((state: any) => state?.userId?.value);
	// const loadingAndError = useSelector((state: LoadingState) => state.apiData);

	console.log("object", apiData);

	const imageUrl = fillModeData ? fillImage : apiData?.fileData?.imageUrl;

	useEffect(() => {
		dispatch(fetchFormApiData(userId) as any);
	}, [dispatch, userId]);

	const skills = fillModeData ? fillModeData?.skills : apiData.skills;
	const techSkills = fillModeData
		? fillModeData?.techSkills
		: apiData.techSkills;
	const interests = fillModeData ? fillModeData?.interests : apiData.interests;
	const experience = fillModeData
		? fillModeData?.experience
		: apiData.experience;
	const education = fillModeData ? fillModeData?.inputSets : apiData.inputSets;
	const expertise = fillModeData ? fillModeData?.expertise : apiData.expertise;
	const projects = fillModeData ? fillModeData?.projects : apiData.projects;
	const hobbies = fillModeData ? fillModeData?.hobbies : apiData.hobbies;

	return (
		<>
			<div ref={resumeRef} className="">
				<div className="grid relative place-items-center z-0 w-full bg-primary p-16">
					<div className="w-full h-40 grid place-items-center">
						<img
							src="avatar.png"
							alt="profile-pic"
							className="h-40 w-40 rounded-full z-1 -mb-20"
						/>
					</div>
					<div className="text-white uppercase grid place-items-center z-10">
						<h1 className="text-6xl font-light tracking-widest">
							{fillModeData ? fillModeData?.fullName : apiData?.fullName}
						</h1>
						<p className="tracking-widest mt-4">
							{fillModeData ? fillModeData?.designation : apiData?.designation}
						</p>
					</div>
				</div>

				<div className="grid grid-cols-2 gap-x-16 px-16 py-8 bg-white">
					<div>
						<Objective
							level={2}
							headingClass="mb-6 uppercase relative"
							title="Profile"
							data={fillModeData ? fillModeData : apiData}
						/>
					</div>
					<div className="mb-5">
						<Education
							underline
							level={2}
							headClass="mb-6 uppercase relative"
							data={fillModeData ? fillModeData : apiData}
						/>
					</div>
					<div className="text-black">
						<Heading
							level={2}
							underline
							className="mb-6 uppercase relative"
							text="contact"
						/>
						<ContactBlock data={fillModeData ? fillModeData : apiData} />
					</div>
					<div>
						<Experience
							underline
							level={2}
							headClass="mb-6 uppercase relative"
							data={fillModeData ? fillModeData : apiData}
						/>
					</div>

					<section>
						<Activities
							level={2}
							underline
							headClass="mb-6 uppercase relative"
							hobbies={hobbies}
							textColor="var(--black)"
							headBlock="relative  mb-2.5 list-none"
						/>
					</section>
					<section>
						<Skills
							title="Skills"
							underline
							data={skills}
							bullets
							filledBullets="bg-blue-600 h-4 w-4 rounded-full ml-2 list-none"
							emptyBullets="bg-blue-200 h-4 w-4 rounded-full ml-2 list-none"
							level={2}
							headClass="mb-6 uppercase relative"
						/>
					</section>
				</div>
			</div>
		</>
	);
}

export default Template1;
