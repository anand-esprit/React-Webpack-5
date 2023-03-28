import React, { useEffect, useState } from "react";
import { Col, Row, Spin } from "antd";
import { observer } from "mobx-react";
import { FormBox, InputBox } from "../../../../components/AntdAddons";
import useStore from "../../../../store";
import { CONSTANT } from "../../../../config/Constant";
// import debounce from "lodash/debounce";

const FormComponent: React.FC<any> = observer(
  ({ form, id, handleSubmit, handleChange, editValues, type }) => {
    const { LOV_STORE } = useStore();
    const { getUserRoleList, getOficerUserList, getACOActionList } = LOV_STORE;
    const [fetchUserRole, setFetchUserRole] = useState<boolean>(true);
    const [fetchOfficerUser, setFetchOfficerUser] = useState<boolean>(true);
    const [fetchACOAction, setFetchACOAction] = useState<boolean>(true);
    const [assignToField, setAssignToField] = useState<string>("aro_user");

    const code = {
      roles: [
        CONSTANT.ROLE.COMMISSIONER,
        CONSTANT.ROLE.DIRECTOR,
        CONSTANT.ROLE.DIVISIONAL_HEAD,
        CONSTANT.ROLE.WARD_OFFICER,
        CONSTANT.ROLE.OPERATOR,
      ],
    };

    // set the form values to edit
    useEffect(() => {
      if (editValues && type === "edit") {
        LOV_STORE.dropdown_user_role_list =
          editValues.aro_group_detail && editValues.aro_group_detail;

        LOV_STORE.dropdown_officer_list =
          editValues.aro_user_detail && editValues.aro_user_detail;

        LOV_STORE.dropdown_aco_action_list =
          editValues.aco_action_detail &&
          editValues.aco_action_detail.map((item: any) => {
            return {
              id: item.id,
              controller: item.controller,
              action_name: item.controller_name + " --" + item.name,
            };
          });

        // LOV_STORE.dropdown_aco_action_list = editValues.aco_action_detail && {
        //   id: editValues.aco_action_detail.id,
        //   controller: editValues.aco_action_detail.controller,
        //   action_name:
        //     editValues.aco_action_detail.controller_name +
        //     " --" +
        //     editValues.aco_action_detail.action,
        // };

        // LOV_STORE.dropdown_aco_action_list = editValues.aco_action_detail && [
        //   editValues.aco_action_detail,
        // ];
        let assignToVal;
        if (editValues.aro_group) {
          assignToVal = "aro_group";
          setAssignToField("aro_group");
        } else {
          assignToVal = "aro_user";
          setAssignToField("aro_user");
        }

        form.setFieldsValue({
          assign_to: assignToVal,
          desc: editValues.desc,
          sort_order: editValues.sort_order,
          user_check: editValues.user_check,
          aco_ids: editValues.aco_action_detail
            ? editValues.aco_action_detail.map((item: any) => item.id)
            : [],
          aro_group: editValues.aro_group_detail
            ? editValues.aro_group_detail.map((item: any) => item.id)
            : [],
          aro_user: editValues.aro_user_detail
            ? editValues.aro_user_detail.map((item: any) => item.id)
            : [],
        });
      }
    }, [editValues, form]);

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
              placeholder="Select Assign to"
              onChange={(e: any) => {
                e === "aro_group"
                  ? setAssignToField("aro_group")
                  : setAssignToField("aro_user");
              }}
              initialValue={"aro_user"}
              options={{
                list: [
                  { id: "aro_user", name: "ARO User" },
                  { id: "aro_group", name: "ARO Group" },
                ],
                valueKey: "id",
                textKey: "name",
              }}
            />
          </Col>
          {assignToField === "aro_group" ? (
            <Col xs={{ span: 24 }} md={{ span: 24 }}>
              <InputBox.Select
                label="ARO Group"
                name="aro_group"
                mode="multiple"
                showArrow
                required
                placeholder="Select Group"
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
          ) : (
            <Col xs={{ span: 24 }} md={{ span: 24 }}>
              <InputBox.Select
                label="ARO User"
                name="aro_user"
                mode="multiple"
                showArrow
                required
                placeholder="Select ARO User"
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

          <Col xs={{ span: 24 }} md={{ span: 24 }}>
            <InputBox.Select
              label="ACO Action"
              name="aco_ids"
              mode="multiple"
              showArrow
              required
              placeholder="Select ACO Action"
              onFocus={() =>
                fetchACOAction &&
                getACOActionList().then(() => setFetchACOAction(false))
              }
              notFoundContent={
                fetchACOAction ? <Spin size="small" /> : "No Record Found."
              }
              options={{
                list: LOV_STORE.dropdown_aco_action_list,
                valueKey: "id",
                textKey: "action_name",
              }}
              optionFilterProp="children"
              filterOption={(input: any, option: any) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <InputBox.Radio
              label="User Check"
              name="user_check"
              required
              options={{
                list: [
                  { id: 1, name: "Yes" },
                  { id: 0, name: "No" },
                ],
                valueKey: "id",
                textKey: "name",
              }}
            />
          </Col>
          {type === "edit" ? (
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <InputBox.Text
                required
                label="Sort Order"
                placeholder="Sort Order"
                name="sort_order"
              />
            </Col>
          ) : (
            <></>
          )}
        </Row>
        <Row gutter={15}>
          <Col xs={{ span: 24 }}>
            <InputBox.TextArea
              label="Description"
              name="desc"
              placeholder="Description"
              onChange={handleChange}
            />
          </Col>
        </Row>
      </FormBox>
    );
  }
);

export default FormComponent;
