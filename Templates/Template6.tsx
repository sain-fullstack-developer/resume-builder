// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchFormApiData } from "../../store/Store";
// import Experience from "../../components/Experience";
// import Education from "../../components/Education";
// import ContactBlock from "../../components/ContactBlock";
// import Skills from "../../components/Skills";
// import Objective from "../../components/Objective";
// import { LoadingState, RootState, TemplatesProps } from "./Template0";
// import { staticImagesPath } from "../../utils/utilFunctions";
// import Loading from "../../components/Loading";

// function Template6({ resumeRef, fillModeData }: TemplatesProps) {
// 	const dispatch = useDispatch();
// 	const apiData = useSelector((state: RootState) => state.apiData.data);
// 	const loadingAndError = useSelector((state: LoadingState) => state.apiData);
// 	const imageUrl = apiData?.fileData?.imageUrl;

// 	useEffect(() => {
// 		dispatch(fetchFormApiData() as any);
// 	}, [dispatch]);

// 	const skills = fillModeData ? fillModeData?.skills : apiData?.skills;
// 	const interests = fillModeData ? fillModeData?.interests : apiData?.interests;
// 	const experience = fillModeData
// 		? fillModeData?.experience
// 		: apiData?.experience;
// 	const education = fillModeData ? fillModeData : apiData;
// 	const languages = fillModeData ? fillModeData?.languages : apiData?.languages;

// 	if (!skills || !interests || !experience || !languages || !education) {
// 		return <p>Loading ....</p>;
// 	}

// 	if (loadingAndError.loading) {
// 		return <Loading />;
// 	}

// 	if (loadingAndError.error) {
// 		return <p>Error: {loadingAndError.error}</p>;
// 	}

// 	return (
// 		<>
// 			<div
// 				ref={resumeRef}
// 				className="bg-black min-h-screen relative z-10 grid grid-cols-2 py-14 px-20 gap-5">
// 				<div>
// 					<div className="r4-col-1-card-1">
// 						<img
// 							className="rounded-[40px] h-[220px] w-[220px] m-auto"
// 							src={imageUrl ? imageUrl : staticImagesPath("avatar.png")}
// 							alt="profile-pic"
// 						/>
// 						<ContactBlock color data={fillModeData ? fillModeData : apiData} />
// 					</div>
// 					<div>
// 						<Skills
// 							level={2}
// 							headClass="text-white font-semibold mb-6 relative uppercase"
// 							title="Skills"
// 							data={skills}
// 							circle
// 							classMap="text-white"
// 						/>
// 					</div>
// 				</div>
// 				<div>
// 					<div className="text-white">
// 						<h1 style={{ textTransform: "uppercase", letterSpacing: "0.1em" }}>
// 							{fillModeData ? fillModeData?.fullName : apiData.fullName}
// 						</h1>
// 						<p
// 							style={{
// 								textTransform: "uppercase",
// 								letterSpacing: "0.1em",
// 								marginBottom: "1rem",
// 							}}>
// 							{fillModeData ? fillModeData?.designation : apiData?.designation}
// 						</p>
// 						<Objective
// 							level={2}
// 							title="about me"
// 							headingClass="text-white font-semibold mb-6 relative uppercase"
// 							data={fillModeData ? fillModeData : apiData}
// 						/>
// 					</div>
// 					<div>
// 						<Education
// 							level={2}
// 							color="var(--white)"
// 							headClass="text-white font-semibold mb-6 relative uppercase"
// 							data={education}
// 						/>
// 					</div>
// 					<div className="r4-col-2-card-3">
// 						<Experience
// 							level={2}
// 							headClass="text-white font-semibold mb-6 relative uppercase"
// 							data={fillModeData ? fillModeData : apiData}
// 							colorText="var(--white)"
// 						/>
// 					</div>
// 				</div>
// 			</div>
// 		</>
// 	);
// }

// export default Template6;
