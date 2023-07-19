import React from "react";
import MyDropzone from "./DropZone";

interface inputFieldProps {
	label?: string;
	placeholder: string;
	type: string;
	onChange: (values: any) => void;
	onFocus?: (values: any) => void;
	className?: string;
	value?: string | number | Number | Date | any;
	id?: string;
	name?: string;
	errorMessage?: string;
	dropZone?: Boolean;
	readonly?: boolean;
	onDrop?: (acceptedFiles: any[]) => Promise<void>;
	min?: number;
	max?: number;
	required?: boolean;
	labelClass?: string;
	inputClass?: string;
	dropClass?: string;
	dropzonePlaceholder?: string;
	docFiles?: boolean;
	iconClass?: string;
	uploadedImage?: string | undefined;
	uploadedCV?: string | undefined;
	errorClass?: string;
}

function InputField(props: inputFieldProps) {
	const {
		dropClass,
		label,
		placeholder,
		dropzonePlaceholder,
		type,
		onChange,
		onFocus,
		className,
		value,
		id,
		name,
		errorMessage,
		dropZone,
		onDrop,
		readonly,
		min,
		max,
		labelClass,
		inputClass,
		docFiles,
		iconClass,
		uploadedImage,
		uploadedCV,
		errorClass,
		...properties
	} = props;
	return (
		<>
			{dropZone ? (
				<MyDropzone
					placeholder={dropzonePlaceholder ? dropzonePlaceholder : ""}
					dropClass={dropClass}
					iconClass={iconClass}
					onDrop={onDrop}
					docFiles={docFiles}
					uploadedImage={uploadedImage}
					uploadedCV={uploadedCV}
				/>
			) : (
				<div
					key={id}
					className={
						className ? `${className} flex flex-col` : `flex flex-col`
					}>
					{label && <label className={labelClass}>{label}</label>}
					<input
						value={value}
						placeholder={placeholder}
						className={`input-global-class ${inputClass}`}
						type={type}
						name={name}
						min={min}
						max={max}
						readOnly={readonly}
						onFocus={onFocus}
						onChange={onChange}
						{...properties}
					/>
					<div className={`${errorClass} h-2 ml-4`}>
						{errorMessage && (
							<span className="font-semibold text-red-700 text-lg">
								{errorMessage}
							</span>
						)}
					</div>
				</div>
			)}
		</>
	);
}

export default InputField;
