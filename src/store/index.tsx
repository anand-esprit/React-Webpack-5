import { createContext, useContext } from "react";
import { Context } from "vm";
import AuthStore from "./AuthStore/AuthStore";
import RootStore from "./RootStore/RootStore";
import DashboardStore from "./DashboardStore/DashboardStore";
import AppMasterStore from "./AppMasterStore/AppMasterStore";
import ACOActionStore from "./ACOActionStore/ACOActionStore";
import ACOSectionStore from "./ACOSection/ACOSectionStore";
import UserRoleStore from "./UserRoleStore/UserRoleStore";
import ACLListStore from "./ACLListStore/ACLListStore";
import ACOOfficerSectionStore from "./ACOOfficerSectionStore/ACOOfficerSectionStore";
import TopicStore from "./TopicStore/TopicStore";
import DesignationStore from "./DesignationStore/DesignationStore";
import DepartmentStore from "./DepartmentStore/DepartmentStore";
import LOVStore from "./GeneralStore/LOVStore";
import CitizenMenuGroupStore from "./CitisenMenuGroupStore/CitizenMenuGroupStore";
import SubZoneStore from "./SubZoneStore/SubZoneStore";
import ZoneStore from "./ZoneStore/ZoneStore";
import AreaStore from "./AreaStore/AreaStore";
import ACLOfficerListStore from "./ACLOfficerListStore/ACLOfficerListStore";
import PriorityStore from "./PriorityStore/PriorityStore";
import IssueStatusCodeStore from "./IssueStatusCodeStore/IssueStatusCodeStore";
import TaskStatusCodeStore from "./TaskStatusCodeStore/TaskStatusCodeStore";
import ChallanStatusCodeStore from "./ChallanStatusCodeStore/ChallanStatusCodeStore";
import ACOCitizenSectionStore from "./ACOCitizenSectionStore/ACOCitizenSectionStore";
import CategoryStore from "./CategoryStore/CategoryStore";
import ChannelStore from "./ChannelStore/ChannelStore";
import ChecklistCategoryStore from "./ChecklistCategoryStore/ChecklistCategoryStore";
import SubCategoryStore from "./SubCategoryStore/SubCategoryStore";
import InspectionAreaStore from "./InspectionAreaStore/InspectionAreaStore";
import ChecklistStore from "./ChecklistStore/ChecklistStore";
import AgencyStore from "./AgencyStore/AgencyStore";
import ToiletStore from "./ToiletStore/ToiletStore";
import DustbinStore from "./DustbinStore/DustbinStore";

const AppContext = createContext({
  ROOT: new RootStore(),
  AUTH: new AuthStore(),
  DASHBOARD_STORE: new DashboardStore(),
  APP_MASTER_STORE: new AppMasterStore(),
  ACO_ACTION_STORE: new ACOActionStore(),
  ACO_SECTION_STORE: new ACOSectionStore(),
  USER_ROLE_STORE: new UserRoleStore(),
  ACL_LIST_STORE: new ACLListStore(),
  ACO_OFFICER_SECTION_STORE: new ACOOfficerSectionStore(),
  TOPIC_STORE: new TopicStore(),
  DESIGNATION_STORE: new DesignationStore(),
  DEPARTMENT_STORE: new DepartmentStore(),
  LOV_STORE: new LOVStore(),
  CITIZEN_MENU_GROUP_STORE: new CitizenMenuGroupStore(),
  SUB_ZONE_STORE: new SubZoneStore(),
  ZONE_STORE: new ZoneStore(),
  AREA_STORE: new AreaStore(),
  ACL_OFFICER_LIST_STORE: new ACLOfficerListStore(),
  PRIORITY_STORE: new PriorityStore(),
  ISSUE_STATUS_CODE_STORE: new IssueStatusCodeStore(),
  TASK_STATUS_CODE_STORE: new TaskStatusCodeStore(),
  CHALLAN_STATUS_CODE_STORE: new ChallanStatusCodeStore(),
  ACL_CITIZEN_SECTION_STORE: new ACOCitizenSectionStore(),
  CATEGORY_STORE: new CategoryStore(),
  CHANNEL_STORE: new ChannelStore(),
  CHECKLIST_CATEGORY_STORE: new ChecklistCategoryStore(),
  SUB_CATEGORY_STORE: new SubCategoryStore(),
  INSPECTION_AREA_STORE: new InspectionAreaStore(),
  CHECKLIST_STORE: new ChecklistStore(),
  AGENCY_STORE: new AgencyStore(),
  TOILET_STORE: new ToiletStore(),
  DUSTBIN_STORE: new DustbinStore(),
});

const useStore = (): Context => useContext(AppContext);

export default useStore;
