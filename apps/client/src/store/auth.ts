import {
	authControllerLogin,
	authControllerLoginWithToken,
} from "@api/services/auth";
import { SessionDto } from "@api/services/models";
import { create } from "zustand";

interface AuthStore {
	session: SessionDto | null;
	signIn: (email: string, password: string) => Promise<void>;
	signOut: () => Promise<void>;
	signInWithToken: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
	session: null,
	async signIn(email, password) {
		const session = await authControllerLogin({ email, password });
		localStorage.setItem("access_token", session.accessToken);
		localStorage.setItem("refresh_token", session.refreshToken);
		set({ session });
	},
	async signOut() {
		localStorage.removeItem("access_token");
		localStorage.removeItem("refresh_token");
		set({ session: null });
		window.location.href = "/login";
	},
	async signInWithToken() {
		const accessToken = localStorage.getItem("access_token");
		const refreshToken = localStorage.getItem("refresh_token");
		if (accessToken && refreshToken) {
			try {
				const session = await authControllerLoginWithToken({
					accessToken,
					refreshToken,
				});
				localStorage.setItem("access_token", session.accessToken);
				localStorage.setItem("refresh_token", session.refreshToken);
				set({ session });
			} catch (error) {
				localStorage.removeItem("access_token");
				localStorage.removeItem("refresh_token");
				window.location.reload();
			}
		}
	},
}));
