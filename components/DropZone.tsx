import React from "react";
import { useDropzone } from "react-dropzone";
import { staticImagesPath } from "../utils/utilFunctions";
import Image from "next/image";

interface MyDropzoneProps {
	onDrop: (acceptedFiles: any[]) => Promise<void>;
	dropClass?: string;
	iconClass?: string;
	placeholder: string;
	docFiles?: boolean;
	uploadedImage?: string | undefined;
	uploadedCV?: string | undefined;
}

export default function MyDropzone({
	onDrop,
	dropClass,
	iconClass,
	placeholder,
	docFiles = false,
	uploadedImage,
	uploadedCV,
}: MyDropzoneProps) {
	const { getRootProps, getInputProps } = useDropzone({ onDrop });

	return (
		<div
			className={
				dropClass
					? `${dropClass} relative my-8 cursor-pointer`
					: `w-1/2 bg-white p-4 mb-8 rounded-s-full rounded-t-full relative cursor-pointer`
			}
			{...getRootProps()}>
			<div
				className={
					iconClass
						? `${iconClass} absolute`
						: "absolute right-2 top-4 cursor-pointer"
				}>
				<Image
					width={32}
					height={32}
					src={docFiles ? "/file-upload.png" : "/upload.png"}
					alt="upload-files"
					className="w-8 h-8"
				/>
			</div>
			<input {...getInputProps()} />
			<p
				className={`${
					uploadedImage || uploadedCV ? "text-black" : "text-white"
				} uppercase tracking-widest z-50`}>
				{uploadedImage && placeholder.length < 18
					? placeholder
					: uploadedImage && placeholder.length > 18
					? placeholder.slice(0, 16) + "." + placeholder.split(".")[1]
					: placeholder}
			</p>
			{uploadedImage ? (
				<>
					<Image
						width={100}
						height={100}
						className="h-full w-full rounded-full absolute z-0"
						src={uploadedImage}
						alt="new"
					/>
				</>
			) : uploadedCV ? (
				<iframe
					className="w-full h-full absolute z-0 rounded-lg overflow-y-hidden"
					title="uploaded-CV"
					src={uploadedCV}
					style={{ scrollbarWidth: "none" }}
				/>
			) : (
				""
			)}
		</div>
	);
}
