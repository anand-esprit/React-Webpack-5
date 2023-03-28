const API_URL = {
  // AUTH api url
  LOGIN: "auth/login",
  LOGOUT: "auth/logout",
  ACCESSMENU_ADMIN: "auth/get_access_menu_list_for_super_admin",

  // App Master
  APP_MASTER: {
    LIST: "app_master/index",
    ADD: "app_master/new",
    DESTROY: "app_master/destroy",
    EDIT: "app_master/edit",
    ACTIVATE: "app_master/activate",
    DEACTIVATE: "app_master/deactivate",
  },

  //ACO Action
  ACO_ACTION: {
    LIST: "aco_action/index",
    ADD: "aco_action/new",
    DESTROY: "aco_action/destroy",
    EDIT: "aco_action/edit",
    LOV: "aco_action/lov",
  },

  //ACO Section
  ACO_SECTION: {
    LIST: "aco_section/index",
    ADD: "aco_section/new",
    DESTROY: "aco_section/destroy",
    EDIT: "aco_section/edit",
    LOV: "aco_section/lov",
  },

  //User Role
  USER_ROLE: {
    LIST: "role/index",
    ADD: "role/new",
    DESTROY: "role/destroy",
    EDIT: "role/edit",
    LOV: "role/lov",
  },

  //ACL list
  ACLLIST: {
    LIST: "acl_list/index",
    ADD: "acl_list/new",
    DESTROY: "acl_list/destroy",
    EDIT: "acl_list/edit",
    VIEW: "acl_list/view",
  },

  //ACO Officer Section
  ACO_OFFICER_SECTION: {
    LIST: "aco_officer_section/index",
    ADD: "aco_officer_section/new",
    DESTROY: "aco_officer_section/destroy",
    EDIT: "aco_officer_section/edit",
    LOV: "aco_officer_section/lov",
  },

  //Topic
  TOPIC: {
    LIST: "topic/index",
    ADD: "topic/new",
    DESTROY: "topic/destroy",
    EDIT: "topic/edit",
    LOV: "topic/lov",
    ACTIVATE: "topic/activate",
    DEACTIVATE: "topic/deactivate",
  },

  //Citizen Menu Group
  CITIZEN_MENU_GROUP: {
    LIST: "citizen_menu_group/index",
    ADD: "citizen_menu_group/new",
    DESTROY: "citizen_menu_group/destroy",
    EDIT: "citizen_menu_group/edit",
    LOV: "citizen_menu_group/lov",
  },

  //Department
  DEPARTMENT: {
    LIST: "department/index",
    ADD: "department/new",
    DESTROY: "department/destroy",
    EDIT: "department/edit",
    LOV: "department/lov",
  },

  //Designation
  DESIGNATION: {
    LIST: "designation/index",
    ADD: "designation/new",
    DESTROY: "designation/destroy",
    EDIT: "designation/edit",
    LOV: "designation/lov",
    ACTIVATE: "designation/activate",
    DEACTIVATE: "designation/deactivate",
  },

  SUB_ZONE: {
    LIST: "sub_zone/index",
    ADD: "sub_zone/new",
    DESTROY: "sub_zone/destroy",
    EDIT: "sub_zone/edit",
    LOV: "sub_zone/lov",
    VIEW: "sub_zone/view",
  },

  SUB_CATEGORIES: {
    LOV: "sub_category/lov",
  },

  ZONE: {
    LIST: "zone/index",
    ADD: "zone/new",
    DESTROY: "zone/destroy",
    EDIT: "zone/edit",
    LOV: "zone/lov",
    VIEW: "zone/view",
  },

  AREA: {
    LIST: "area/index",
    ADD: "area/new",
    DESTROY: "area/destroy",
    EDIT: "area/edit",
    LOV: "area/lov",
    VIEW: "area/view",
  },

  //ACL Officer List
  ACL_OFFICER_LIST: {
    LIST: "acl_officer_list/index",
    ADD: "acl_officer_list/new",
    DESTROY: "acl_officer_list/destroy",
    EDIT: "acl_officer_list/edit",
    VIEW: "acl_officer_list/view",
  },

  //Priority
  PRIORITY: {
    LIST: "priority/index",
    ADD: "priority/new",
    DESTROY: "priority/destroy",
    EDIT: "priority/edit",
    LOV: "priority/lov",
    ACTIVATE: "priority/activate",
    DEACTIVATE: "priority/deactivate",
  },

  //Issue status code
  ISSUE_STATUS_CODE: {
    LIST: "issue_status_code/index",
    ADD: "issue_status_code/new",
    DESTROY: "issue_status_code/destroy",
    EDIT: "issue_status_code/edit",
    LOV: "issue_status_code/lov",
    ACTIVATE: "issue_status_code/activate",
    DEACTIVATE: "issue_status_code/deactivate",
  },

  //Task status code
  TASK_STATUS_CODE: {
    LIST: "task_status_code/index",
    ADD: "task_status_code/new",
    DESTROY: "task_status_code/destroy",
    EDIT: "task_status_code/edit",
    LOV: "task_status_code/lov",
    ACTIVATE: "task_status_code/activate",
    DEACTIVATE: "task_status_code/deactivate",
  },

  //Challan status code
  CHALLAN_STATUS_CODE: {
    LIST: "challan_status_code/index",
    ADD: "challan_status_code/new",
    DESTROY: "challan_status_code/destroy",
    EDIT: "challan_status_code/edit",
    LOV: "challan_status_code/lov",
    ACTIVATE: "challan_status_code/activate",
    DEACTIVATE: "challan_status_code/deactivate",
  },

  //Officer USer
  OFFICER: {
    LOV: "officer/lov",
  },

  //ACO Citizen Section
  ACO_CITIZEN_SECTION: {
    LIST: "aco_citizen_section/index",
    ADD: "aco_citizen_section/new",
    DESTROY: "aco_citizen_section/destroy",
    EDIT: "aco_citizen_section/edit",
    LOV: "aco_citizen_section/lov",
    VIEW: "aco_citizen_section/view",
  },

  //CATEGORY
  CATEGORY: {
    LIST: "category/index",
    ADD: "category/new",
    DESTROY: "category/destroy",
    EDIT: "category/edit",
    LOV: "category/lov",
    LOV_CHANNEL: "category/lov_channel",
    VIEW: "category/view",
    ACTIVATE: "category/activate",
    DEACTIVATE: "category/deactivate",
  },

  //CHANNEL
  CHANNEL: {
    LIST: "channel/index",
    ADD: "channel/new",
    DESTROY: "channel/destroy",
    EDIT: "channel/edit",
    LOV: "channel/lov",
    ACTIVATE: "channel/activate",
    DEACTIVATE: "channel/deactivate",
  },

  //CHECKLIST CATEGORY
  CHECKLIST_CATEGORY: {
    LIST: "checklist_category/index",
    ADD: "checklist_category/new",
    DESTROY: "checklist_category/destroy",
    EDIT: "checklist_category/edit",
    LOV: "checklist_category/lov",
    ACTIVATE: "checklist_category/activate",
    DEACTIVATE: "checklist_category/deactivate",
  },

  //SUB CATEGORY
  SUB_CATEGORY: {
    LIST: "sub_category/index",
    ADD: "sub_category/new",
    DESTROY: "sub_category/destroy",
    EDIT: "sub_category/edit",
    LOV: "sub_category/lov",
    VIEW: "sub_category/view",
    ACTIVATE: "sub_category/activate",
    DEACTIVATE: "sub_category/deactivate",
  },

  //INSPECTION AREA
  INSPECTION_AREA: {
    LIST: "inspection_area/index",
    ADD: "inspection_area/new",
    DESTROY: "inspection_area/destroy",
    EDIT: "inspection_area/edit",
    LOV: "inspection_area/lov",
  },

  //CHECKLIST
  CHECKLIST: {
    LIST: "checklist/index",
    ADD: "checklist/new",
    DESTROY: "checklist/destroy",
    EDIT: "checklist/edit",
    LOV: "checklist/lov",
  },

  //AGENCY
  AGENCY: {
    LIST: "agency/index",
    ADD: "agency/new",
    DESTROY: "agency/destroy",
    EDIT: "agency/edit",
    LOV: "agency/lov",
    ACTIVATE: "agency/activate",
    DEACTIVATE: "agency/deactivate",
  },

  //TOILET
  TOILET:{
    LIST: "toilet/index",
    ADD: "toilet/new",
    DESTROY: "toilet/destroy",
    EDIT: "toilet/edit",
    LOV: "toilet/lov",
    ACTIVATE: "toilet/activate",
    DEACTIVATE: "toilet/deactivate",
  },

  //DUSTBIN
  DUSTBIN:{
    LIST: "dustbin/index",
    ADD: "dustbin/new",
    DESTROY: "dustbin/destroy",
    EDIT: "dustbin/edit",
    LOV: "dustbin/lov",
    ACTIVATE: "dustbin/activate",
    DEACTIVATE: "dustbin/deactivate",
  }
};

export default API_URL;
