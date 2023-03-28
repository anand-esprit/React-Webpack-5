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

export const ACOActionRequest: RequestProps = {
  name: [
    { required: true, message: Message().required.text("Name") },
    { max: 100, message: Message().max.string(100, "Name") },
  ],
  controller: [
    { required: true, message: Message().required.text("Controller") },
  ],
  action: [
    { required: true, message: Message().required.text("Action") },
    { max: 50, message: Message().max.string(50, "Action") },
  ],
  description: [
    { max: 225, message: Message().max.string(225, "Description") },
  ],
  sort_order: [
    // { max: 32767, message: Message().max.string(32767, "Sort Order") },
  ],
};

export const ACOSectionRequest: RequestProps = {
  name: [
    { required: true, message: Message().required.text("Name") },
    { max: 100, message: Message().max.string(100, "Name") },
  ],
  controller: [
    { required: true, message: Message().required.text("Controller") },
    { max: 50, message: Message().max.string(50, "Controller") },
  ],
  parent_id: [{ required: false }],
  description: [
    { max: 225, message: Message().max.string(225, "Description") },
  ],
  sort_order: [
    // { max: 32767, message: Message().max.string(32767, "Sort Order") },
  ],
};

export const UserRoleRequest: RequestProps = {
  name: [
    { required: true, message: Message().required.text("Name") },
    { max: 100, message: Message().max.string(100, "Name") },
  ],
  code: [{ required: true, message: Message().required.text("Code") }],
  description: [
    { max: 225, message: Message().max.string(225, "Description") },
  ],
};

export const ACOOfficerSectionRequest: RequestProps = {
  name: [
    { required: true, message: Message().required.text("Name") },
    { max: 100, message: Message().max.string(100, "Name") },
  ],
  nav_name: [
    { required: true, message: Message().required.text("Nav Name") },
    { max: 100, message: Message().max.string(100, "Nav Name") },
  ],
  desc: [{ max: 225, message: Message().max.string(225, "Description") }],
  view_opt: [
    { required: true, message: Message().required.text("View Option") },
  ],
  value: [{ max: 50, message: Message().max.string(225, "Value") }],
  action: [{ max: 50, message: Message().max.string(225, "Action") }],
  web_url: [{ max: 255, message: Message().max.string(225, "Web URL") }],
  place_call: [{ max: 100, message: Message().max.string(225, "Place Call") }],
  email: [
    { max: 100, message: Message().max.string(225, "Email") },
    { type: "email", message: Message().email("Email") },
  ],
  sort_order: [
    // { max: 32767, message: Message().max.string(32767, "Sort Order") },
  ],
};

export const DepartmentRequest: RequestProps = {
  name: [
    { required: true, message: Message().required.text("Name") },
    { max: 100, message: Message().max.string(100, "Name") },
  ],
  code: [{ required: true, message: Message().required.text("Code") }],
  escalate_email1: [
    { max: 100, message: Message().max.string(225, "Escalate Email") },
    { type: "email", message: Message().email("Email") },
  ],
};

export const TopicRequest: RequestProps = {
  name: [
    { required: true, message: Message().required.text("Name") },
    { max: 100, message: Message().max.string(100, "Name") },
  ],
  name_hi: [{ max: 100, message: Message().max.string(100, "Name Hi") }],
  is_map: [{ required: true, message: Message().required.select("Is Map") }],
  authenticated: [
    { required: true, message: Message().required.select("Authenticated") },
  ],
  disclaimer_link: [
    { max: 191, message: Message().max.string(100, "Disclaimer Link") },
  ],
  description: [
    { max: 225, message: Message().max.string(225, "Description") },
  ],
  is_active: [
    { required: true, message: Message().required.select("Is Active") },
  ],
};

export const AgencyRequest: RequestProps = {
  name: [
    { required: true, message: Message().required.text("Name") },
    { max: 100, message: Message().max.string(100, "Name") },
  ],
  type: [{ max: 50, message: Message().max.string(50, "type") }],
};

export const ToiletRequest: RequestProps = {
  name: [
    { required: true, message: Message().required.text("Name") },
    { max: 100, message: Message().max.string(100, "Name") },
  ],
  address: [{ max: 255, message: Message().max.string(255, "Address") }],
};

