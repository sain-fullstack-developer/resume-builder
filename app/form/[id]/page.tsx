"use client";
// import TemplatePage from "@/Templates/TemplateId";
import Button from "@/components/Button";
import InputField from "@/components/InputField";
import InputSelectModal from "@/components/InputSelectModal";
import ToggleMode from "@/components/ToggleMode";
import { postFormData } from "@/store/Store";
import {
	ErrorsFormState,
	addErrorItem,
	updateError,
} from "@/store/reducers/ErrorsSlice";
import {
	FileData,
	FormState,
	addItem,
	deleteItem,
	updateField,
} from "@/store/reducers/FormSlice";
import {
	ObjectiveOptions,
	Skills,
	educationObject,
	experienceObject,
	expertiseObject,
	hobbiesObject,
	interestObject,
	nameRegex,
	projectObject,
	skillsObject,
} from "@/utils/globalVariables";
import { apiDataTypes } from "@/utils/typeInterfaces";
import {
	bytesToKB,
	calculateAge,
	getFileTypeFromBase64,
} from "@/utils/utilFunctions";
import { usePathname, useRouter } from "next/navigation";
import React, {
	useCallback,
	useEffect,
	useRef,
	useState,
	ChangeEvent,
} from "react";

import { useDispatch, useSelector } from "react-redux";

export interface FillResumeDataProps {
	submitForm?: (formState: apiDataTypes | string) => void;
	onFormSubmitted?: () => void;
	initialValues?: apiDataTypes;
}

