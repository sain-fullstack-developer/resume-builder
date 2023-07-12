import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserIdState {
	value: string | null;
}

const initialState: UserIdState = {
	value: "",
};

export const userIdSlice = createSlice({
	name: "userId",
	initialState,
	reducers: {
		setUserId: (state, action: PayloadAction<string>) => {
			state.value = action.payload;
		},
	},
});

export const { setUserId } = userIdSlice.actions;

export default userIdSlice;
