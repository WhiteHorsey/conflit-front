import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthService from "../../services/AuthService";
import {
	getUserfromAccessToken,
	getUserIdFromAccessToken,
} from "../../utils/jwtUtils";
import { withCookies, Cookies } from "react-cookie";
import { toast } from "react-toastify";

const modulePrefix = "authStore";

const initialState = {
	user: null,
	isLoading: false,
};

export const register = createAsyncThunk(
	`${modulePrefix}/register`,
	async (request, { rejectWithValue }) => {
		try {
			return await AuthService.register(request);
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const login = createAsyncThunk(
	`${modulePrefix}/login`,
	async (request, { rejectWithValue }) => {
		try {
			const { data } = await AuthService.login(request);
			return data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const logout = createAsyncThunk(
	`${modulePrefix}/logout`,
	async (_, { rejectWithValue, getState }) => {
		try {
			const state = getState();
			const { data } = await AuthService.logout(
				getUserIdFromAccessToken(state.authStore.user.accessToken)
			);
			return data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const refreshToken = createAsyncThunk(
	`${modulePrefix}/refreshToken`,
	async (_, { rejectWithValue }) => {
		try {
			const { data } = await AuthService.refresh();
			return data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const authSlice = createSlice({
	name: "authStore",
	initialState,
	reducers: {
		resetStatus: (state) => {
			state.isLoading = false;
		},
	},
	extraReducers: (builder) => {
		builder
			// REGISTER
			.addCase(register.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(register.fulfilled, (state) => {
				state.isLoading = false;
				toast.success("Utilisateur ajouté avec succès");
			})
			.addCase(register.rejected, (state) => {
				state.isLoading = false;
				toast.error("Erreur, utilisateur ,'est pas ajouté");
			})
			// LOGIN
			.addCase(login.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(login.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				let newUser = getUserfromAccessToken(payload.accessToken);
				toast.success("Bonjour " + newUser?.firstName);
				state.user = newUser;
			})
			.addCase(login.rejected, (state) => {
				state.isLoading = false;
				toast.error("username /password not correct !");
			})
			// LOGOUT
			.addCase(logout.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(logout.fulfilled, (state) => {
				state.isLoading = false;
				state.user = null;
			})
			.addCase(logout.rejected, (state) => {
				state.isLoading = false;
				toast.error("Erruer du serveur");
			})
			// REFRESH
			.addCase(refreshToken.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(refreshToken.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.user = getUserfromAccessToken(payload.accessToken);
			})
			.addCase(refreshToken.rejected, (state, { payload }) => {
				state.isLoading = false;
				state.user = null;
				toast.warning("Votre session a expiré!");
			});
	},
});

export const { resetStatus } = authSlice.actions;

export const selectUser = (state) => state.authStore.user;
export const selectIsLoading = (state) => state.authStore.isLoading;

export default authSlice.reducer;
