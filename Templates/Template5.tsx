import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { LoadingState, RootState, TemplatesProps } from "./Template0";
import { fetchFormApiData } from "@/store/Store";
import Loading from "@/components/Loading";
import Image from "next/image";
import { staticImagesPath } from "@/utils/utilFunctions";
import Activities from "@/components/Activities";
import Heading from "@/elements/Heading";
import ContactBlock from "@/components/ContactBlock";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Skills from "@/components/Skills";
import Languages from "@/components/Languages";

function Template5({ resumeRef, fillModeData }: TemplatesProps) {
	const dispatch = useDispatch();
	const result = useSelector((state: RootState) => state.apiData.data);
	const loadingAndError = useSelector((state: LoadingState) => state.apiData);
	const imageUrl = result?.fileData?.imageUrl;

	useEffect(() => {
		dispatch(fetchFormApiData() as any);
	}, [dispatch]);

	const skills = fillModeData ? fillModeData?.skills : result.skills;
	const interests = fillModeData ? fillModeData?.interests : result.interests;
	const experience = fillModeData
		? fillModeData?.experience
		: result.experience;
	const education = fillModeData ? fillModeData?.inputSets : result.inputSets;
	const languages = fillModeData ? fillModeData?.languages : result.languages;

	if (!skills || !interests || !experience || !languages) {
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
			<div id="container" ref={resumeRef} className="grid grid-cols-temp5One">
				<div className="bg-gray-400 px-8 py-0 flex h-full justify-between">
					<section className="grid place-items-center text-center">
						<h1>{fillModeData ? fillModeData?.fullName : result?.fullName}</h1>
						<h4
							style={{
								letterSpacing: "0.1em",
								textTransform: "uppercase",
								fontSize: "1.4rem",
							}}>
							{fillModeData ? fillModeData?.designation : result?.designation}
						</h4>
						<img
							className="w-64 h-64 rounded-full"
							src={imageUrl ? imageUrl : staticImagesPath("avatar.png")}
							alt="profile"
						/>
					</section>
					<section>
						<Activities
							level={2}
							headClass="text-white mt-2.5 mb-5 relative w-max text-xl font-bold uppercase"
							textColor="var(--white)"
							interests={interests}
						/>
					</section>
					<section>
						<Heading
							className="text-white mt-2.5 mb-5 relative w-max text-xl font-bold uppercase"
							text="Contact"
							level={2}
						/>
						<ContactBlock data={fillModeData ? fillModeData : result} color />
					</section>
				</div>
				<div className="bg-gray-700 p-8">
					<section>
						<img src={staticImagesPath("suitcase.png")} alt="Icon" />
						<Experience
							level={2}
							headClass="text-white mt-2.5 mb-5 relative w-max text-xl font-bold uppercase"
							data={fillModeData ? fillModeData : result}
							colorText="var(--white)"
						/>
					</section>
					<section className="mb-12">
						<img src={staticImagesPath("graduate.png")} alt="Icon" />
						<Education
							level={2}
							headClass="text-white mt-2.5 mb-5 relative w-max text-xl font-bold uppercase"
							data={fillModeData ? fillModeData : result}
							color="var(--white)"
						/>
					</section>
					<section className="mb-12">
						<img
							src={staticImagesPath("multitasking-w.png")}
							alt="skillsIcon"
						/>
						<Skills
							headClass="text-white mt-2.5 mb-5 relative w-max text-xl font-bold uppercase"
							data={skills}
							title="Skills"
							level={2}
							circle
							classMap="text-white"
						/>
					</section>
					<section>
						<img src={staticImagesPath("language.png")} alt="Language=Icon" />
						<Languages
							level={2}
							headClass="text-white mt-2.5 mb-5 relative w-max text-xl font-bold uppercase"
							title="Languages"
							data={languages}
							color="var(--white)"
							barBg="var(--white)"
							barborderColor="var(--black)"
						/>
					</section>
				</div>
			</div>
		</>
	);
}

export default Template5;
