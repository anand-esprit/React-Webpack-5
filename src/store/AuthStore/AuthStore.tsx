import { makeAutoObservable } from "mobx";
import axios from "axios";
import { doLoginType, doRegisterType, userType } from "./AuthInterface";
import RootStore from "../RootStore/RootStore";
import API_URL from "../../config/ApiUrl";

export default class AuthStore {
	// Variables
	public user?: userType;
	public token?: string;
	public app_loading: boolean;
	public email?: string;
	private rootStore: RootStore;

	constructor() {
		this.app_loading = true;
		this.rootStore = new RootStore();
		makeAutoObservable(this);
	}

	// Initiate Application Functions
	public InitializeApp = (): void => {
		this.rootStore.setNotificationConfig();
		this.rootStore.setAxiosBaseUrl();
		this.rootStore.setAxiosInterceptor();
		this.setupHeaders(localStorage.getItem("token") ?? "");
	};

	public setupHeaders = (access_token?: string): void => {
		this.setAppLoading(true);
		this.rootStore
			.setAxiosHeaders(access_token)
			.then((token) => {
				this.setToken(token);
				this.fetchAuthUser();
			})
			.catch(() => {
				this.setToken();
				this.setUser();
				this.setAppLoading(false);
			});
	};

	// Setter Functions
	public setUser = (value?: userType): void => {
		this.user = value;
	};
	public setToken = (value?: string): void => {
		this.token = value;
	};
	public setAppLoading = (value: boolean): void => {
		this.app_loading = value;
	};
	public setEmail = (value: string): void => {
		this.email = value;
	};

	// API Functions
	public doLogin = async (payload: doLoginType): Promise<any> => {
		return await axios
			.post(API_URL.LOGIN_WITH_EMAIL, payload)
			.then(({ data }) => {
				this.setupHeaders(data.access_token);
				return data;
			})
			.catch(({ data }) => {
				this.setToken();
				this.setUser();
				return Promise.reject(data);
			});
	};

	public doRegister = async (payload: doRegisterType): Promise<any> => {
		return await axios.post(API_URL.REGISTER_WITH_EMAIL, payload).then(() => {
			this.setEmail(payload.email);
		});
	};

	public fetchAuthUser = async (): Promise<any> => {
		return await axios
			.post(API_URL.ME)
			.then(({ data }) => {
				this.setUser(data.user);
				return data;
			})
			.catch(({ data }) => {
				this.setToken();
				this.setUser();
				return Promise.reject(data);
			})
			.finally(() => this.setAppLoading(false));
	};
}
