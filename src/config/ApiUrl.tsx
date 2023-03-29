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
};

export default API_URL;
