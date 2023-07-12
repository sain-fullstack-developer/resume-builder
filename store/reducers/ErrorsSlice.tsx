import { createSlice } from "@reduxjs/toolkit";
import {
	fileDataObject,
	hobbiesObject,
	interestObject,
	languageObject,
	projectObject,
} from "../../utils/globalVariables";
import { LanguageObj, ProjectObj } from "../../utils/typeInterfaces";
import { FileData, hobbiesObj, interestObj } from "./FormSlice";

interface educationErrorType {
	year: string;
	percentage: string;
	details: string;
}

const educationErrorState = {
	year: "",
	percentage: "",
	details: "",
};

interface experienceErrorType {
	startYear: string;
	endYear: string;
	designation: string;
	companyName: string;
	details: string;
}
const experienceErrorState = {
	startYear: "",
	endYear: "",
	designation: "",
	companyName: "",
	details: "",
};

interface ratingsType {
	title: string;
	rating: string;
}

export interface ErrorsFormState {
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
	inputSets: educationErrorType[];
	techSkills: string[];
	experience: experienceErrorType[];
	projects: ProjectObj[];
	expertise: ratingsType[];
	skills: ratingsType[];
	languages: LanguageObj[];
	[key: string]: any;
}
const initialState: ErrorsFormState = {
	fileCV: fileDataObject,
	fullName: "",
	fileData: fileDataObject,
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
	objective: "",
	inputSets: [educationErrorState],
	techSkills: [],
	experience: [experienceErrorState],
	projects: [projectObject],
	expertise: [
		{
			title: "",
			rating: "",
		},
	],
	skills: [
		{
			title: "",
			rating: "",
		},
	],
	languages: [languageObject],
};

const errorSlice = createSlice({
	name: "errors",
	initialState,
	reducers: {
		updateError: (state, action) => {
			const { field, value, index, item } = action.payload;
			if (!index && !item && index === undefined && item === undefined) {
				state[field] = value;
			} else {
				state[field][index][item] = value;
			}
		},
		addErrorItem: (state, action) => {
			const { field, item } = action.payload;

			state[field].push(item);
		},
	},
});

export const { updateError, addErrorItem } = errorSlice.actions;

export default errorSlice;
