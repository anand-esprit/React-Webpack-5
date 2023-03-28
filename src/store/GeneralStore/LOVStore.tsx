import axios from "axios";
import { makeAutoObservable } from "mobx";
import API_URL from "../../config/ApiUrl";

export default class LOVStore {
  dropdown_department_list = null;
  dropdown_department_tree_list = null;
  dropdown_designation_list = null;
  dropdown_aco_section_list = null;
  dropdown_aco_section_tree_list = null;
  dropdown_subzone_list = null;
  dropdown_sub_category_list = null;
  dropdown_category_list = null;
  dropdown_category_tree_list = null;
  dropdown_zone_list = null;
  dropdown_ward_list = null;
  dropdown_aco_officer_section_list = null;
  dropdown_aco_officer_section_tree_list = null;
  dropdown_topic_list = null;
  dropdown_user_role_list = null;
  dropdown_officer_list = null;
  dropdown_aco_action_list = null;
  dropdown_aco_citizen_section_tree_list = null;
  dropdown_citizen_menu_group_list = null;
  dropdown_channel_list = null;
  dropdown_inspection_area_list = null;
  dropdown_checklist_category_list = null;
  dropdown_priority_list = null;

  constructor() {
    makeAutoObservable(this);
  }

  getDepartmentList = async (): Promise<any> => {
    return await axios
      .post(API_URL.DEPARTMENT.LOV)
      .then(({ data }) => {
        this.dropdown_department_list = data.list;
      })
      .catch((response) => {
        return Promise.reject(response);
      });
  };

  getDepartmentTreeList = async (): Promise<any> => {
    return await axios
      .post(API_URL.DEPARTMENT.LOV)
      .then(({ data }) => {
        const mainArr = data.list;
        const parentArr = mainArr.filter((e: any) => e.parent_id === null);

        const filterFnResult = this.makeNestedChildrenArray(mainArr, parentArr);
        this.dropdown_department_tree_list = filterFnResult;
      })
      .catch((response) => {
        return Promise.reject(response);
      });
  };

  getDesignationList = async (): Promise<any> => {
    return await axios
      .get(API_URL.DESIGNATION.LOV)
      .then(({ data }) => {
        this.dropdown_designation_list = data.list;
      })
      .catch((response) => {
        return Promise.reject(response);
      });
  };

  getACOSectionList = async (): Promise<any> => {
    this.dropdown_aco_section_list = null;
    return await axios
      .post(API_URL.ACO_SECTION.LOV)
      .then(({ data }) => {
        this.dropdown_aco_section_list = data.list;
      })
      .catch((response) => {
        return Promise.reject(response);
      });
  };

  getACOSectionTreeList = async (): Promise<any> => {
    return await axios
      .post(API_URL.ACO_SECTION.LOV)
      .then(({ data }) => {
        const mainArr = data.list;
        const parentArr = mainArr.filter((e: any) => e.parent_id === null);

        const filterFnResult = this.makeNestedChildrenArray(mainArr, parentArr);

        this.dropdown_aco_section_tree_list = filterFnResult;
      })
      .catch((response) => {
        return Promise.reject(response);
      });
  };

  getSubZoneList = async (): Promise<any> => {
    return await axios
      .post(API_URL.SUB_ZONE.LOV)
      .then(({ data }) => {
        this.dropdown_subzone_list = data.list;
      })
      .catch((response) => {
        return Promise.reject(response);
      });
  };

  getZoneList = async (): Promise<any> => {
    return await axios
      .post(API_URL.ZONE.LOV)
      .then(({ data }) => {
        this.dropdown_zone_list = data.list;
        return data.list;
      })
      .catch((response) => {
        return Promise.reject(response);
      });
  };

  getWardList = async (id: any): Promise<any> => {
    return await axios
      .post(API_URL.ZONE.LOV, id)
      .then(({ data }) => {
        this.dropdown_ward_list = data.list;
        return data.list;
      })
      .catch((response) => {
        return Promise.reject(response);
      });
  };

  getCategoryList = async (): Promise<any> => {
    return await axios
      .post(API_URL.CATEGORY.LOV)
      .then(({ data }) => {
        this.dropdown_category_list = data.list;
      })
      .catch((response) => {
        return Promise.reject(response);
      });
  };

  getSubCategoryList = async (): Promise<any> => {
    return await axios
      .post(API_URL.SUB_CATEGORIES.LOV)
      .then(({ data }) => {
        this.dropdown_sub_category_list = data.list;
      })
      .catch((response) => {
        return Promise.reject(response);
      });
  };

  getACOOfficerSectionList = async (): Promise<any> => {
    return await axios
      .post(API_URL.ACO_OFFICER_SECTION.LOV)
      .then(({ data }) => {
        this.dropdown_aco_officer_section_list = data.list;
      })
      .catch((response) => {
        return Promise.reject(response);
      });
  };

