import { ListProps } from "antd";

export type AppMasterListDataProps = {
  admin_email: string;
  app_name: string;
  auto_feedback_subject: string;
  auto_registration_subject: string;
  officer_app_name: string;
  citizen_app_name: string;
  def_timezone: string;
  fav_icon: string;
  feedback_subject: string;
  from_email: string;
  geo_area: string | null;
  id: number;
  is_active: number;
  is_city_range_check: number;
  is_email_required: number;
  is_mobile_required: number;
  logo_url: string | null;
  mobile_form_html_api_url: string;
  only_mobile_login: number;
  post_comments_limit: number;
  reset_password_subject: string;
  sms_phone_verification: number;
  source_domain: string;
  api_key: string;
  moderators: string;
  project_list_by: string;
  dept_wise_subcat: string;
  is_show_department_who_is_in: boolean;
  upgrade_301: string;
  upgrade_300: string;
  officer_app_upgrade_301: string;
  officer_app_upgrade_300: string;
};

export interface AppMasterListProps extends ListProps<any> {
  data: AppMasterListDataProps[];
}
