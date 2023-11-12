import { environment } from "@environment";
import { Session, User, createClient } from "@supabase/supabase-js";
import { create } from "zustand";

interface AuthStore {
	user: User | null;
	session: Session | null;
	signIn: (email: string, password: string) => Promise<void>;
	signOut: () => Promise<void>;
}

const supabase = createClient(environment.supbaseUrl, environment.supabaseKey);

export const useAuthStore = create<AuthStore>((set) => ({
	user: null,
	session: null,
	async signIn(email, password) {
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});
		if (error) {
			console.error(error);
			set({ user: null, session: null });
			return;
		}
		set({ user: data.user, session: data.session });
	},
	async signOut() {
		await supabase.auth.signOut();
		set({ user: null, session: null });
		window.location.reload();
	},
}));
