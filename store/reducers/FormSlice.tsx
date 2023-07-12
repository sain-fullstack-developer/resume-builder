import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
	educationObject,
	experienceObject,
	expertiseObject,
	hobbiesObject,
	interestObject,
	languageObject,
	objectiveString,
	projectObject,
	skillsObject,
} from "../../utils/globalVariables";
import {
	ExpObj,
	ExpertiseObj,
	LanguageObj,
	ProjectObj,
	SkillsObj,
} from "../../utils/typeInterfaces";

export interface FileData {
	fileName: string;
	fileType: string;
	fileDataArray: null | any[];
	imageUrl: string;
}

export interface interestObj {
	interest: string;
}
export interface hobbiesObj {
	hobbie: string;
}
export interface educationObj {
	year: string;
	percentage: Number | number;
	details: string;
}

export interface FormState {
	fields: {
		fileCV: FileData;
		fullName: string;
		fileData: FileData;
		designation: string;
		dob: string;
		age: string;
		gender: string;
		bop: string;
		location: string;
		phone: string;
		mail: string;
		interests: interestObj[];
		hobbies: hobbiesObj[];
		objective: string;
		inputSets: educationObj[];
		techSkills: string[];
		experience: ExpObj[];
		projects: ProjectObj[];
		expertise: ExpertiseObj[];
		skills: SkillsObj[];
		languages: LanguageObj[];
	};
}

const initialState: FormState = {
	fields: {
		fileCV: {
			fileName: "",
			fileType: "",
			fileDataArray: null,
			imageUrl: "",
		},
		fullName: "",
		fileData: {
			fileName: "",
			fileType: "",
			fileDataArray: null,
			imageUrl: "",
		},
		designation: "",
		dob: "",
		age: "",
		gender: "",
		bop: "",
		location: "",
		phone: "",
		mail: "",
		interests: [interestObject],
		hobbies: [hobbiesObject],
		objective: objectiveString,
		inputSets: [educationObject],
		techSkills: [],
		experience: [experienceObject],
		projects: [projectObject],
		expertise: [expertiseObject],
		skills: [skillsObject],
		languages: [languageObject],
	},
};

const formSlice = createSlice({
	name: "form",
	initialState,
	reducers: {
		updateField: (
			state: FormState,
			action: PayloadAction<{ field: keyof FormState["fields"]; value: any }>
		) => {
			const { field, value } = action.payload;
			if (field === "fileData") {
				state.fields[field] = value;

				console.log(value);
			} else {
				state.fields[field] = value;
			}
		},

		addItem: (
			state: FormState,
			action: PayloadAction<{ field: keyof FormState["fields"]; item: any }>
		) => {
			const { field, item } = action.payload;
			(state.fields[field] as Object[])?.push(item);
		},

		updateItem: (
			state,
			action: PayloadAction<{
				field: keyof FormState["fields"];
				index: any;
				item: any[];
			}>
		) => {
			const { field, index, item } = action.payload;
			if (Array.isArray(state.fields[field])) {
				(state.fields[field] as any[])[index] = item;
			}
		},

		deleteItem: (
			state,
			action: PayloadAction<{
				field: keyof FormState["fields"];
				index: any;
			}>
		) => {
			const { field, index } = action.payload;

			if (Array.isArray(state.fields[field])) {
				(state.fields[field] as any[]).splice(index, 1);
			}
		},
	},
});

export const { updateField, addItem, updateItem, deleteItem } =
	formSlice.actions;

export default formSlice;