export const DustbinRequest: RequestProps = {
  name: [
    { required: true, message: Message().required.text("Name") },
    { max: 100, message: Message().max.string(100, "Name") },
  ],
  address: [{ max: 255, message: Message().max.string(255, "Address") }],
};

export const DesignationRequest: RequestProps = {
  name: [
    { required: true, message: Message().required.text("Name") },
    { max: 100, message: Message().max.string(100, "Name") },
  ],
  department_id: [{ required: false }],
  is_active: [
    { required: true, message: Message().required.select("Is Active") },
  ],
};

export const CitizenMenuRequest: RequestProps = {
  name: [
    { required: true, message: Message().required.text("Name") },
    { max: 100, message: Message().max.string(100, "Name") },
  ],
  nav_name: [
    { required: true, message: Message().required.text("Nav Name") },
    { max: 100, message: Message().max.string(100, "Nav Name") },
  ],
  sort_order: [
    // { max: 32767, message: Message().max.string(32767, "Sort Order") },
  ],
};

export const SubZoneRequest: RequestProps = {
  name: [
    { required: true, message: Message().required.text("Name") },
    { max: 100, message: Message().max.string(100, "Name") },
  ],
  code: [
    { required: true, message: Message().required.text("Code") },
    // { max: 50, message: Message().max.string(50, "Code") },
  ],
  back_color: [
    { required: false },
    { max: 20, message: Message().max.string(20, "Back Color") },
  ],
  visible_to_officer: [
    { required: true, message: Message().required.text("Visible To Officer") },
    // { max: 50, message: Message().max.string(50, "Code") },
  ],
};

export const AreaRequest: RequestProps = {
  name: [
    { required: true, message: Message().required.text("Name") },
    { max: 100, message: Message().max.string(100, "Name") },
  ],
  code: [
    { required: true, message: Message().required.text("Code") },
    // { max: 50, message: Message().max.string(50, "Code") },
  ],
  back_color: [
    { required: false },
    { max: 20, message: Message().max.string(20, "Back Color") },
  ],
  show_defined_area: [
    { required: true, message: Message().required.text("Show Defined Area") },
    // { max: 50, message: Message().max.string(50, "Code") },
  ],
};

export const PriorityRequest: RequestProps = {
  name: [
    { required: true, message: Message().required.text("Name") },
    { max: 100, message: Message().max.string(100, "Name") },
  ],
  code: [
    { required: true, message: Message().required.text("Code") },
    {
      pattern: Regex.numeric,
      message: "Only digit allow",
    },
    // { max: 50, message: Message().max.string(50, "Code") },
  ],
  is_active: [
    { required: true, message: Message().required.select("Is Active") },
  ],
};

export const ChallanStatusCodeRequest: RequestProps = {
  name: [
    { required: true, message: Message().required.text("Name") },
    { max: 100, message: Message().max.string(100, "Name") },
  ],
  code: [
    { required: true, message: Message().required.text("Code") },
    // { max: 50, message: Message().max.string(50, "Code") },
  ],
  is_active: [
    { required: true, message: Message().required.select("Is Active") },
  ],
  desc: [
    { max: 225, message: Message().max.string(225, "Description") },
    { required: true, message: Message().required.select("Description") },
  ],
};

export const ACLOfficerList: RequestProps = {
  assign_to: [
    { required: true, message: Message().required.select("Assign to") },
  ],
  aro_user: [
    { required: true, message: Message().required.select("ARO User") },
  ],
  aro_group: [
    { required: true, message: Message().required.select("ARO Group") },
  ],
  os_names: [{ required: true, message: Message().required.select("OS Name") }],
  department_ids: [
    { required: true, message: Message().required.select("Department") },
  ],
  designation_ids: [
    { required: true, message: Message().required.select("Designation") },
  ],
  aco_ids: [
    { required: true, message: Message().required.select("ACO Action") },
  ],
  user_check: [
    { required: true, message: Message().required.select("User Check") },
  ],
  sort_order: [
    { required: true, message: Message().required.text("Sort Order") },
    {
      pattern: Regex.numeric,
      message: "Only digit allow",
    },
  ],
  desc: [{ max: 225, message: Message().max.string(225, "Description") }],
};

