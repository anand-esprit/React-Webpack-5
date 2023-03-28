import React, { useEffect, useState } from "react";
import { Col, Row, Spin, TreeSelect, Form } from "antd";
import { observer } from "mobx-react";
import { FormBox, InputBox } from "../../../../components/AntdAddons";
import useStore from "../../../../store";
import { CONSTANT } from "../../../../config/Constant";
import { ACLOfficerList } from "../../../../requests/PageRequest";
// import debounce from "lodash/debounce";

const FormComponent: React.FC<any> = observer(
  ({ form, id, handleSubmit, handleChange, editValues, type }) => {
    const { LOV_STORE } = useStore();
    const {
      getUserRoleList,
      getOficerUserList,
      getACOOfficerSectionTreeList,
      getDepartmentTreeList,
      getDesignationList,
    } = LOV_STORE;

    const { SHOW_ALL } = TreeSelect;

    const [fetchUserRole, setFetchUserRole] = useState<boolean>(true);
    const [fetchOfficerUser, setFetchOfficerUser] = useState<boolean>(true);
    const [fetchACOAction, setFetchACOAction] = useState<boolean>(true);
    const [fetchDepartments, setFetchDepartments] = useState<boolean>(true);
    const [fetchDesignation, setFetchDesignation] = useState<boolean>(true);
    const [assignTo, setAssignTo] = useState<string>("");
    const [actionVal, setActionVal] = useState<string>();
    const [departmentVal, setDepartmentVal] = useState<string>();

    const code = {
      roles: [
        CONSTANT.ROLE.COMMISSIONER,
        CONSTANT.ROLE.DIRECTOR,
        CONSTANT.ROLE.DIVISIONAL_HEAD,
        CONSTANT.ROLE.WARD_OFFICER,
        CONSTANT.ROLE.OPERATOR,
      ],
    };

    useEffect(() => {
      getACOOfficerSectionTreeList();
    }, [getACOOfficerSectionTreeList]);

    useEffect(() => {
      getDepartmentTreeList();
    }, [getDepartmentTreeList]);

    // set the form values to edit
    useEffect(() => {
      if (editValues && type === "edit") {
        LOV_STORE.dropdown_user_role_list =
          editValues.aro_group_detail && editValues.aro_group_detail;

        LOV_STORE.dropdown_officer_list =
          editValues.aro_user_detail && editValues.aro_user_detail;

        // LOV_STORE.dropdown_department_tree_list =
        //   editValues.department_detail && editValues.department_detail;

        LOV_STORE.dropdown_designation_list =
          editValues.designation_detail && editValues.designation_detail;

        let assignToVal;
        if (editValues.aro_group) {
          assignToVal = "aro_group";
          setAssignTo("aro_group");
        } else if (editValues.aro_user) {
          assignToVal = "aro_user";
          setAssignTo("aro_user");
        } else if (editValues.app_id) {
          assignToVal = "app_id";
          setAssignTo("app_id");
        } else if (editValues.department_ids) {
          assignToVal = "department_ids";
          setAssignTo("department_ids");
        } else if (editValues.os_names) {
          assignToVal = "os_names";
          setAssignTo("os_names");
        } else if (editValues.designation_ids) {
          assignToVal = "designation_ids";
          setAssignTo("designation_ids");
        }

        setActionVal(
          editValues.aco_action_detail
            ? editValues.aco_action_detail.map((item: any) => item.id)
            : []
        );

        setDepartmentVal(
          editValues.department_detail
            ? editValues.department_detail.map((item: any) => item.id)
            : []
        );

        form.setFieldsValue({
          assign_to: assignToVal,
          desc: editValues.desc,
          sort_order: editValues.sort_order,
          user_check: editValues.user_check,
          // aco_ids: editValues.aco_ids,
          // app_id: editValues.app_id,
          // os_names: editValues.os_names,
          os_names: editValues.os_name_detail
            ? editValues.os_name_detail.map((item: any) => Number(item))
            : [],
          aro_user: editValues.aro_user_detail
            ? editValues.aro_user_detail.map((item: any) => item.id)
            : [],
          aro_group: editValues.aro_group_detail
            ? editValues.aro_group_detail.map((item: any) => item.id)
            : [],
          department_ids: departmentVal,
          designation_ids: editValues.designation_detail
            ? editValues.designation_detail.map((item: any) => item.id)
            : [],
          aco_ids: actionVal,
        });
      }
    }, [editValues, form]);

    const onActionChange = (newValue: string) => {
      setActionVal(newValue);
    };

    const onDepartmentChange = (newValue: string) => {
      setDepartmentVal(newValue);
    };

    return (
      <FormBox
        form={form}
        id={id}
        onFinish={handleSubmit}
        onChange={handleChange}
      >
        <Row gutter={15}>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <InputBox.Select
              label="Assign To"
              name="assign_to"
              required
              placeholder="Select Role"
              onChange={(e: string) => setAssignTo(e)}
              rules={ACLOfficerList.assign_to}
              options={{
                list: [
                  { id: "aro_user", name: "ARO User" },
                  { id: "aro_group", name: "ARO Group" },
                  { id: "app_id", name: "App" },
                  { id: "department_ids", name: "Departments" },
                  { id: "os_names", name: "OS Names" },
                  { id: "designation_ids", name: "Designations" },
                ],
                valueKey: "id",
                textKey: "name",
              }}
            />
          </Col>
          {assignTo === "aro_user" && (
            <Col xs={{ span: 24 }} md={{ span: 24 }}>
              <InputBox.Select
                label="ARO User"
                name="aro_user"
                mode="multiple"
                showArrow
                required
                placeholder="Select ARO User"
                rules={ACLOfficerList.aro_user}
                onFocus={() =>
                  fetchOfficerUser &&
                  getOficerUserList().then(() => setFetchOfficerUser(false))
                }
                notFoundContent={
                  fetchOfficerUser ? <Spin size="small" /> : "No Record Found."
                }
                options={{
                  list: LOV_STORE.dropdown_officer_list,
                  valueKey: "id",
                  textKey: "full_name",
                }}
                optionFilterProp="children"
                filterOption={(input: any, option: any) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              />
            </Col>
          )}
          {assignTo === "aro_group" && (
            <Col xs={{ span: 24 }} md={{ span: 24 }}>
              <InputBox.Select
                label="ARO Group"
                name="aro_group"
                mode="multiple"
                showArrow
                required
                placeholder="Select Group"
                rules={ACLOfficerList.aro_group}
                onFocus={() =>
                  fetchUserRole &&
                  getUserRoleList(code).then(() => setFetchUserRole(false))
                }
                notFoundContent={
                  fetchUserRole ? <Spin size="small" /> : "No Record Found."
                }
                options={{
                  list: LOV_STORE.dropdown_user_role_list,
                  valueKey: "id",
                  textKey: "name",
                }}
                optionFilterProp="children"
                filterOption={(input: any, option: any) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              />
            </Col>
          )}
          {assignTo === "app_id" && (
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <InputBox.Text
                required
                label="App Id"
                placeholder="App Id"
                initialValue={localStorage.getItem("app_id")}
                name="app_id"
                disabled
                hidden
                // rules={ACOActionRequest.sort_order}
              />
            </Col>
          )}
          {assignTo === "os_names" && (
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <InputBox.Select
                label="OS Name"
                name="os_names"
                mode="multiple"
                showArrow
                required
                placeholder="Select OS Name"
                rules={ACLOfficerList.os_names}
                options={{
                  list: CONSTANT.PLATFORM_ARRAY,
                  valueKey: "id",
                  textKey: "name",
                }}
                optionFilterProp="children"
                filterOption={(input: any, option: any) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              />
            </Col>
          )}
          {assignTo === "department_ids" && (
            <Col xs={{ span: 24 }} md={{ span: 24 }}>
              <Form.Item
                label="Deparments"
                valuePropName="department_ids"
                name="department_ids"
                required
                rules={!departmentVal ? ACLOfficerList.department_ids : []}
              >
                <TreeSelect
                  value={departmentVal}
                  showSearch
                  // treeLine={true}
                  placeholder="Please select"
                  allowClear
                  multiple
                  treeDefaultExpandAll
                  // labelInValue={true}
                  // treeCheckable={true}
                  // treeCheckStrictly={false}
                  showCheckedStrategy={SHOW_ALL}
                  onChange={(e: any) => {
                    onDepartmentChange(e);
                    handleChange();
                  }}
                  onFocus={() =>
                    fetchDepartments &&
                    getDepartmentTreeList().then(() =>
                      setFetchDepartments(false)
                    )
                  }
                  notFoundContent={
                    fetchDepartments ? (
                      <Spin size="small" />
                    ) : (
                      "No Record Found."
                    )
                  }
                  fieldNames={{ value: "id", label: "name" }}
                  treeData={LOV_STORE.dropdown_department_tree_list}
                  treeNodeFilterProp="name"
                  filterTreeNode={(search, item: any) => {
                    return (
                      item.nav_name
                        .toLowerCase()
                        .indexOf(search.toLowerCase()) >= 0
                    );
                  }}
                />
              </Form.Item>
              {/* <InputBox.Select
                label="Deparments"
                name="department_ids"
                mode="multiple"
                showArrow
                required
                placeholder="Select Deparments"
                rules={ACLOfficerList.department_ids}
                onFocus={() =>
                  fetchDepartments &&
                  getDepartmentTreeList().then(() => setFetchDepartments(false))
                }
                notFoundContent={
                  fetchDepartments ? <Spin size="small" /> : "No Record Found."
                }
                options={{
                  list: LOV_STORE.dropdown_department_tree_list,
                  valueKey: "id",
                  textKey: "name",
                }}
                optionFilterProp="children"
                filterOption={(input: any, option: any) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              /> */}
            </Col>
          )}
          {assignTo === "designation_ids" && (
            <Col xs={{ span: 24 }} md={{ span: 24 }}>
              <InputBox.Select
                label="Designation"
                name="designation_ids"
                mode="multiple"
                showArrow
                required
                placeholder="Select Designation"
                rules={ACLOfficerList.designation_ids}
                onFocus={() =>
                  fetchDesignation &&
                  getDesignationList().then(() => setFetchDesignation(false))
                }
                notFoundContent={
                  fetchDesignation ? <Spin size="small" /> : "No Record Found."
                }
                options={{
                  list: LOV_STORE.dropdown_designation_list,
                  valueKey: "id",
                  textKey: "name",
                }}
                optionFilterProp="children"
                filterOption={(input: any, option: any) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              />
            </Col>
          )}
          <Col xs={{ span: 24 }} md={{ span: 24 }}>
            <Form.Item
              label="ACO Action"
              valuePropName="aco_ids"
              name="aco_ids"
              required
              rules={!actionVal ? ACLOfficerList.aco_ids : []}
            >
              <TreeSelect
                placeholder="Please select"
                value={actionVal}
                showSearch
                // treeLine={true}
                allowClear
                multiple
                treeDefaultExpandAll
                // labelInValue={true}
                // treeCheckable={true}
                // treeCheckStrictly={false}
                showCheckedStrategy={SHOW_ALL}
                onChange={(e: any) => {
                  onActionChange(e);
                  handleChange();
                }}
                onFocus={() =>
                  fetchACOAction &&
                  getACOOfficerSectionTreeList().then(() =>
                    setFetchACOAction(false)
                  )
                }
                notFoundContent={
                  fetchACOAction ? <Spin size="small" /> : "No Record Found."
                }
                fieldNames={{ value: "id", label: "nav_name" }}
                treeData={LOV_STORE.dropdown_aco_officer_section_tree_list}
                treeNodeFilterProp="nav_name"
                filterTreeNode={(search, item: any) => {
                  return (
                    item.nav_name.toLowerCase().indexOf(search.toLowerCase()) >=
                    0
                  );
                }}
              />
            </Form.Item>
          </Col>
          <Col xs={{ span: 12 }} md={{ span: 12 }}>
            <InputBox.Radio
              label="User Check"
              name="user_check"
              required
              rules={ACLOfficerList.user_check}
              options={{
                list: [
                  { id: 1, name: "Yes" },
                  { id: 0, name: "No" },
                ],
                valueKey: "id",
                textKey: "name",
              }}
              // rules={AppMasterRequest.is_city_range_check}
            />
          </Col>
          {type === "edit" ? (
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <InputBox.Text
                required
                label="Sort Order"
                placeholder="Sort Order"
                name="sort_order"
                rules={ACLOfficerList.sort_order}
              />
            </Col>
          ) : (
            <></>
          )}
          <Col xs={{ span: 24 }}>
            <InputBox.TextArea
              label="Description"
              name="desc"
              placeholder="Description"
              rules={ACLOfficerList.desc}
              onChange={handleChange}
            />
          </Col>
        </Row>
      </FormBox>
    );
  }
);

export default FormComponent;
