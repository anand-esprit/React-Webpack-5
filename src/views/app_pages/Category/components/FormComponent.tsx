import React, { useEffect, useState } from "react";
import { Col, Row, Upload, Form, Spin } from "antd";
import { observer } from "mobx-react";
import { FormBox, InputBox } from "../../../../components/AntdAddons";
import { CONSTANT } from "../../../../config/Constant";
import { PlusOutlined } from "@ant-design/icons";
import useStore from "../../../../store";
import { CategoryRequest } from "../../../../requests/PageRequest";
// import debounce from "lodash/debounce";

const FormComponent: React.FC<any> = observer(
  ({
    form,
    id,
    handleSubmit,
    handleChange,
    editValues,
    type,
    fileIconList,
    setFileIconList,
    setisImageUploaded,
  }) => {
    const { LOV_STORE } = useStore();
    const { getUserRoleList } = LOV_STORE;

    const [fetchUserRole, setFetchUserRole] = useState<boolean>(true);

    // console.log("roleKeys", UserRoleArr);

    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );

    // set the form values to edit
    useEffect(() => {
      if (editValues && type === "edit") {
        LOV_STORE.dropdown_user_role_list =
          editValues.user_role_detail && editValues.user_role_detail;

        if (editValues.icon) {
          setFileIconList([
            {
              uid: "-1",
              // name: "image.png",
              status: "done",
              url: CONSTANT.AWS_BUCKET_URL + editValues?.icon,
            },
          ]);
        }

        form.setFieldsValue({
          name: editValues.name,
          name_hi: editValues.name_hi,
          agency_ref_id: editValues.agency_ref_id,
          module: editValues.module,
          is_active: editValues.is_active,
          sort_order: editValues.sort_order,
          user_role_ids: editValues.user_role_detail
            ? editValues.user_role_detail.map((item: any) => item.id)
            : [],
        });
      }
    }, [editValues, form]);

    const iconProps = {
      onRemove: (file: any) => {
        const index = fileIconList.indexOf(file);
        const newFileList = fileIconList.slice();
        newFileList.splice(index, 1);
        setFileIconList(newFileList);
        setisImageUploaded(true);
      },
      beforeUpload: (file: any) => {
        setFileIconList([file]);
        setisImageUploaded(true);
        return false;
      },
      fileIconList,
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
            <InputBox.Text
              required
              label="Name"
              placeholder="Name"
              name="name"
              rules={CategoryRequest.name}
            />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <InputBox.Text
              label="Category Name Hindi"
              placeholder="Category Name Hindi"
              name="name_hi"
              rules={CategoryRequest.name_hi}
            />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <InputBox.Text
              label="Agency Reference ID"
              placeholder="Agency Reference ID"
              name="agency_ref_id"
              rules={CategoryRequest.agency_ref_id}
            />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <InputBox.Select
              label="Type of Module"
              name="module"
              placeholder="Select Module"
              showArrow
              required
              rules={CategoryRequest.module}
              options={{
                list: CONSTANT.CATEGORY_MODULE,
                valueKey: "id",
                textKey: "name",
              }}
              optionFilterProp="children"
              filterOption={(input: any, option: any) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              onChange={handleChange}
            />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 24 }}>
            <InputBox.Select
              label="User Role"
              name="user_role_ids"
              mode="multiple"
              placeholder="Select User Role"
              showArrow
              onFocus={() =>
                fetchUserRole &&
                getUserRoleList().then(() => setFetchUserRole(false))
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
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              onChange={handleChange}
            />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <Form.Item
              label="Icon"
              // valuePropName="icon"
              name="icon"
            >
              <Upload
                {...iconProps}
                name="icon"
                maxCount={1}
                fileList={editValues?.icon ? fileIconList : null}
                multiple={false}
                listType="picture-card"
              >
                {fileIconList.length >= 1 ? null : uploadButton}
              </Upload>
            </Form.Item>
          </Col>
          <Col xs={{ span: 12 }} md={{ span: 8 }}>
            <InputBox.Radio
              label="Is Active"
              name="is_active"
              required
              onChange={handleChange}
              options={{
                list: [
                  { id: 1, name: "Yes" },
                  { id: 0, name: "No" },
                ],
                valueKey: "id",
                textKey: "name",
              }}
              rules={CategoryRequest.is_active}
            />
          </Col>

          {type === "edit" ? (
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <InputBox.Text
                label="Sort Order"
                placeholder="Sort Order"
                name="sort_order"
              />
            </Col>
          ) : (
            <></>
          )}
        </Row>
      </FormBox>
    );
  }
);

export default FormComponent;
