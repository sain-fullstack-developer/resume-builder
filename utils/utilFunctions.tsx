import jsPDF from "jspdf";
import { apiDataTypes } from "./typeInterfaces";
import React from "react";
import { ErrorsFormState } from "../store/reducers/ErrorsSlice";
import html2canvas from "html2canvas";

export const staticImagesPath = (fileName: string) => {
	const path = `${process.env.PUBLIC_URL}/${fileName}`;
	return path;
};

export const downloadPdf = (element: any) => {
	const pdfWidth = 595.28;
	const pdfHeight =
		(element?.current?.offsetHeight * pdfWidth) / element?.current?.offsetWidth;
	html2canvas(element?.current).then((canvas) => {
		console.log(canvas);
		const imgData = canvas.toDataURL("image/png");
		const pdf = new jsPDF("p", "pt", [pdfWidth, pdfHeight]);
		pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
		pdf.save("LatestCV.pdf");
	});
};

export const getBulletPoints = (
	rating: number,
	bulletFull: string,
	bulletEmpty: string
) => {
	const bulletPoints = [];
	for (let i = 0; i < 5; i++) {
		bulletPoints.push(
			<li
				className={i < rating ? bulletFull : bulletEmpty}
				id="bullets"
				key={i}></li>
		);
	}
	return bulletPoints;
};

export function formatDate(dateString: Date | number) {
	const options: Record<string, string> = {
		day: "numeric",
		month: "long",
		year: "numeric",
	};
	const date = new Date(dateString);
	return new Intl.DateTimeFormat("en-US", options).format(date);
}

export function formDataLocalStorage(data: apiDataTypes) {
	localStorage.setItem("resume-data", JSON.stringify(data));
}
export function localStorageGetData() {
	const dataLocal = localStorage.getItem("resume-data");
	const data = dataLocal ? JSON.parse(dataLocal) : "";
	return data;
}

export function base64StringImage() {
	const base64String = localStorage.getItem("image");
	return base64String;
}

export const calculateAge = (event: number) => {
	const dob = new Date(event);
	const ageDiffMs = Date.now() - dob.getTime();
	const ageDate = new Date(ageDiffMs);
	const age = Math.abs(ageDate.getUTCFullYear() - 1970);
	return age;
};

export const hasErrors = (errorsState: ErrorsFormState) => {
	return Object.values(errorsState).some((error) => {
		if (Array.isArray(error)) {
			return error.some((errorObj) =>
				Object.values(errorObj).some(
					(nestedError) => typeof nestedError === "string" && nestedError !== ""
				)
			);
		} else if (typeof error === "string" && error !== "") {
			return true;
		}
		return false;
	});
};

// IMAGE FILE

export function getFileTypeFromBase64(base64Data: string) {
	const match = base64Data.match(/^data:([a-zA-Z+]+\/[a-zA-Z+]+);base64,/);
	if (match) {
		return match[1];
	}
	return null;
}

// MS DOC

export function extractMicrosoftDocFromBase64(dataURI: string) {
	const base64Data = dataURI.split(";base64,")[1];
	const binaryString = atob(base64Data);
	const bytes = new Uint8Array(binaryString.length);
	for (let i = 0; i < binaryString.length; i++) {
		bytes[i] = binaryString.charCodeAt(i);
	}

	const blob = new Blob([bytes], { type: "application/octet-stream" });

	const downloadLink = document.createElement("a");
	downloadLink.href = URL.createObjectURL(blob);
	const mimeType = dataURI.match(/^data:([a-zA-Z+]+\/[a-zA-Z+]+);base64,/)[1];
	let fileExtension;
	switch (mimeType) {
		case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
			fileExtension = "docx";
			break;
		case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
			fileExtension = "xlsx";
			break;
		case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
			fileExtension = "pptx";
			break;
		default:
			throw new Error("Invalid Microsoft Office document MIME type");
	}

	downloadLink.download = `document.${fileExtension}`;
	document.body.appendChild(downloadLink);
	downloadLink.click();
	document.body.removeChild(downloadLink);
	URL.revokeObjectURL(downloadLink.href);
}

export function bytesToKB(bytes: number) {
	return (bytes / 1024).toFixed(2);
}

// PDF DOC
