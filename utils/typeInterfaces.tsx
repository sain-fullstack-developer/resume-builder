export interface ExpObj {
	startYear: Date | number;
	endYear: Date | number;
	companyName: string;
	designation: string;
	details: string;
}
export interface ProjectObj {
	projectName: string;
	projectUrl: string;
	details: string;
}
export interface ExpertiseObj {
	title: string;
	rating: Number;
}
export interface SkillsObj {
	title: string;
	rating: Number;
}
export interface LanguageObj {
	language: string;
	rating: Number;
}

export interface apiDataTypes {
	[field: string]: string | any;
	userId: string;
	fileCV: {
		fileDataArray: (string | number)[];
		fileName: string;
		fileType: string;
		imageUrl: string;
	};
	fileData: {
		fileDataArray: (string | number)[];
		fileName: string;
		fileType: string;
		imageUrl: string;
	};
	fullName: string;
	designation: string;
	profilePic: string;
	dob: string;
	age: number;
	gender: string;
	bop: string;
	location: string;
	phone: string;
	mail: string;
	interests: [
		{
			interest: string;
		}
	];
	hobbies: [
		{
			hobbie: string;
		}
	];
	objective: string;
	inputSets: [{ year: string; percentage: Number; details: string }];
	techSkills: string[];
	experience: ExpObj[];
	projects: ProjectObj[];
	expertise: ExpertiseObj[];
	skills: SkillsObj[];
	languages: LanguageObj[];
}
