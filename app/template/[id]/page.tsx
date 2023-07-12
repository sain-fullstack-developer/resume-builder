"use client";

import TemplateDefault, { RootState } from "@/Templates/Template0";
import Template1 from "@/Templates/Template1";
import Template2 from "@/Templates/Template2";
import PageNotFound from "@/app/not-found";
import FillResumeData from "@/app/form/[id]/page";
import Button from "@/components/Button";
import { fetchFormApiData, updateFormData } from "@/store/Store";
import { apiDataTypes } from "@/utils/typeInterfaces";
import { downloadPdf } from "@/utils/utilFunctions";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface TemplatePageProps {
	fillMode?: boolean;
	fillDetails: apiDataTypes;
	imageSrc?: string;
}

function TemplatePage({ fillMode, fillDetails, imageSrc }: TemplatePageProps) {
	const [isEditing, setIsEditing] = useState(false);
	const pathname = usePathname();
	const templateId = parseInt(pathname.split("/")[2]);
	const dispatch = useDispatch();
	const resumeRef = useRef(null);
	const userId = useSelector((state: any) => state.userId.value);

	const reduxData = useSelector((state: RootState) => state.apiData.data);

	console.log("reduxData-edit", reduxData);

	useEffect(() => {
		const dipatchTest = dispatch(fetchFormApiData(userId) as any);
		console.log("dipatchTest", dipatchTest);
	}, [dispatch, userId]);

	function handleEditClick(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		setIsEditing(true);
	}

	async function handleSubmit(formData: any) {
		try {
			dispatch(updateFormData(formData) as any);
		} catch (error) {
			console.log(error);
		}
	}

	const handleNavigateToTemplate = () => {
		setIsEditing(false);
		window.location.reload();
	};

	const renderTemplate = () => {
		switch (templateId) {
			case 0:
				return (
					<TemplateDefault
						resumeRef={resumeRef}
						fillImage={imageSrc ? imageSrc : ""}
						fillModeData={fillDetails}
					/>
				);
			case 1:
				return (
					<Template1
						fillImage={imageSrc ? imageSrc : ""}
						resumeRef={resumeRef}
						fillModeData={fillDetails}
					/>
				);
			case 2:
				return (
					<Template2
						fillImage={imageSrc ? imageSrc : ""}
						resumeRef={resumeRef}
						fillModeData={fillDetails}
					/>
				);
				// case "3":
				"";
				// return <Template3 resumeRef={resumeRef} fillModeData={fillDetails} />;
				// case "4":
				"";
				// return <Template4 resumeRef={resumeRef} fillModeData={fillDetails} />;
				// case "5":
				"";
				// return <Template5 resumeRef={resumeRef} fillModeData={fillDetails} />;
				// case "6":
				"";
			// return <Template6 resumeRef={resumeRef} fillModeData={fillDetails} />;
			default:
				return <PageNotFound />;
		}
	};

	return (
		<div className="min-h-screen">
			{isEditing ? (
				<FillResumeData
					submitForm={handleSubmit}
					onFormSubmitted={handleNavigateToTemplate}
					initialValues={
						reduxData !== undefined && reduxData !== null
							? reduxData
							: undefined
					}
				/>
			) : (
				<div className="relative z-0">
					<div className="max-w-[100px] w-full absolute top-2.5 right-5 z-50">
						{!fillMode && (
							<Link href={`/form/${templateId}`}>
								<Button
									variant="primary"
									type="button"
									onClick={() => handleEditClick}
									className="template-edit-btn">
									EDIT
								</Button>
							</Link>
						)}
					</div>
					{renderTemplate()}
					{!fillMode && (
						<div className="text-center my-6">
							<Button
								type="button"
								variant="pdfButton"
								onClick={() => downloadPdf(resumeRef)}
								className="text-white w-96">
								Download
							</Button>
						</div>
					)}
				</div>
			)}
		</div>
	);
}

export default TemplatePage;
