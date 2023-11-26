import { AxiosInstance } from "axios";
import { AlertService } from "./AlertService";
import { LoaderService } from "./LoaderService";

export class InterceptorService {
	public constructor(private _axiosInstance: AxiosInstance) {}

	public addRequestInterceptor(): this {
		this._axiosInstance.interceptors.request.use(
			(config) => {
				if (["post", "put", "delete"].includes(config.method || "")) {
					LoaderService.instance.showLoader();
				}
				const accessToken = localStorage.getItem("access_token");
				if (accessToken) {
					config.headers["Authorization"] = `Bearer ${accessToken}`;
				}
				const refreshToken = localStorage.getItem("refresh_token");
				if (refreshToken) {
					config.headers["refresh_token"] = refreshToken;
				}

				return config;
			},
			(error) => {
				return Promise.reject(error);
			}
		);
		return this;
	}

	public addResponseInterceptor(): this {
		this._axiosInstance.interceptors.response.use(
			(response) => {
				if (["post", "put", "delete"].includes(response.config.method || "")) {
					if (response.data?.message) {
						AlertService.instance.successMessage(response.data.message);
					}
				}
				LoaderService.instance.hideLoader();
				return response;
			},
			(error) => {
				console.error("[InterceptorService] error", error);
				// check the error status code

				if (![401, 404, 500].includes(error.response?.status || 0)) {
					const message = error.response?.data?.message;
					if (message) {
						AlertService.instance.errorMessage(message);
					}
				}
				LoaderService.instance.hideLoader();
				return Promise.reject(error);
			}
		);
		return this;
	}
}
