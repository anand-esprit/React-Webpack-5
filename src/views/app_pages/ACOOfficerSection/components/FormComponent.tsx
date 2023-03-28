import React, { useEffect, useState } from "react";
import { Col, Row, Spin } from "antd";
import { observer } from "mobx-react";
import { FormBox, InputBox } from "../../../../components/AntdAddons";
import { ACOOfficerSectionRequest } from "../../../../requests/PageRequest";
import useStore from "../../../../store";
// import debounce from "lodash/debounce";

const FormComponent: React.FC<any> = observer(
  ({ form, id, handleSubmit, handleChange, editValues, type }) => {
    const { LOV_STORE } = useStore();
    const { getACOOfficerSectionList } = LOV_STORE;
    const [fetchACOOfficerSection, setFetchACOOfficerSection] =
      useState<boolean>(true);

    // set the form values to edit
    useEffect(() => {
      if (editValues && type === "edit") {
        LOV_STORE.dropdown_aco_officer_section_list = editValues.parent && [
          editValues.parent,
        ];
        form.setFieldsValue({
          name: editValues.name,
          nav_name: editValues.nav_name,
          action: editValues.action,
          view_opt: editValues.view_opt,
          next_interface: editValues.next_interface,
          value: editValues.value,
          web_url: editValues.web_url,
          desc: editValues.desc,
          sort_order: editValues.sort_order,
          email: editValues.email,
          place_call: editValues.place_call,
          parent_id: editValues.parent_id,
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
            <InputBox.Text
              required
              label="Name"
              placeholder="Name"
              name="name"
              rules={ACOOfficerSectionRequest.name}
            />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <InputBox.Text
              required
              label="Nav Name"
              placeholder="Navigation Name"
              name="nav_name"
              rules={ACOOfficerSectionRequest.nav_name}
            />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <InputBox.Select
              label="View Option"
              name="view_opt"
              required
              placeholder="Select View Option"
              options={{
                list: [
                  { id: "android", name: "Android" },
                  { id: "web", name: "Web" },
                  { id: "call", name: "Call" },
                  { id: "email", name: "Email" },
                ],
                valueKey: "id",
                textKey: "name",
              }}
              rules={ACOOfficerSectionRequest.view_opt}
            />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <InputBox.Text
              label="Next Interface"
              placeholder="Next Interface"
              name="next_interface"
              onChange={handleChange}
            />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <InputBox.Text
              label="Value"
              placeholder="Value"
              name="value"
              rules={ACOOfficerSectionRequest.value}
              onChange={handleChange}
            />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <InputBox.Select
              label="Parent Controller"
              name="parent_id"
              onChange={handleChange}
              onFocus={() =>
                fetchACOOfficerSection &&
                getACOOfficerSectionList().then(() =>
                  setFetchACOOfficerSection(false)
                )
              }
              notFoundContent={
                fetchACOOfficerSection ? (
                  <Spin size="small" />
                ) : (
                  "No Record Found."
                )
              }
              // onChange={(e) => handleStateChange(e)}
              options={{
                list: LOV_STORE.dropdown_aco_officer_section_list,
                valueKey: "id",
                textKey: "nav_name",
              }}
            />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <InputBox.Text
              label="Web URL"
              placeholder="Web URL"
              name="web_url"
              onChange={handleChange}
              rules={ACOOfficerSectionRequest.web_url}
            />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <InputBox.Text
              label="Place Call"
              placeholder="Place Call"
              name="place_call"
              onChange={handleChange}
              rules={ACOOfficerSectionRequest.place_call}
            />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <InputBox.Text
              label="Email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              rules={ACOOfficerSectionRequest.email}
            />
          </Col>
          {type === "edit" ? (
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <InputBox.Text
                required
                label="Sort Order"
                placeholder="Sort Order"
                name="sort_order"
                onChange={handleChange}
                rules={ACOOfficerSectionRequest.sort_order}
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
              rules={ACOOfficerSectionRequest.desc}
            />
          </Col>
        </Row>
      </FormBox>
    );
  }
);

export default FormComponent;
