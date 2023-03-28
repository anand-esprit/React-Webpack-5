import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { Button, Modal, Form, Row, Col } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { InputBox } from "../../../../components/AntdAddons";

const TagsComponent: React.FC<any> = observer(
  ({ visible, close, addTags, editValues, type }) => {
    const [form] = Form.useForm();

    useEffect(() => {
      let tagData: any = [];
      if (type === "add") {
        tagData.push({
          key: "",
          value: "",
        });
      }

      if (editValues && type === "edit") {
        const tags = JSON.parse(editValues.tags);
        if (tags && tags.length > 0) {
          tagData = tags.map((item: any) => {
            return { key: item.key, value: item.value };
          });
        }
      }

      form.setFieldsValue({
        tags: tagData,
      });
    }, [editValues]);

    return (
      <Modal
        centered
        title="Tags"
        open={visible}
        closeIcon={<FontAwesomeIcon icon={faTimes} />}
        onCancel={close}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        footer={[
          // <Button key="2" htmlType="button" className="cancelBtn" onClick={close}>
          //   Cancel
          // </Button>,
          <Button key="1" type="primary" htmlType="submit" form="addTagsForm">
            Submit
          </Button>,
        ]}
      >
        <Form
          form={form}
          name="addTagsForm"
          onFinish={addTags}
          autoComplete="off"
          className="addModerator"
        >
          <Form.List name="tags">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name }) => (
                  <Row gutter={15} key={key}>
                    <Col xs={{ span: 24 }} md={{ span: 11 }}>
                      <InputBox.Text
                        required
                        // label="Email"
                        placeholder="Key"
                        name={[name, "key"]}
                        rules={[
                          { required: true, message: "Key field is Required" },
                        ]}
                      />
                    </Col>
                    <Col xs={{ span: 24 }} md={{ span: 11 }}>
                      <InputBox.Text
                        required
                        // label="Email"
                        placeholder="Value"
                        name={[name, "value"]}
                        rules={[
                          {
                            required: true,
                            message: "Value field is Required",
                          },
                        ]}
                      />
                    </Col>
                    <Col xs={{ span: 24 }} md={{ span: 2 }}>
                      {name !== 0 && (
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      )}
                    </Col>
                  </Row>
                ))}
                <Button
                  className="addBtn"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                >
                  Add Tag
                </Button>
              </>
            )}
          </Form.List>
        </Form>
      </Modal>
    );
  }
);

export default TagsComponent;
