import React from "react";
import { useRoutes } from "react-router-dom";
import { CONSTANT } from "./Constant";
// import CitizenMenuGroup from "../views/app_pages/CitizenMenuGroup";
const Department = React.lazy(() => import("../views/app_pages/Department"));
const Designation = React.lazy(() => import("../views/app_pages/Designation"));
const Login = React.lazy(() => import("../views/app_pages/auth/Login"));
const Dashboard = React.lazy(() => import("../views/app_pages/Dashboard"));
const PageNotFound = React.lazy(() => import("../views/errors/PageNotFound"));
// const Unauthorized = React.lazy(() => import("../views/errors/Unauthorized"));
const AppMaster = React.lazy(() => import("../views/app_pages/AppMaster"));
const ACLList = React.lazy(() => import("../views/app_pages/ACLList"));
const ACOAction = React.lazy(() => import("../views/app_pages/ACOAction"));
const Area = React.lazy(() => import("../views/app_pages/Area"));
const ACOOfficerSection = React.lazy(
  () => import("../views/app_pages/ACOOfficerSection")
);
const Zone = React.lazy(() => import("../views/app_pages/Zone"));
const SubZone = React.lazy(() => import("../views/app_pages/SubZone"));
const ACOSection = React.lazy(() => import("../views/app_pages/ACOSection"));
const UserRole = React.lazy(() => import("../views/app_pages/UserRole"));
const AuthLayout = React.lazy(() => import("../views/layouts/AuthLayout"));
const MainLayout = React.lazy(() => import("../views/layouts/MainLayout"));
const Topic = React.lazy(() => import("../views/app_pages/Topic"));
const CitizenMenuGroup = React.lazy(
  () => import("../views/app_pages/CitizenMenuGroup")
);
const ACLOfficerList = React.lazy(
  () => import("../views/app_pages/ACLOfficerList")
);
const Priority = React.lazy(() => import("../views/app_pages/Priority"));
const IssueStatusCode = React.lazy(
  () => import("../views/app_pages/Issue/IssueStatusCode")
);
const TaskStatusCode = React.lazy(
  () => import("../views/app_pages/Task/TaskStatusCode")
);
const ChallanStatusCode = React.lazy(
  () => import("../views/app_pages/Challan/ChallanStatusCode")
);
const ACOCitizenSection = React.lazy(
  () => import("../views/app_pages/ACOCitizenSection")
);
const Category = React.lazy(() => import("../views/app_pages/Category"));
const Channel = React.lazy(() => import("../views/app_pages/Channel"));
const ChecklistCategory = React.lazy(
  () => import("../views/app_pages/ChecklistCategory")
);
const Agency = React.lazy(() => import("../views/app_pages/Agency"));
const Toilet = React.lazy(()=> import("../views/app_pages/Toilet"));
const Dustbin = React.lazy(()=> import("../views/app_pages/Dustbin"))
const SubCategory = React.lazy(() => import("../views/app_pages/SubCategory"));
const InspectionArea = React.lazy(
  () => import("../views/app_pages/InspectionArea")
);
const Checklist = React.lazy(() => import("../views/app_pages/Checklist"));

export default function Router() {
  const element = useRoutes(RouterConfig);
  return element;
}

export const RouterConfig = [
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      // {
      //   path: "/unauthorized",
      //   element: <Unauthorized />,
      // },
    ],
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: CONSTANT.DASHBOARD_REDIRECT_PATH,
        element: <Dashboard />,
      },
      {
        path: "/appmastercontroller",
        element: <AppMaster />,
      },
      {
        path: "/acoactioncontroller",
        element: <ACOAction />,
      },
      {
        path: "/acosectioncontroller",
        element: <ACOSection />,
      },
      {
        path: "/userrolecontroller",
        element: <UserRole />,
      },
      {
        path: "/acllistcontroller",
        element: <ACLList />,
      },
      {
        path: "/acoofficersectioncontroller",
        element: <ACOOfficerSection />,
      },
      {
        path: "/agencycontroller",
        element: <Agency />,
      },
      {
        path: "/toiletcontroller",
        element: <Toilet />,
      },
      {
        path: "/dustbincontroller",
        element: <Dustbin />,
      },
      {
        path: "/designationcontroller",
        element: <Designation />,
      },
      {
        path: "/departmentcontroller",
        element: <Department />,
      },
      {
        path: "/topiccontroller",
        element: <Topic />,
      },
      {
        path: "/citizenmenugroupcontroller",
        element: <CitizenMenuGroup />,
      },
      {
        path: "/subzonecontroller",
        element: <SubZone />,
      },
      {
        path: "/zonecontroller",
        element: <Zone />,
      },
      {
        path: "/areacontroller",
        element: <Area />,
      },
      {
        path: "/aclofficerlistcontroller",
        element: <ACLOfficerList />,
      },
      {
        path: "/prioritycontroller",
        element: <Priority />,
      },
      {
        path: "/issuestatuscodecontroller",
        element: <IssueStatusCode />,
      },
      {
        path: "/taskstatuscodecontroller",
        element: <TaskStatusCode />,
      },
      {
        path: "/challanstatuscodecontroller",
        element: <ChallanStatusCode />,
      },
      {
        path: "/acocitizensectioncontroller",
        element: <ACOCitizenSection />,
      },
      {
        path: "/categorycontroller",
        element: <Category />,
      },
      {
        path: "/channelcontroller",
        element: <Channel />,
      },
      {
        path: "/checklistcategorycontroller",
        element: <ChecklistCategory />,
      },
      // {
      //   path: "/dustbincontroller",
      //   element: <Dustbin />,
      // },
      {
        path: "/subcategorycontroller/:id?",
        element: <SubCategory />,
      },
      {
        path: "/inspectionareacontroller",
        element: <InspectionArea />,
      },
      {
        path: "/checklistcontroller",
        element: <Checklist />,
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
];
