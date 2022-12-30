import { ListProps } from "antd";

export type UserListDataProps = {
	bonus_figures: string | null;
	created_at: string;
	created_by: number | null;
	default_ledger_id: number;
	default_ledger_name: string;
	deleted_at: string | null;
	dm_settings: any;
	email: string;
	first_name: string;
	id: number;
	is_email: string | number;
	last_login_at: string;
	last_name: string;
	status: number;
	tempkey: string;
	updated_at: string;
	updated_by: number | null;
	user_role: {
		user_role_id: number;
		role_name: string;
	};
};

export interface UserListProps extends ListProps<any> {
	data: UserListDataProps[];
}
