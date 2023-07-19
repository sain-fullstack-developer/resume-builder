import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoadingState, RootState, TemplatesProps } from "./Template0";
import { fetchFormApiData } from "@/store/Store";
import Loading from "@/components/Loading";
import { staticImagesPath } from "@/utils/utilFunctions";
import Image from "next/image";
import Heading from "@/elements/Heading";
import ContactBlock from "@/components/ContactBlock";
import Activities from "@/components/Activities";
import Objective from "@/components/Objective";
import Experience from "@/components/Experience";
import Education from "@/components/Education";

function Template3({ resumeRef, fillModeData }: TemplatesProps) {
	const dispatch = useDispatch();
	const apiData = useSelector((state: RootState) => state.apiData.data);
	const loadingAndError = useSelector((state: LoadingState) => state.apiData);
	const imageUrl = apiData?.fileData?.imageUrl;

	useEffect(() => {
		dispatch(fetchFormApiData() as any);
	}, [dispatch]);

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
	const hobbies = fillModeData ? fillModeData?.hobbies : apiData.hobbies;
	const projects = fillModeData ? fillModeData?.projects : apiData.projects;

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
			<div ref={resumeRef} className="bg-gray-400 grid grid-cols-temp3One">
				<div className="grid grid-cols-temp3Two p-10 relative place-items-center z-0">
					<img
						src={imageUrl ? imageUrl : "avatar.png"}
						alt="profile-pic"
						className="h-40 w-40 rounded-full z-10"
					/>
					<div className="text-white uppercase grid place-items-center z-10">
						<h1 className="text-7xl">
							{fillModeData ? fillModeData?.fullName : apiData?.fullName}
						</h1>
						<p>
							{fillModeData ? fillModeData?.designation : apiData?.designation}
						</p>
					</div>
				</div>
				<div className="grid grid-cols-2 bg-gray-400 p-16">
					<div>
						<div className="mb-8">
							<Heading
								className="mb-4 uppercase relative pb-3"
								text="Contact"
								level={2}
							/>
							<ContactBlock data={fillModeData ? fillModeData : apiData} />
						</div>
						<div className="mb-8">
							<Heading
								className="mb-4 uppercase relative pb-3"
								text="Skills"
								level={2}
							/>
							<ul>
								{techSkills?.map((list: any, index: any) => (
									<li className="mb-4 text-xl font-medium ml-6" key={index}>
										{list}
									</li>
								))}
							</ul>
						</div>
						<div>
							<Activities
								level={2}
								headClass="mb-4 uppercase relative pb-3"
								textColor="var(--black)"
								hobbies={hobbies}
							/>
						</div>
					</div>
					<div>
						<div className="mb-7 pb-7">
							<Objective
								level={2}
								headingClass="mb-4 uppercase relative pb-3"
								data={fillModeData ? fillModeData : apiData}
								title="PROFILE"
							/>
						</div>
						<div className="mb-7 pb-7">
							<Experience
								level={2}
								headClass="mb-4 uppercase relative pb-3"
								data={fillModeData ? fillModeData : apiData}
							/>
						</div>
						<div className="r2-second-row-col-1-education">
							<Education
								level={2}
								headClass="mb-4 uppercase relative pb-3"
								data={fillModeData ? fillModeData : apiData}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Template3;