  makeNestedChildrenArray = (mainArr: any, childArray: any) => {
    const filteredArray = childArray.map((element: any) => {
      let children = mainArr.filter((e: any) => e.parent_id === element.id);
      if (children.length) {
        children = this.makeNestedChildrenArray(mainArr, children);
        return { ...element, children: children };
      } else {
        return element;
      }
    });
    // const finalArray = filteredArray.flatMap((item: any) => item);
    return filteredArray;
  };

  getACOOfficerSectionTreeList = async (): Promise<any> => {
    return await axios
      .post(API_URL.ACO_OFFICER_SECTION.LOV)
      .then(({ data }) => {
        const mainArr = data.list;
        const parentArr = mainArr.filter((e: any) => e.parent_id === null);

        const filterFnResult = this.makeNestedChildrenArray(mainArr, parentArr);
        // console.log("filterFnResult", filterFnResult);

        // const filteredArray = parentArr.map((parArr: any) => {
        //   const childrenArr = mainArr.filter(
        //     (arr: any) => arr.parent_id === parArr.id
        //   );
        //   return [parArr, ...childrenArr];
        // });
        // const finalArray = filteredArray.flatMap((item: any) => item);

        // console.log( "finalArray",finalArray );

        // const treeArr = parentArr.map((parArr: any) => {
        //   const childrenArr = mainArr.filter(
        //     (arr: any) => arr.parent_id === parArr.id
        //   );
        //   return { ...parArr, children: childrenArr };
        // });
        this.dropdown_aco_officer_section_tree_list = filterFnResult;
      })
      .catch((response) => {
        return Promise.reject(response);
      });
  };

  getTopicList = async (): Promise<any> => {
    return await axios
      .get(API_URL.TOPIC.LOV)
      .then(({ data }) => {
        this.dropdown_topic_list = data.list;
      })
      .catch((response) => {
        return Promise.reject(response);
      });
  };

  getUserRoleList = async (code: any): Promise<any> => {
    return await axios
      .post(API_URL.USER_ROLE.LOV, code)
      .then(({ data }) => {
        this.dropdown_user_role_list = data.list;
      })
      .catch((response) => {
        return Promise.reject(response);
      });
  };

  getOficerUserList = async (): Promise<any> => {
    return await axios
      .get(API_URL.OFFICER.LOV)
      .then(({ data }) => {
        this.dropdown_officer_list = data.list;
      })
      .catch((response) => {
        return Promise.reject(response);
      });
  };

  getACOActionList = async (): Promise<any> => {
    return await axios
      .get(API_URL.ACO_ACTION.LOV)
      .then(({ data }) => {
        const actionData = data.list.map((item: any) => {
          return {
            id: item.id,
            controller: item.controller,
            action_name: item.controller_name + " --" + item.action,
          };
        });
        // console.log(actionData);
        this.dropdown_aco_action_list = actionData;
      })
      .catch((response) => {
        return Promise.reject(response);
      });
  };

  getACOCitizenSectionTreeList = async (): Promise<any> => {
    return await axios
      .post(API_URL.ACO_CITIZEN_SECTION.LOV)
      .then(({ data }) => {
        const mainArr = data.list;
        const parentArr = mainArr.filter((e: any) => e.parent_id === null);
        const treeArr = parentArr.map((parArr: any) => {
          const childrenArr = mainArr.filter(
            (arr: any) => arr.parent_id === parArr.id
          );
          return { ...parArr, children: childrenArr };
        });
        this.dropdown_aco_citizen_section_tree_list = treeArr;
      })
      .catch((response) => {
        return Promise.reject(response);
      });
  };

  getCitizenMenuGroupList = async (): Promise<any> => {
    return await axios
      .get(API_URL.CITIZEN_MENU_GROUP.LOV)
      .then(({ data }) => {
        this.dropdown_citizen_menu_group_list = data.list;
      })
      .catch((response) => {
        return Promise.reject(response);
      });
  };

  getChannelList = async (): Promise<any> => {
    return await axios
      .get(API_URL.CHANNEL.LOV)
      .then(({ data }) => {
        this.dropdown_channel_list = data.list;
      })
      .catch((response) => {
        return Promise.reject(response);
      });
  };

  getInspectionAreaList = async (): Promise<any> => {
    return await axios
      .get(API_URL.INSPECTION_AREA.LOV)
      .then(({ data }) => {
        this.dropdown_inspection_area_list = data.list;
      })
      .catch((response) => {
        return Promise.reject(response);
      });
  };

  getChecklistCategoryList = async (): Promise<any> => {
    return await axios
      .get(API_URL.CHECKLIST_CATEGORY.LOV)
      .then(({ data }) => {
        this.dropdown_checklist_category_list = data.list;
      })
      .catch((response) => {
        return Promise.reject(response);
      });
  };

  getPriorityList = async (): Promise<any> => {
    return await axios
      .get(API_URL.PRIORITY.LOV)
      .then(({ data }) => {
        this.dropdown_priority_list = data.list;
      })
      .catch((response) => {
        return Promise.reject(response);
      });
  };
}
