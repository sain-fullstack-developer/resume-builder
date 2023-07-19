import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { LoadingState, RootState, TemplatesProps } from "./Template0";
import { fetchFormApiData } from "@/store/Store";
import Loading from "@/components/Loading";
import Image from "next/image";
import { staticImagesPath } from "@/utils/utilFunctions";
import Objective from "@/components/Objective";
import Education from "@/components/Education";
import Heading from "@/elements/Heading";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import AboutMe from "@/components/AboutMe";
import ContactBlock from "@/components/ContactBlock";
import Activities from "@/components/Activities";

function Template4({ resumeRef, fillModeData }: TemplatesProps) {
	const dispatch = useDispatch();
	const result = useSelector((state: RootState) => state.apiData.data);
	const loadingAndError = useSelector((state: LoadingState) => state.apiData);
	const imageUrl = result?.fileData?.imageUrl;

	useEffect(() => {
		dispatch(fetchFormApiData() as any);
	}, [dispatch]);

	const skills = fillModeData ? fillModeData?.skills : result?.skills;
	const techSkills = fillModeData
		? fillModeData?.techSkills
		: result?.techSkills;
	const interests = fillModeData ? fillModeData?.interests : result?.interests;
	const experience = fillModeData
		? fillModeData?.experience
		: result?.experience;
	const education = fillModeData ? fillModeData?.inputSets : result?.inputSets;
	const expertise = fillModeData ? fillModeData?.expertise : result?.expertise;
	const hobbies = fillModeData ? fillModeData?.hobbies : result?.hobbies;
	const projects = fillModeData ? fillModeData?.projects : result?.projects;

	if (
		!skills ||
		!interests ||
		!experience ||
		!education ||
		!techSkills ||
		!expertise ||
		!projects
	) {
		return <p>Loading ....</p>;
	}

	if (loadingAndError.loading) {
		return <Loading />;
	}

	if (loadingAndError.error) {
		return <p>Error: {loadingAndError.error}</p>;
	}

	return (
		<>
			<div>
				<div
					id="container"
					ref={resumeRef}
					className="grid grid-cols-1 border-gray-300 rounded-r-xl">
					<section className="grid grid-cols-1 bg-blue-700 p-12 border-b-2 border-white text-center">
						<img
							src={imageUrl ? imageUrl : staticImagesPath("avatar.png")}
							alt="profile"
						/>
						<h1>
							{fillModeData ? fillModeData?.fullName : result?.fullName}
							<span>
								<div>
									{fillModeData
										? fillModeData?.designation
										: result?.designation}
								</div>
							</span>
						</h1>
					</section>
					<div>
						<div>
							<section>
								<Objective
									level={2}
									headingClass="text-tempPrimary mt-10 mb-5 relative w-max uppercase"
									data={fillModeData ? fillModeData : result}
									title="PROFILE"
								/>
							</section>
							<section>
								<Education
									level={2}
									headClass="text-tempPrimary mt-10 mb-5 relattive"
									data={fillModeData ? fillModeData : result}
								/>
							</section>
							<section>
								<Heading
									className="text-tempPrimary mt-10 mb-5 relattive"
									text="Technical Skills"
									level={2}
								/>

								<p
									className="text-xl text-black mb-5 font-medium"
									style={{ letterSpacing: "0.1em" }}>
									{techSkills?.join(", ")}
								</p>
							</section>
							<section>
								<Experience
									level={2}
									headClass="text-tempPrimary mt-10 mb-5 relattive"
									data={fillModeData ? fillModeData : result}
								/>
							</section>
							<section>
								<Projects
									level={2}
									headClass="text-tempPrimary mt-10 mb-5 relattive"
									data={projects}
								/>
							</section>
							<section>
								<Skills
									headClass="text-tempPrimary mt-10 mb-5 relattive"
									data={expertise}
									title="Expertise"
									level={2}
									bullets
									filledBullets=""
									emptyBullets=""
								/>
							</section>
							<section>
								<Skills
									headClass="text-tempPrimary mt-10 mb-5 relattive"
									data={skills}
									title="Skills"
									level={2}
									bullets
									filledBullets=""
									emptyBullets=""
								/>
							</section>
						</div>
						<div>
							<section>
								<AboutMe
									headClass="text-tempPrimary mt-10 mb-5 relative text-tempPrimary mt-10 mb-5 "
									color="var(--white)"
									level={2}
									data={fillModeData ? fillModeData : result}
								/>
							</section>
							<section>
								<Heading
									className="text-tempPrimaryrelattive text-tempPrimary"
									text="Contact"
									level={2}
								/>
								<ContactBlock
									data={fillModeData ? fillModeData : result}
									color
								/>
							</section>
							<section className="r2-col-sec-all r2-col-sec-3">
								<Activities
									level={2}
									headClass="text-tempPrimary mt-10 mb-5 relattive text-tempPrimary"
									textColor="var(--white)"
									interests={interests}
								/>
							</section>
							<section className="r2-col-sec-all r2-col-sec-4">
								<Activities
									level={2}
									headClass="text-tempPrimary mt-10 mb-5 relattive text-tempPrimary"
									textColor="var(--white)"
									hobbies={hobbies}
								/>
							</section>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Template4;