export const ACOCitizenSectionRequest: RequestProps = {
  name: [
    { required: true, message: Message().required.text("Name") },
    { max: 100, message: Message().max.string(100, "Name") },
  ],
  nav_name: [
    { required: true, message: Message().required.text("Nav Name") },
    { max: 100, message: Message().max.string(100, "Nav Name") },
  ],
  name_hi: [{ max: 100, message: Message().max.string(100, "Name In Hindi") }],
  desc: [{ max: 225, message: Message().max.string(225, "Description") }],
  view_opt: [
    { required: true, message: Message().required.text("View Option") },
  ],
  value: [{ max: 50, message: Message().max.string(225, "Value") }],
  web_url: [{ max: 255, message: Message().max.string(225, "Web URL") }],
  place_call: [{ max: 100, message: Message().max.string(225, "Place Call") }],
  email: [
    { max: 100, message: Message().max.string(225, "Email") },
    { type: "email", message: Message().email("Email") },
  ],
  sort_order: [
    // { max: 32767, message: Message().max.string(32767, "Sort Order") },
  ],
  is_login_required: [
    { required: true, message: Message().required.text("Is Login") },
  ],
};

export const CategoryRequest: RequestProps = {
  name: [
    { required: true, message: Message().required.text("Name") },
    { max: 255, message: Message().max.string(255, "Name") },
  ],
  name_hi: [{ max: 100, message: Message().max.string(100, "Name Hindi") }],
  agency_ref_id: [
    { max: 100, message: Message().max.string(100, "Agency Reference ID") },
    // {
    //   pattern: Regex.numeric,
    //   message: "Only digit allow",
    // }
  ],
  is_active: [
    { required: true, message: Message().required.select("Is Active") },
  ],
  module: [{ required: true, message: Message().required.select("Module") }],
};

export const ChannelRequest: RequestProps = {
  name: [
    { required: true, message: Message().required.text("Name") },
    { max: 255, message: Message().max.string(255, "Name") },
  ],
  type: [
    { required: true, message: Message().required.text("Type") },
    { max: 50, message: Message().max.string(50, "Type") },
  ],
  is_active: [
    { required: true, message: Message().required.select("Is Active") },
  ],
};

export const ChecklistCategoryRequest: RequestProps = {
  name: [
    { required: true, message: Message().required.text("Name") },
    { max: 100, message: Message().max.string(100, "Name") },
  ],
  code: [
    { required: true, message: Message().required.text("Code") },
    {
      pattern: Regex.numeric,
      message: "Only digit allow",
    },
  ],
  desc: [{ max: 5000, message: Message().max.string(5000, "Description") }],
  is_active: [
    { required: true, message: Message().required.select("Is Active") },
  ],
};

export const SubCategoryRequest: RequestProps = {
  cat_id: [{ required: true, message: Message().required.select("Category") }],
  name: [
    { required: true, message: Message().required.text("Name") },
    { max: 255, message: Message().max.string(255, "Name") },
  ],
  name_hi: [
    { max: 255, message: Message().max.string(255, "Category Name Hindi") },
  ],
  agency_ref_id: [
    { max: 100, message: Message().max.string(100, "Agency Reference ID") },
  ],
  swachta_cat_id: [
    { max: 100, message: Message().max.string(100, "Swachta Cat") },
  ],
  valid_option: [
    { max: 255, message: Message().max.string(255, "Valid Option") },
  ],
  is_dept_from_subzone: [
    {
      required: true,
      message: Message().required.select(
        "Department as per Geolocation(Subzone)"
      ),
    },
  ],
  code: [
    { required: true, message: Message().required.text("Code") },
    {
      pattern: Regex.numeric,
      message: "Only digit allow",
    },
  ],
  is_active: [
    { required: true, message: Message().required.select("Is Active") },
  ],
};

export const InspectionAreaRequest: RequestProps = {
  name: [{ required: true, message: Message().required.text("Name") }],
};

export const ChecklistRequest: RequestProps = {
  title: [
    { required: true, message: Message().required.text("Title") },
    { max: 255, message: Message().max.string(255, "Title") },
  ],
  desc: [{ max: 255, message: Message().max.string(255, "Description") }],
};
