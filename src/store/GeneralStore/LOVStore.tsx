// import axios from "axios";
import { makeAutoObservable } from "mobx";
// import API_URL from "../../config/ApiUrl";

export default class LOVStore {
  // dropdown_department_list = null;
  // dropdown_department_tree_list = null;

  constructor() {
    makeAutoObservable(this);
  }

  // makeNestedChildrenArray = (mainArr: any, childArray: any) => {
  //   const filteredArray = childArray.map((element: any) => {
  //     let children = mainArr.filter((e: any) => e.parent_id === element.id);
  //     if (children.length) {
  //       children = this.makeNestedChildrenArray(mainArr, children);
  //       return { ...element, children: children };
  //     } else {
  //       return element;
  //     }
  //   });
  //   // const finalArray = filteredArray.flatMap((item: any) => item);
  //   return filteredArray;
  // };

  // getDepartmentList = async (): Promise<any> => {
  //   return await axios
  //     .post(API_URL.DEPARTMENT.LOV)
  //     .then(({ data }) => {
  //       this.dropdown_department_list = data.list;
  //     })
  //     .catch((response) => {
  //       return Promise.reject(response);
  //     });
  // };

  // getDepartmentTreeList = async (): Promise<any> => {
  //   return await axios
  //     .post(API_URL.DEPARTMENT.LOV)
  //     .then(({ data }) => {
  //       const mainArr = data.list;
  //       const parentArr = mainArr.filter((e: any) => e.parent_id === null);

  //       const filterFnResult = this.makeNestedChildrenArray(mainArr, parentArr);
  //       this.dropdown_department_tree_list = filterFnResult;
  //     })
  //     .catch((response) => {
  //       return Promise.reject(response);
  //     });
  // };
  
}
