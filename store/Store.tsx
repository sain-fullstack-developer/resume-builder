import {
	createSlice,
	createAsyncThunk,
	configureStore,
} from "@reduxjs/toolkit";

import formSlice from "./reducers/FormSlice";
import errorSlice from "./reducers/ErrorsSlice";
import { apiDataTypes } from "../utils/typeInterfaces";
import userIdSlice from "./reducers/UserIdSlice";

export const postFormData = createAsyncThunk(
	"submitData/postFormData",
	async (formData: any) => {
		localStorage.setItem("data", JSON.stringify(formData));
	}
);

export const updateFormData = createAsyncThunk(
	"submitData/putFormData",
	async (formData: any) => {
		localStorage.setItem("data", formData);
	}
);

export const fetchFormApiData = createAsyncThunk<any, any>(
	"apiData/fetchFormApiData",
	async () => {
		const data = localStorage.getItem("data");
		const response = data ? JSON.parse(data) : "";
		return response;
	}
);

const formPostDataSlice = createSlice({
	name: "postFormData",
	initialState: { data: [], loading: false, error: null } as any,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(postFormData.pending, (state: any) => {
				state.loading = true;
			})
			.addCase(postFormData.fulfilled, (state: any, action: any) => {
				state.loading = false;
				state.data = action.payload;
			})
			.addCase(postFormData.rejected, (state: any, action: any) => {
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

const formUpdateDataSlice = createSlice({
	name: "putFormData",
	initialState: { data: [], loading: false, error: null } as any,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(updateFormData.pending, (state: any) => {
				state.loading = true;
			})
			.addCase(updateFormData.fulfilled, (state: any, action: any) => {
				state.loading = false;
				state.data = action.payload;
			})
			.addCase(updateFormData.rejected, (state: any, action: any) => {
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

const apiDataSlice = createSlice({
	name: "apiData",
	initialState: {
		data: [] as any[] | apiDataTypes,
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchFormApiData.pending, (state: any) => {
				state.loading = true;
			})
			.addCase(fetchFormApiData.fulfilled, (state: any, action: any) => {
				state.loading = false;
				state.data = action.payload;
			})
			.addCase(fetchFormApiData.rejected, (state: any, action: any) => {
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

const store = configureStore({
	reducer: {
		apiData: apiDataSlice.reducer,
		formPostData: formPostDataSlice.reducer,
		formUpdateData: formUpdateDataSlice.reducer,
		form: formSlice.reducer,
		errors: errorSlice.reducer,
		userId: userIdSlice.reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
	devTools: true,
});

export default store;
