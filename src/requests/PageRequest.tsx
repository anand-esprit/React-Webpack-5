import { RequestProps } from "../config/InterfacesAndTypes";
import Message from "../config/Message";
import { Regex } from "../config/Validators";

export const AppMasterRequest: RequestProps = {
  app_name: [
    { required: true, message: Message().required.text("App Name") },
    { max: 100, message: Message().max.string(100, "App Name") },
  ],
  api_key: [
    { required: true, message: Message().required.text("Api Key") },
    { max: 100, message: Message().max.string(100, "Api Key") },
  ],
  officer_app_name: [
    { required: true, message: Message().required.text("Officer App Name") },
    { max: 100, message: Message().max.string(100, "Officer App Name") },
  ],
  citizen_app_name: [
    { required: true, message: Message().required.text("Citizen App Name") },
    { max: 100, message: Message().max.string(100, "Citizen App Name") },
  ],
  def_timezone: [
    { required: true, message: Message().required.text("Def Timezone") },
    { max: 100, message: Message().max.string(100, "Def Timezone") },
  ],
  source_domain: [
    { required: true, message: Message().required.text("Source Domain") },
    { max: 255, message: Message().max.string(255, "Source Domain") },
  ],
  from_email: [
    { required: true, message: Message().required.text("From Email") },
    { max: 100, message: Message().max.string(100, "From Email") },
    { type: "email", message: Message().email("From Email") },
  ],
  admin_email: [
    { required: true, message: Message().required.text("Admin Email") },
    { max: 100, message: Message().max.string(100, "Admin Email") },
    { type: "email", message: Message().email("Admin Email") },
  ],
  auto_feedback_subject: [
    {
      required: true,
      message: Message().required.text("Auto Feddback Subject"),
    },
    { max: 100, message: Message().max.string(100, "Auto Feddback Subject") },
  ],
  auto_registration_subject: [
    {
      required: true,
      message: Message().required.text("Auto Registration Subject"),
    },
    {
      max: 100,
      message: Message().max.string(100, "Auto Registration Subject"),
    },
  ],
  feedback_subject: [
    { required: true, message: Message().required.text("Feedback Subject") },
    { max: 100, message: Message().max.string(100, "Feedback Subject") },
  ],
  reset_password_subject: [
    {
      required: true,
      message: Message().required.text("Reset Password Subject"),
    },
    { max: 100, message: Message().max.string(100, "Reset Password Subject") },
  ],
  post_comments_limit: [
    { required: true, message: Message().required.text("Post Comment Limit") },
    {
      pattern: Regex.numeric,
      message: "Only digit allow",
    },
  ],
  is_city_range_check: [
    { required: true, message: Message().required.text("Is City Range Check") },
  ],
  sms_phone_verification: [
    {
      required: true,
      message: Message().required.text("SMS Phone Verification"),
    },
  ],
  only_mobile_login: [
    { required: true, message: Message().required.text("Only Mobile Login") },
  ],
  is_mobile_required: [
    { required: true, message: Message().required.text("Is Mobile Required") },
  ],
  is_email_required: [
    { required: true, message: Message().required.text("Is Email Required") },
  ],
  is_active: [
    { required: true, message: Message().required.text("Is Active") },
  ],
  geo_area: [{ required: true, message: Message().required.text("Geo Area") }],
  project_list_by: [
    { required: true, message: Message().required.text("Project List By") },
  ],
  moderators: [
    { required: true, message: Message().required.text("Moderators") },
  ],
  dept_wise_subcat: [
    { required: true, message: Message().required.text("Dept Wise Subcat") },
  ],
  is_show_department_who_is_in: [
    {
      required: true,
      message: Message().required.text("Is Show Department Who Is In"),
    },
  ],
  is_swachta_integration: [
    {
      required: true,
      message: Message().required.text("Is Swachta Integration"),
    },
  ],
  is_face_rec_enable: [
    {
      required: true,
      message: Message().required.text("Is Face Recognization Enable"),
    },
  ],
  is_places_enabled: [
    {
      required: true,
      message: Message().required.text("Is Places Enable"),
    },
  ],
  is_menu_grouping: [
    {
      required: true,
      message: Message().required.text("Is Menu Grouping"),
    },
  ],
  upgrade_301: [
    { required: true, message: Message().required.text("Upgrade 301") },
  ],
  upgrade_300: [
    { required: true, message: Message().required.text("Upgrade 300") },
  ],
  officer_app_upgrade_301: [
    {
      required: true,
      message: Message().required.text("Officer App Upgrade 301"),
    },
  ],
  officer_app_upgrade_300: [
    {
      required: true,
      message: Message().required.text("Officer App Upgrade 300"),
    },
  ],
  logo_url: [
    {
      required: true,
      message: Message().required.text("Logo url"),
    },
  ],
  fav_icon: [
    {
      required: true,
      message: Message().required.text("Fav url"),
    },
  ],
};