function FillResumeData({
	submitForm,
	onFormSubmitted,
	initialValues,
}: FillResumeDataProps) {
	const [showTemplate, setShowTemplate] = useState(true);
	const [showCV, setShowCV] = useState(null);
	const [showUpload, setShowUpload] = useState("");
	const [isDarkMode, setIsDarkMode] = useState(false);
	const [isFillingMode, setIsFillingMode] = useState(false);
	const [resumeFilename, setResumeFilename] = useState("");
	const [imageFilename, setImageFilename] = useState("");
	const [displayCV, setDisplayCV] = useState(false);
	const [ageCount, setAgeCount] = useState(0);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [options, setOptions] = useState<string[]>(ObjectiveOptions);
	const [fillImage, setFillImage] = useState<string>("");

	const formState: apiDataTypes = useSelector(
		(state: { form: { fields: apiDataTypes } }) => state.form.fields
	);
	const errorsState: ErrorsFormState = useSelector(
		(state: { errors: ErrorsFormState }) => state.errors
	);

	const templateRef = useRef(null);

	const dispatch = useDispatch();
	const router = useRouter();

	const pathname = usePathname();

	const templateId = parseInt(pathname.split("/")[2]);

	const handleFieldUpdate = useCallback(
		(
			field: keyof FormState["fields"],
			value: string | FileData | any[] | object | number
		) => {
			dispatch(updateField({ field, value }));
		},
		[dispatch]
	);

	const handleAddItem = (field: keyof FormState["fields"], item: string) => {
		dispatch(addItem({ field, item }));
		dispatch(addErrorItem({ field, item }));
	};

	const handleDeleteItem = (
		field: keyof FormState["fields"],
		index: string | number
	) => {
		dispatch(deleteItem({ field, index }));
	};

	useEffect(() => {
		if (initialValues) {
			Object.keys(initialValues).forEach((field) => {
				dispatch(
					updateField({
						field,
						value: initialValues[field],
					})
				);
			});
		}
	}, [initialValues, dispatch]);

	function handleSelectOption(event: ChangeEvent<HTMLInputElement> | any) {
		const selectedOption = event.target.value;
		if (selectedOption && !formState?.techSkills.includes(selectedOption)) {
			let updateTechSkills = [...formState.techSkills, selectedOption];
			handleFieldUpdate("techSkills", updateTechSkills);
		}
	}

	function handleDeleteOption(option: string) {
		const updatedTechSkills = formState?.techSkills.filter(
			(item: string) => item !== option
		);

		dispatch(
			updateField({
				field: "techSkills",
				value: updatedTechSkills,
			})
		);
	}

	// images related functions

	const singleValuesOnchange = (
		event: ChangeEvent<HTMLInputElement>,
		field: keyof FormState["fields"]
	) => {
		const inputValue = event.target.value;
		handleFieldUpdate(field, inputValue);
		const errorValue = !nameRegex.test(inputValue)
			? `Enter a valid ${field}`
			: inputValue.length < 3
			? "Name is too short"
			: "";
		dispatch(updateError({ field: field, value: errorValue }));
	};

	const inputProperties = [
		{
			dropClass:
				"w-1/2 grid place-items-center h-[200px] rounded-lg bg-transperentBlack",
			iconClass: "",
			placeholder: "Upload your resume",
			type: "file",
			name: "cv",
			label: "Upload Resume",
			dropZone: true,
			docFiles: true,
			uploadedCV: showCV ? showCV : "",
			dropzonePlaceholder:
				resumeFilename === "" ? "Upload CV/Resume" : resumeFilename,
			onDrop: useCallback(
				async (acceptedFiles: any[]) => {
					acceptedFiles.forEach(async (dropFile: any) => {
						const fileSize = bytesToKB(dropFile.size);
						const fileNameString = dropFile.name.split(".")[0];
						const fileName = fileNameString;
						setResumeFilename(dropFile.name);

						if (parseInt(fileSize) > 40000) {
							alert(
								`File size exceeds the maximum allowed size of 400KB. file size uploaded is ${fileSize} KB`
							);
						} else if (dropFile) {
							console.log(dropFile);
							const reader = new FileReader();
							reader.onabort = () => console.log("file reading was aborted");
							reader.onerror = () => console.log("file reading has failed");
							reader.onload = async (event: any) => {
								const fileData = event.target.result;
								setShowCV(fileData);
								setDisplayCV(true);
								const fileType = getFileTypeFromBase64(fileData);
								const base64Split =
									typeof fileData === "string" && fileData.split(",")[1];
								const binaryString = base64Split ? atob(base64Split) : "";
								const uIntDataArray = new Uint8Array(binaryString.length);
								for (let i = 0; i < binaryString.length; i++) {
									uIntDataArray[i] = binaryString.charCodeAt(i);
								}

								const fileDataArray = Array.from(uIntDataArray);
								const fileObject = {
									fileName,
									fileType,
									fileDataArray,
									imageUrl: "",
								};

								handleFieldUpdate("fileCV", fileObject);
							};
							reader.readAsDataURL(dropFile);
						} else {
							const fileNameString = dropFile?.name?.split(".")[0];
							const fileName = fileNameString;
							const reader = new FileReader();
							reader.onabort = () => console.log("file reading was aborted");
							reader.onerror = () => console.log("file reading has failed");
							reader.onload = async (event: any) => {
								const fileData = event.target.result;

								const fileType = getFileTypeFromBase64(fileData);
								const base64Split =
									typeof fileData === "string" && fileData.split(",")[1];
								const binaryString = base64Split ? atob(base64Split) : "";
								const uIntDataArray = new Uint8Array(binaryString.length);
								for (let i = 0; i < binaryString.length; i++) {
									uIntDataArray[i] = binaryString.charCodeAt(i);
								}

								const fileDataArray = Array.from(uIntDataArray);

								console.log(fileDataArray);

								const fileObject = {
									fileName,
									fileType,
									fileDataArray,
									imageUrl: "",
								};

								handleFieldUpdate("fileCV", fileObject);
							};
							reader.readAsDataURL(dropFile);
						}
					});
				},
				[handleFieldUpdate]
			),
		},
		{
			dropClass:
				"w-64 grid place-items-center h-64 rounded-full bg-transperentBlack",
			iconClass: "top-20",
			type: "file",
			name: "image",
			label: "Professional Image",
			dropZone: true,
			uploadedImage: showUpload,
			dropzonePlaceholder:
				imageFilename === "" ? "Upload image" : imageFilename,
			onDrop: useCallback(
				async (acceptedFiles: any[]) => {
					acceptedFiles.forEach(async (dropFile: Blob) => {
						const fileSize = bytesToKB(dropFile.size);
						setImageFilename(dropFile.name);
						console.log("image-file", dropFile);
						if (parseInt(fileSize) > 400) {
							alert(
								`File size exceeds the maximum allowed size of 400KB. file size uploaded is ${fileSize} KB`
							);
						} else {
							const fileNameString = dropFile.name.split(".")[0];
							const fileName = fileNameString;
							const reader = new FileReader();
							reader.onabort = () => console.log("file reading was aborted");
							reader.onerror = () => console.log("file reading has failed");
							reader.onload = async (event: any) => {
								const fileData = event.target.result;
								setShowUpload(fileData);
								const fileType = getFileTypeFromBase64(fileData);
								const base64Split =
									typeof fileData === "string" && fileData.split(",")[1];
								const binaryString = base64Split ? atob(base64Split) : "";
								const uIntDataArray = new Uint8Array(binaryString.length);
								for (let i = 0; i < binaryString.length; i++) {
									uIntDataArray[i] = binaryString.charCodeAt(i);
								}

								const fileDataArray = Array.from(uIntDataArray);

								const urlImage = window.URL.createObjectURL(dropFile);

								const fileObject = {
									fileName,
									fileType,
									fileDataArray,
									imageUrl: urlImage,
								};

								handleFieldUpdate("fileData", fileObject);
							};
							reader.readAsDataURL(dropFile);
						}
					});
				},
				[handleFieldUpdate]
			),
		},
		{
			placeholder: "Enter your fullname",
			type: "text",
			label: "Full Name",
			value: formState.fullName,
			errorMessage: errorsState.fullName,
			onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
				singleValuesOnchange(e, "fullName");
			},
			required: false,
		},
		{
			placeholder: "Enter your designation",
			type: "text",
			label: "Designation",
			value: formState.designation,
			errorMessage: errorsState.designation,
			onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
				singleValuesOnchange(e, "designation");
			},
			required: false,
		},

		{
			placeholder: "Enter your date of birth",
			type: "date",
			label: "Date Of Birth",
			value: formState.dob,
			onChange: (e: any) => {
				handleFieldUpdate("dob", e.target.value);
				setAgeCount(calculateAge(e.target.value));
				handleFieldUpdate("age", ageCount);
			},
			required: false,
		},
		{
			placeholder: "Your age",
			type: "number",
			label: "Age",
			value: ageCount,
			readOnly: true,
		},
		{
			placeholder: "Enter your gender",
			type: "text",
			label: "Gender",
			value: formState.gender,
			errorMessage: errorsState.gender,
			onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
				singleValuesOnchange(e, "gender");
			},
			required: false,
		},
		{
			placeholder: "Enter your place of birth",
			type: "text",
			label: "Birth of Place",
			value: formState.bop,
			errorMessage: errorsState.bop,
			onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
				singleValuesOnchange(e, "bop");
			},
		},
		{
			labelClass: "text-xl font-semibold text-white  uppercase",
			placeholder: "Enter your location address",
			type: "text",
			label: "Location",
			value: formState.location,
			errorMessage: errorsState.location,
			onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
				singleValuesOnchange(e, "location");
			},
			required: false,
		},
		{
			placeholder: "Enter your phone number",
			type: "text",
			label: "Mobile No",
			value: formState.phone,
			errorMessage: errorsState.phone,
			onChange: (e: ChangeEvent<HTMLInputElement>) => {
				const mobileNumberPattern = /^[1-9]\d{9}$/;
				handleFieldUpdate("phone", e.target.value);
				const errorValue = !mobileNumberPattern.test(e.target.value)
					? "Enter a valid mobile number"
					: "";
				dispatch(
					updateError({
						field: "phone",
						value: errorValue,
					})
				);
			},
			required: false,
		},
		{
			placeholder: "Enter your mail id",
			type: "email",
			label: "Mail ID",
			value: formState.mail,
			onChange: (e: ChangeEvent<HTMLInputElement>) => {
				const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				handleFieldUpdate("mail", e.target.value);
				const errorValue = !emailPattern.test(e.target.value)
					? "Enter a valid email id"
					: "";
				dispatch(
					updateError({
						field: "mail",
						value: errorValue,
					})
				);
			},
			errorMessage: errorsState.mail,
			required: false,
		},
	];

	const handleOptionClick = (option: string) => {
		handleFieldUpdate("objective", option);
		setIsModalOpen(false);
	};

	// SUBMIT FUNCTION

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// navigate(`/template/${templateId}`);

		try {
			if (true) {
				const postResponse = await dispatch(postFormData(formState) as any);
				console.log(
					"post request submitted",
					postResponse,
					postResponse?.payload?.userId
				);

				alert("form Submitted successfully");

				if (submitForm) submitForm(formState);
				!onFormSubmitted
					? router.push(`/template/${templateId}`)
					: setTimeout(onFormSubmitted, 2000);
				const payloadSize = new Blob([JSON.stringify(formState)]).size;
				console.log("payloadSize", payloadSize, "bytes");
			} else {
				alert("Fill form field details correctly");
			}
		} catch (error) {
			console.error("Failed to save resume:", error);
		}
	};

	const handleShowTemplate = () => {
		setShowTemplate(!showTemplate);
	};
	const handleDarkMode = () => {
		setIsDarkMode(!isDarkMode);
	};
	const handleFillingMode = () => {
		setIsFillingMode(!isFillingMode);
	};

	console.log("formState", formState);

	return (
		<div
			className={
				isDarkMode
					? "bg-black p-16 relative px-40"
					: "bg-primary p-16 relative px-40"
			}>
			<div
				onClick={() => {
					router.push("/template");
				}}
				className="bg-transperentPrimary hover:scale-105 w-8 h-8 cursor-pointer rounded-full  absolute grid place-items-center top-4 left-4">
				<div className="w-3 h-3 bg-none border-2 border-black border-r-0 border-b-0 -rotate-45"></div>
			</div>
			{isFillingMode && showTemplate && (
				<div
					ref={templateRef}
					className="w-[800px] scale-50 z-50 h-96 top-20 right-0 fixed">
					<Button
						variant="primary"
						type="button"
						onClick={handleShowTemplate}
						className="p-8 text-xl z-50 absolute right-0 lg:hidden">
						{showTemplate ? "Hide Template" : "View Filling"}
					</Button>

					{/* <TemplatePage
						imageSrc={showUpload}
						fillMode
						fillDetails={formState}
					/> */}
				</div>
			)}
			<ToggleMode isDarkMode={isDarkMode} handleDarkMode={handleDarkMode} />
			<div className="bg-transperentPrimary rounded-2xl py-12 px-12 z-50">
				<div className="fixed right-48 top-28">
					<p className="text-white font-thin text-sm mb-1 uppercase">
						{!isFillingMode ? "Toggle to Form Filling" : "Toggle to Exit"}
					</p>
					<div
						onClick={handleFillingMode}
						className="cursor-pointer rounded-full h-3 w-10 p-2 bg-white">
						<div
							className={`h-4 w-4 rounded-full bg-primary -mt-2 ${
								isFillingMode ? "ml-2" : "ml-0"
							}`}></div>
					</div>
				</div>
				<h1 className="mb-4 text-center font-semibold text-3xl uppercase tracking-widest text-white bg-tr">
					Fill resume details form
				</h1>
				<div className="grid">
					<form className="" onSubmit={handleSubmit}>
						<div className="">
							<div>
								{inputProperties.map((input, index) => {
									return (
										<InputField
											inputClass="bg-transperentBlack text-xl text-white border-none p-5 rounded-full outline-none mt-2.5 max-w-xl"
											labelClass="text-xl font-base text-white uppercase tracking-widest"
											key={index}
											className="my-8"
											placeholder={input.placeholder ? input.placeholder : ""}
											type={input.type}
											label={input.label}
											name={input.name}
											value={input.value}
											readonly={input.readOnly}
											errorMessage={input.errorMessage}
											onChange={input.onChange ? input.onChange : () => {}}
											required={input.required}
											dropZone={input.dropZone}
											dropzonePlaceholder={input.dropzonePlaceholder}
											onDrop={input?.onDrop}
											docFiles={input?.docFiles}
											dropClass={input?.dropClass}
											iconClass={input?.iconClass}
											uploadedImage={input?.uploadedImage}
											uploadedCV={input.uploadedCV ? input.uploadedCV : ""}
										/>
									);
								})}
							</div>
						</div>
						<div
						// className={`${
						// 	templateId === "0" || templateId === "4" ? "grid" : "hidden"
						// }`}>
						>
							{formState?.interests?.map(
								(list: { interest: string }, index) => {
									return (
										<div className="relative" key={index}>
											<InputField
												label={index === 0 ? "Interests" : ""}
												labelClass="text-xl font-base text-white uppercase tracking-widest"
												type="text"
												name="interest"
												value={list.interest ? list.interest : ""}
												onChange={(event: { target: { value: string } }) => {
													const updateInterest = [...formState?.interests];
													updateInterest[index] = {
														interest: event.target.value,
													};
													handleFieldUpdate("interests", updateInterest);
													const errorValue = !nameRegex.test(event.target.value)
														? "Enter a valid interest name"
														: "";
													dispatch(
														updateError({
															field: "interests",
															value: errorValue,
															index: index,
															item: "interest",
														})
													);
												}}
												errorMessage={errorsState?.interests[index]?.interest}
												placeholder="Enter your interest"
												key={index}
												inputClass="relative bg-transperentBlack text-xl text-white border-none p-5 rounded-full outline-none mt-2.5 max-w-xl"
											/>
											{index !== 0 && (
												<div
													className="absolute right-10 top-8 shadow-2xl hover:bg-red-600 hover:text-white cursor-pointer h-8 w-8 bg-white border-2 border-red-600 rounded-full text-2xl text-red-600 font-semibold grid place-items-center"
													onClick={() => handleDeleteItem("interests", index)}>
													<div className="absolute bottom-0.5">x</div>
												</div>
											)}
										</div>
									);
								}
							)}

							<div
								className="relative shadow-2xl hover:bg-white hover:text-black cursor-pointer h-8 w-8 bg-none border-2 border-white rounded-full text-2xl text-white font-semibold grid place-items-center"
								onClick={() =>
									handleAddItem("interests", interestObject as any)
								}>
								<div className="absolute bottom-0.5">+</div>
							</div>
						</div>
						<div className="my-8">
							{formState.hobbies.map((list: { hobbie: string }, index) => {
								return (
									<div key={index} className="relative mb-4">
										<InputField
											label={index === 0 ? "Hobbies" : ""}
											labelClass="text-xl font-base text-white uppercase tracking-widest"
											type="text"
											value={list.hobbie ? list.hobbie : ""}
											onChange={(event: { target: { value: string } }) => {
												const updateHobbies = [...formState.hobbies];
												updateHobbies[index] = { hobbie: event.target.value };
												handleFieldUpdate("hobbies", updateHobbies);
												const errorValue = !nameRegex.test(event.target.value)
													? "Enter a valid hobbie name"
													: "";
												dispatch(
													updateError({
														field: "hobbies",
														value: errorValue,
														index: index,
														item: "hobbie",
													})
												);
											}}
											errorMessage={errorsState.hobbies[index]?.hobbie}
											key={index}
											placeholder="Enter your hobbies"
											inputClass="relative bg-transperentBlack text-xl text-white border-none p-5 rounded-full outline-none mt-2.5 max-w-xl"
										/>
										{index !== 0 && (
											<div
												className="absolute right-10 top-8 shadow-2xl hover:bg-red-600 hover:text-white cursor-pointer h-8 w-8 bg-white border-2 border-red-600 rounded-full text-2xl text-red-600 font-semibold grid place-items-center"
												onClick={() => handleDeleteItem("hobbies", index)}>
												<div className="absolute bottom-0.5">x</div>
											</div>
										)}
									</div>
								);
							})}

							<div
								className="relative shadow-2xl hover:bg-white hover:text-black cursor-pointer h-8 w-8 bg-none border-2 border-white rounded-full text-2xl text-white font-semibold grid place-items-center"
								onClick={() => handleAddItem("hobbies", hobbiesObject as any)}>
								<div className="absolute bottom-0.5">+</div>
							</div>
						</div>
						<div className="my-8 relative">
							<InputField
								type="text"
								placeholder="Enter your career objective in detail or select from list"
								value={formState.objective}
								name={formState.objective}
								onChange={(e: ChangeEvent<HTMLInputElement>) => {
									handleFieldUpdate(
										"objective",
										e.target.value ? e.target.value : ""
									);
								}}
								onFocus={(e: any) => {
									setIsModalOpen(true);
								}}
								errorMessage={errorsState.objective}
								label="Career Objective"
								labelClass="text-xl font-base text-white uppercase tracking-widest"
								inputClass="bg-transperentBlack text-xl text-white border-none p-5 rounded-full outline-none mt-2.5 max-w-xl"
							/>
							{isModalOpen && formState.objective.length < 6 && (
								<InputSelectModal
									options={options}
									handleClick={handleOptionClick}
								/>
							)}
						</div>
						<div className="my-8">
							{formState.inputSets.map((list, index) => (
								<div className={`relative mb-4`} key={index}>
									<InputField
										label={index === 0 ? "Education Details" : ""}
										labelClass="text-xl font-base text-white uppercase tracking-widest"
										type="number"
										name="year"
										min={1960}
										max={2060}
										value={list.year}
										onChange={(event: ChangeEvent<HTMLInputElement>) => {
											const updateExperience = [...formState.inputSets];
											updateExperience[index] = {
												...list,
												year: event.target.value,
											};
											handleFieldUpdate("inputSets", updateExperience);
											const errorValue =
												parseInt(event.target.value) < 1960 ||
												parseInt(event.target.value) > 2060
													? "Enter year in range"
													: "";
											dispatch(
												updateError({
													field: "inputSets",
													value: errorValue,
													index: index,
													item: "year",
												})
											);
										}}
										errorMessage={errorsState.inputSets[index]?.year}
										placeholder="Year Of Passing"
										inputClass="relative bg-transperentBlack text-xl text-white border-none p-5 rounded-full outline-none mt-2.5 max-w-xl "
										errorClass="mb-2"
									/>
									<InputField
										type="number"
										name="percentage"
										min={0}
										max={100}
										value={list.percentage}
										onChange={(event: ChangeEvent<HTMLInputElement>) => {
											const updatePercentage = [...formState.inputSets];
											updatePercentage[index] = {
												...list,
												percentage: parseInt(event.target.value),
											};
											handleFieldUpdate("inputSets", updatePercentage);
											const errorValue =
												parseInt(event.target.value) < 0 ||
												parseInt(event.target.value) > 100
													? "Enter percentage in range from 0 to 100"
													: "";
											dispatch(
												updateError({
													field: "inputSets",
													value: errorValue,
													index: index,
													item: "percentage",
												})
											);
										}}
										errorMessage={errorsState.inputSets[index]?.percentage}
										placeholder="Percentage"
										inputClass="relative  bg-transperentBlack text-xl text-white border-none p-5 rounded-full outline-none mt-2.5 max-w-xl"
										errorClass="mb-2"
									/>
									<InputField
										type="text"
										name="details"
										onChange={(event: { target: { value: string } }) => {
											const updateDetails = [...formState.inputSets];
											updateDetails[index] = {
												...list,
												details: event.target.value,
											};
											handleFieldUpdate("inputSets", updateDetails);
											const errorValue = !nameRegex.test(event.target.value)
												? "Fill valid details"
												: "";
											dispatch(
												updateError({
													field: "inputSets",
													value: errorValue,
													index: index,
													item: "details",
												})
											);
										}}
										errorMessage={errorsState.inputSets[index]?.details}
										value={list.details}
										placeholder="College name and location"
										inputClass="bg-transperentBlack  text-xl text-white border-none p-5 rounded-full outline-none mt-2.5 max-w-xl"
										errorClass="mb-2"
									/>
									<div className="">
										{index !== 0 && (
											<div
												className="absolute right-10 top-8 shadow-2xl hover:bg-red-600 hover:text-white cursor-pointer h-8 w-8 bg-white border-2 border-red-600 rounded-full text-2xl text-red-600 font-semibold grid place-items-center"
												onClick={() => handleDeleteItem("inputSets", index)}>
												<div className="absolute bottom-0.5">x</div>
											</div>
										)}
									</div>
								</div>
							))}

							<div
								className="relative shadow-2xl hover:bg-white hover:text-black cursor-pointer h-8 w-8 bg-none border-2 border-white rounded-full text-2xl text-white font-semibold grid place-items-center"
								onClick={() =>
									handleAddItem("inputSets", educationObject as any)
								}>
								<div className="absolute bottom-0.5">+</div>
							</div>
						</div>
						<div
						// className={
						// 	templateId === "0" || templateId === "4"
						// 		? "block my-8 max-w-xl"
						// 		: "hidden"
						// }>
						>
							<label className="text-xl font-base text-white uppercase tracking-widest">
								Technical Skills
							</label>
							<div className="relative">
								<input
									type="text"
									placeholder="Select options"
									value={formState?.techSkills}
									name="techSkills"
									onChange={(event: ChangeEvent<HTMLInputElement>) =>
										event.target.value
									}
									className="bg-transperentBlack text-xl text-white border-none p-5 rounded-full outline-none mt-2.5 max-w-xl w-full"
								/>
								<select
									title="tech-skills"
									onChange={handleSelectOption}
									className="absolute top-8 right-8 cursor-pointer border-none outline-none w-4 text-xl rounded-full bg-transperentBlack text-white">
									<option value=""></option>
									{Skills.map((skill, i) => (
										<option key={i} value={skill}>
											{skill}
										</option>
									))}
								</select>
							</div>
							<div className="grid grid-col-1 sm:grid-col-2 md:grid-col-4 lg:grid-cols-2 gap-4 max-w-[800px]">
								{formState?.techSkills.map((option) => (
									<div
										key={option}
										className="bg-blue-100 py-1 px-5 w-full mx-w-[460px] rounded-full m-2.5 grid grid-cols-2 place-items-center text-xl font-semibold">
										<p>{option}</p>
										<div
											className="relative cursor-pointer h-7 w-7 bg-none hover:bg-red-600 hover:text-white border-2 border-red-600 rounded-full text-lg text-red-600 font-base grid place-items-center"
											onClick={() => handleDeleteOption(option)}>
											<div className="absolute bottom-0">X</div>
										</div>
									</div>
								))}
							</div>
						</div>
						<div className="my-8">
							{formState?.experience?.map((list, index) => (
								<div className="relative my-8" key={index}>
									<InputField
										type="text"
										name="designation"
										value={list.designation}
										onChange={(event: { target: { value: string } }) => {
											const updateProfile = [...formState.experience];
											updateProfile[index] = {
												...list,
												designation: event.target.value,
											};
											handleFieldUpdate("experience", updateProfile);
											const errorValue = !nameRegex.test(event.target.value)
												? "Enter valid designation name"
												: "";
											dispatch(
												updateError({
													field: "experience",
													value: errorValue,
													index: index,
													item: "designation",
												})
											);
										}}
										errorMessage={errorsState.experience[index]?.designation}
										placeholder="Designation"
										label={index === 0 ? "Experience" : ""}
										labelClass="text-xl font-base text-white uppercase tracking-widest"
										inputClass="relative bg-transperentBlack text-xl text-white border-none p-5 rounded-full outline-none mt-2.5 max-w-xl"
										errorClass="mb-2"
									/>
									<InputField
										type="text"
										name="companyName"
										onChange={(event: { target: { value: string } }) => {
											const updateCompanyName = [...formState.experience];
											updateCompanyName[index] = {
												...list,
												companyName: event.target.value,
											};
											handleFieldUpdate("experience", updateCompanyName);
											const errorValue = !nameRegex.test(event.target.value)
												? "Enter valid company name"
												: "";
											dispatch(
												updateError({
													field: "experience",
													value: errorValue,
													index: index,
													item: "companyName",
												})
											);
										}}
										errorMessage={errorsState.experience[index]?.companyName}
										value={list.companyName}
										placeholder="Company Name"
										inputClass="relative bg-transperentBlack text-xl text-white border-none p-5 rounded-full outline-none mt-2.5 max-w-xl"
										errorClass="mb-2"
									/>

									<InputField
										type="date"
										placeholder="Start date"
										name="startYear"
										value={list.startYear}
										onChange={(event: { target: { value: any } }) => {
											const updateStartYear = [...formState.experience];
											updateStartYear[index] = {
												...list,
												startYear: event.target.value,
											};
											handleFieldUpdate("experience", updateStartYear);
										}}
										inputClass="relative bg-transperentBlack text-xl text-white border-none p-5 rounded-full outline-none mt-2.5 max-w-xl"
										errorClass="mb-2"
									/>
									<InputField
										type="date"
										name="endYear"
										value={list.endYear}
										onChange={(event: { target: { value: any } }) => {
											const updateEndYear = [...formState.experience];
											updateEndYear[index] = {
												...list,
												endYear: event.target.value,
											};
											handleFieldUpdate("experience", updateEndYear);
										}}
										placeholder="End date"
										inputClass="relative bg-transperentBlack text-xl text-white border-none p-5 rounded-full outline-none mt-2.5 max-w-xl"
										errorClass="mb-2"
									/>

									<textarea
										value={list.details}
										onChange={(event) => {
											const updateExpDetails = [...formState.experience];
											updateExpDetails[index] = {
												...list,
												details: event.target.value,
											};
											handleFieldUpdate("experience", updateExpDetails);
										}}
										placeholder="enter your experience details"
										className="relative bg-transperentBlack text-xl text-white border-none p-5 rounded-full outline-none mt-2.5 max-w-xl w-full"></textarea>

									<div className="delete-btn-grid-column">
										{index !== 0 && (
											<div
												className="absolute right-10 top-8 shadow-2xl hover:bg-red-600 hover:text-white cursor-pointer h-8 w-8 bg-white border-2 border-red-600 rounded-full text-2xl text-red-600 font-semibold grid place-items-center"
												onClick={() => handleDeleteItem("experience", index)}>
												<div className="absolute bottom-0.5">x</div>
											</div>
										)}
									</div>
								</div>
							))}

							<div
								className="relative shadow-2xl hover:bg-white hover:text-black cursor-pointer h-8 w-8 bg-none border-2 border-white rounded-full text-2xl text-white font-semibold grid place-items-center"
								onClick={() =>
									handleAddItem("experience", experienceObject as any)
								}>
								<div className="absolute bottom-0.5">+</div>
							</div>
						</div>
						<div
						// className={`${
						// 	templateId === "0" || templateId === "4" ? "my-8" : "hidden"
						// }`}>
						>
							{formState?.projects?.map((list, index) => (
								<div className="rb-input-projects my-8 relative" key={index}>
									<InputField
										label={index === 0 ? "Projects" : ""}
										labelClass="text-xl font-base text-white uppercase tracking-widest"
										inputClass="relative bg-transperentBlack text-xl text-white border-none p-5 rounded-full outline-none mt-2.5 max-w-xl"
										type="text"
										name="projectName"
										value={list.projectName}
										onChange={(event: { target: { value: string } }) => {
											const updateProjectName = [...formState.projects];
											updateProjectName[index] = {
												...list,
												projectName: event.target.value,
											};
											handleFieldUpdate("projects", updateProjectName);
											const errorValue = !nameRegex.test(event.target.value)
												? "Enter valid project name"
												: "";
											dispatch(
												updateError({
													field: "projects",
													value: errorValue,
													index: index,
													item: "projectName",
												})
											);
										}}
										placeholder="Project Name"
										errorMessage={errorsState.projects[index]?.projectName}
										errorClass="mb-2"
									/>
									<InputField
										inputClass="relative bg-transperentBlack text-xl text-white border-none p-5 rounded-full outline-none mt-2.5 max-w-xl"
										type="url"
										name="projectUrl"
										value={list.projectUrl}
										onChange={(event: { target: { value: string } }) => {
											const urlPattern =
												/^(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\/\S*)?$/;
											const updateProjectUrl = [...formState.projects];
											updateProjectUrl[index] = {
												...list,
												projectUrl: event.target.value,
											};
											handleFieldUpdate("projects", updateProjectUrl);
											const errorValue = !urlPattern.test(event.target.value)
												? "Enter a valid url"
												: "";
											dispatch(
												updateError({
													field: "projects",
													value: errorValue,
													index: index,
													item: "projectUrl",
												})
											);
										}}
										placeholder="Project Link"
										errorMessage={errorsState.projects[index]?.projectUrl}
										errorClass="mb-2"
									/>
									<textarea
										value={list.details}
										onChange={(event) => {
											const updateProjectDetails = [...formState.projects];
											updateProjectDetails[index] = {
												...list,
												details: event.target.value,
											};
											handleFieldUpdate("projects", updateProjectDetails);
										}}
										placeholder="enter project details"
										className="relative bg-transperentBlack text-xl text-white border-none p-5 rounded-full outline-none mt-2.5 max-w-xl w-full"></textarea>
									<div className="delete-btn-grid-column">
										{index !== 0 && (
											<div
												className="absolute right-10 top-8 shadow-2xl hover:bg-red-600 hover:text-white cursor-pointer h-8 w-8 bg-white border-2 border-red-600 rounded-full text-2xl text-red-600 font-semibold grid place-items-center"
												onClick={() => handleDeleteItem("projects", index)}>
												<div className="absolute bottom-0.5">x</div>
											</div>
										)}
									</div>
								</div>
							))}

							<div
								className="relative shadow-2xl hover:bg-white hover:text-black cursor-pointer h-8 w-8 bg-none border-2 border-white rounded-full text-2xl text-white font-semibold grid place-items-center"
								onClick={() => handleAddItem("projects", projectObject as any)}>
								<div className="absolute bottom-0.5">+</div>
							</div>
						</div>
						<div
						// className={`${
						// 	templateId === "0" || templateId === "4" ? "my-8" : "hidden"
						// }`}>
						>
							{formState?.expertise?.map((list, index) => (
								<div className="rb-input-expertise my-8 relative" key={index}>
									<InputField
										label={index === 0 ? "Expertise" : ""}
										labelClass="text-xl font-base text-white uppercase tracking-widest"
										inputClass="relative bg-transperentBlack text-xl text-white border-none p-5 rounded-full outline-none mt-2.5 max-w-xl"
										type="text"
										name="title"
										value={list.title}
										onChange={(event: { target: { value: string } }) => {
											const updateTitle = [...formState.expertise];
											updateTitle[index] = {
												...list,
												title: event.target.value,
											};
											handleFieldUpdate("expertise", updateTitle);
											const errorValue = !nameRegex.test(event.target.value)
												? "Enter a valid expertise name"
												: "";
											dispatch(
												updateError({
													field: "expertise",
													value: errorValue,
													index: index,
													item: "title",
												})
											);
										}}
										placeholder="Enter you are expertise in"
										errorMessage={errorsState.expertise[index]?.title}
										errorClass="mb-2"
									/>
									<InputField
										inputClass="relative bg-transperentBlack text-xl text-white border-none p-5 rounded-full outline-none mt-2.5 max-w-xl"
										type="number"
										name="rating"
										value={list.rating}
										onChange={(event: { target: { value: number } }) => {
											const updateRating = [...formState.expertise];
											updateRating[index] = {
												...list,
												rating: event.target.value,
											};
											handleFieldUpdate("expertise", updateRating);
											const errorValue =
												event.target.value > 5 || event.target.value < 0
													? "Enter a valid rating range from 0 and 5"
													: "";
											dispatch(
												updateError({
													field: "expertise",
													value: errorValue,
													index: index,
													item: "rating",
												})
											);
										}}
										placeholder="Rate your expertise from 1 to 5"
									/>
									{index !== 0 && (
										<div
											className="absolute right-10 top-8 shadow-2xl hover:bg-red-600 hover:text-white cursor-pointer h-8 w-8 bg-white border-2 border-red-600 rounded-full text-2xl text-red-600 font-semibold grid place-items-center"
											onClick={() => handleDeleteItem("expertise", index)}>
											<div className="absolute bottom-0.5">x</div>
										</div>
									)}
								</div>
							))}

							<div
								className="relative shadow-2xl hover:bg-white hover:text-black cursor-pointer h-8 w-8 bg-none border-2 border-white rounded-full text-2xl text-white font-semibold grid place-items-center"
								onClick={() =>
									handleAddItem("expertise", expertiseObject as any)
								}>
								<div className="absolute bottom-0.5">+</div>
							</div>
						</div>
						<div className="my-8">
							{formState?.skills?.map((list, index) => (
								<div className="rb-input-skills my-8 relative" key={index}>
									<InputField
										label={index === 0 ? "Skills" : ""}
										labelClass="text-xl font-base text-white uppercase tracking-widest"
										inputClass="relative bg-transperentBlack text-xl text-white border-none p-5 rounded-full outline-none mt-2.5 max-w-xl"
										type="text"
										name="title"
										value={list.title}
										onChange={(event: { target: { value: string } }) => {
											const updateTitle = [...formState.skills];
											updateTitle[index] = {
												...list,
												title: event.target.value,
											};
											handleFieldUpdate("skills", updateTitle);
											const errorValue = !nameRegex.test(event.target.value)
												? "Enter a valid skill name"
												: "";
											dispatch(
												updateError({
													field: "skills",
													value: errorValue,
													index: index,
													item: "title",
												})
											);
										}}
										placeholder="Enter your skill"
										errorMessage={errorsState.expertise[index]?.title}
										errorClass="mb-2"
									/>
									<InputField
										inputClass="relative bg-transperentBlack text-xl text-white border-none p-5 rounded-full outline-none mt-2.5 max-w-xl"
										type="number"
										min={1}
										max={5}
										value={list.rating}
										onChange={(event: { target: { value: number } }) => {
											const updateRating = [...formState.skills];
											updateRating[index] = {
												...list,
												rating: event.target.value,
											};
											handleFieldUpdate("skills", updateRating);
											const errorValue =
												event.target.value > 5 || event.target.value < 0
													? "Enter a valid rating range from 0 and 5"
													: "";
											dispatch(
												updateError({
													field: "skills",
													value: errorValue,
													index: index,
													item: "rating",
												})
											);
										}}
										placeholder="Rate your skill from 1 to 5"
										errorMessage={errorsState.skills[index]?.rating}
									/>
									{index !== 0 && (
										<div
											className="absolute right-10 top-8 shadow-2xl hover:bg-red-600 hover:text-white cursor-pointer h-8 w-8 bg-white border-2 border-red-600 rounded-full text-2xl text-red-600 font-semibold grid place-items-center"
											onClick={() => handleDeleteItem("skills", index)}>
											<div className="absolute bottom-0.5">x</div>
										</div>
									)}
								</div>
							))}

							<div
								className="relative shadow-2xl hover:bg-white hover:text-black cursor-pointer h-8 w-8 bg-none border-2 border-white rounded-full text-2xl text-white font-semibold grid place-items-center"
								onClick={() => handleAddItem("skills", skillsObject as any)}>
								<div className="absolute bottom-0.5">+</div>
							</div>
						</div>
						<div className="text-center">
							<Button
								type="submit"
								variant="primary"
								className="w-64 uppercase tracking-widest font-semibold">
								Submit
							</Button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default FillResumeData;
