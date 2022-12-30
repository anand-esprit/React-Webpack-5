import axios from "axios";
import { makeAutoObservable } from "mobx";
import API_URL from "../../config/ApiUrl";
import { UserListDataProps } from "./UserInterface";

export default class UserStore {
	public list_data?: UserListDataProps[];

	constructor() {
		makeAutoObservable(this);
	}

	// Setter Functions
	private setListData = (value?: UserListDataProps[]): void => {
		this.list_data = value;
	};

	// API Functions
	public fetchList = async (): Promise<any> => {
		return await axios.post(API_URL.USER.LIST).then(({ data }) => {
			this.setListData(data.data);
		});
	};
}
