import React from "react";
import { HomeOutlined } from "@ant-design/icons";
import { BreadcrumbConfigProps } from "./InterfacesAndTypes";
import { CONSTANT } from "./Constant";

const defaultBreadcrumbPath = [
  { name: <HomeOutlined />, link: CONSTANT.DASHBOARD_REDIRECT_PATH },
];

export const UserBreadcrumb: BreadcrumbConfigProps = {
  title: "User Management",
  path: [
    ...defaultBreadcrumbPath,
    { name: "UserManagement", link: "/user-management" },
  ],
};

export const AppMasterBreadcrumb: BreadcrumbConfigProps = {
  title: "App Master",
  path: [
    ...defaultBreadcrumbPath,
    { name: "AppMaster", link: "/appmastercontroller" },
  ],
};

export const ACOActionBreadcrumb: BreadcrumbConfigProps = {
  title: "ACO Action",
  path: [
    ...defaultBreadcrumbPath,
    { name: "ACOAction", link: "/acoactioncontroller" },
  ],
};

export const ACLListBreadcrumb: BreadcrumbConfigProps = {
  title: "ACL List",
  path: [
    ...defaultBreadcrumbPath,
    { name: "ACLList", link: "/acllistcontroller" },
  ],
};

export const ACOSectionBreadcrumb: BreadcrumbConfigProps = {
  title: "ACO Section",
  path: [
    ...defaultBreadcrumbPath,
    { name: "ACOSection", link: "/acosectioncontroller" },
  ],
};

export const UserRoleBreadcrumb: BreadcrumbConfigProps = {
  title: "User Role",
  path: [
    ...defaultBreadcrumbPath,
    { name: "UserRole", link: "/userrolecontroller" },
  ],
};

export const ACOOfficerSectionBreadcrumb: BreadcrumbConfigProps = {
  title: "ACO Officer Section",
  path: [
    ...defaultBreadcrumbPath,
    { name: "ACOOfficerSection", link: "/acoofficersectioncontroller" },
  ],
};

export const DepartmentBreadcrumb: BreadcrumbConfigProps = {
  title: "Department",
  path: [
    ...defaultBreadcrumbPath,
    { name: "Department", link: "/departmentcontroller" },
  ],
};

export const DesignationBreadcrumb: BreadcrumbConfigProps = {
  title: "Designation",
  path: [
    ...defaultBreadcrumbPath,
    { name: "Designation", link: "/designationcontroller" },
  ],
};

export const TopicBreadcrumb: BreadcrumbConfigProps = {
  title: "Topic",
  path: [...defaultBreadcrumbPath, { name: "Topic", link: "/topiccontroller" }],
};

export const AgencyBreadcrumb: BreadcrumbConfigProps = {
  title: "Agency",
  path: [...defaultBreadcrumbPath, { name: "Agency", link: "/agencycontroller" }],
};

export const ToiletBreadcrumb: BreadcrumbConfigProps = {
  title: "Toilet",
  path: [...defaultBreadcrumbPath, { name: "Toilet", link: "/toiletcontroller" }],
};

export const DustbinBreadcrumb: BreadcrumbConfigProps = {
  title: "Dustbin",
  path: [...defaultBreadcrumbPath, { name: "Dustbin", link: "/dustbincontroller" }],
};

export const CitizenMenuBreadcrumb: BreadcrumbConfigProps = {
  title: "Citizen Menu Group",
  path: [
    ...defaultBreadcrumbPath,
    { name: "CitizenMenuGroup", link: "/citizenmenugroupcontroller" },
  ],
};

export const SubZoneBreadcrumb: BreadcrumbConfigProps = {
  title: "Sub Zone",
  path: [
    ...defaultBreadcrumbPath,
    { name: "SubZone", link: "/subzonecontroller" },
  ],
};

export const ZoneBreadcrumb: BreadcrumbConfigProps = {
  title: "Zone",
  path: [...defaultBreadcrumbPath, { name: "Zone", link: "/zonecontroller" }],
};

export const AreaBreadcrumb: BreadcrumbConfigProps = {
  title: "Area",
  path: [...defaultBreadcrumbPath, { name: "Area", link: "/areacontroller" }],
};

export const ACLOfficerListBreadcrumb: BreadcrumbConfigProps = {
  title: "ACL Officer List",
  path: [
    ...defaultBreadcrumbPath,
    { name: "ACLOfficerList", link: "/aclofficerlistcontroller" },
  ],
};

export const PriorityBreadcrumb: BreadcrumbConfigProps = {
  title: "Priority",
  path: [
    ...defaultBreadcrumbPath,
    { name: "Priority", link: "/prioritycontroller" },
  ],
};

export const IssueStatusCodeBreadcrumb: BreadcrumbConfigProps = {
  title: "Issue Status Code",
  path: [
    ...defaultBreadcrumbPath,
    { name: "IssueStatusCode", link: "/prioritycontroller" },
  ],
};

export const ChallanStatusCodeBreadcrumb: BreadcrumbConfigProps = {
  title: "Challan Status Code",
  path: [
    ...defaultBreadcrumbPath,
    { name: "ChallanStatusCode", link: "/challanstatuscodecontroller" },
  ],
};

export const TaskStatusCodeBreadcrumb: BreadcrumbConfigProps = {
  title: "Task Status Code",
  path: [
    ...defaultBreadcrumbPath,
    { name: "TaskStatusCode", link: "/taskstatuscodecontroller" },
  ],
};

export const ACOCitizenSectionBreadcrumb: BreadcrumbConfigProps = {
  title: "ACO Citizen Section",
  path: [
    ...defaultBreadcrumbPath,
    { name: "ACOCitizenSection", link: "/acocitizensectioncontroller" },
  ],
};

export const CategoryBreadcrumb: BreadcrumbConfigProps = {
  title: "Category",
  path: [
    ...defaultBreadcrumbPath,
    { name: "Category", link: "/categorycontroller" },
  ],
};

export const ChannelBreadcrumb: BreadcrumbConfigProps = {
  title: "Channel",
  path: [
    ...defaultBreadcrumbPath,
    { name: "Channel", link: "/channelcontroller" },
  ],
};

export const ChecklistCategoryBreadcrumb: BreadcrumbConfigProps = {
  title: "Checklist Category",
  path: [
    ...defaultBreadcrumbPath,
    { name: "ChecklistCategory", link: "/checklistcategorycontroller" },
  ],
};

export const SubCategoryBreadcrumb: BreadcrumbConfigProps = {
  title: "Sub Category",
  path: [
    ...defaultBreadcrumbPath,
    { name: "SubCategory", link: "/subcategorycontroller" },
  ],
};

export const InspectionAreaBreadcrumb: BreadcrumbConfigProps = {
  title: "Inspection Area",
  path: [
    ...defaultBreadcrumbPath,
    { name: "InspectionArea", link: "/inspectionareacontroller" },
  ],
};

export const ChecklistBreadcrumb: BreadcrumbConfigProps = {
  title: "Checklist",
  path: [
    ...defaultBreadcrumbPath,
    { name: "Checklist", link: "/checklistcontroller" },
  ],
};
