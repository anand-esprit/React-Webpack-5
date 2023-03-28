import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { Button, Modal, Form, Row, Col } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { InputBox } from "../../../../components/AntdAddons";

const ModeratorComponent: React.FC<any> = observer(
  ({ visible, close, addModerator, editValues, viewValues, type }) => {
    const [form] = Form.useForm();

    useEffect(() => {
      let moderatorData: any = [];

      if (type === "add") {
        moderatorData.push({
          email: "",
        });
      }

      if (editValues && type === "edit") {
        const moderator = JSON.parse(editValues.moderators);

        if (moderator.length > 0) {
          moderatorData = moderator.map((item: any) => {
            return { email: item.email };
          });
        }
      }

      if (viewValues && type === "view") {
        const moderator = JSON.parse(viewValues.moderators);

        if (moderator.length > 0) {
          moderatorData = moderator.map((item: any) => {
            return { email: item.email };
          });
        }
      }

      form.setFieldsValue({
        moderators: moderatorData,
      });
    }, [editValues, viewValues]);

    return (
      <Modal
        centered
        title="Moderators"
        open={visible}
        closeIcon={<FontAwesomeIcon icon={faTimes} />}
        onCancel={close}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        footer={[
          // <Button key="2" htmlType="button" className="cancelBtn" onClick={close}>
          //   Cancel
          // </Button>,

          type !== "view" ? (
            <Button
              key="1"
              type="primary"
              htmlType="submit"
              form="addModeratorForm"
            >
              Submit
            </Button>
          ) : null,
        ]}
      >
        <Form
          form={form}
          name="addModeratorForm"
          onFinish={addModerator}
          autoComplete="off"
          className="addModerator"
        >
          <Form.List name="moderators">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name }) => (
                  <Row gutter={15} key={key}>
                    <Col xs={{ span: 24 }} md={{ span: 22 }}>
                      <InputBox.Text
                        required
                        // label="Email"
                        placeholder="Email"
                        name={[name, "email"]}
                        disabled={type === "view"}
                        rules={[
                          {
                            required: true,
                            message: "Email field is Required",
                          },
                        ]}
                      />
                    </Col>
                    <Col xs={{ span: 24 }} md={{ span: 2 }}>
                      {type !== "view" && name !== 0 && (
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      )}
                    </Col>
                  </Row>
                ))}
                {type !== "view" && (
                  <Button
                    className="addBtn"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                  >
                    Add Email
                  </Button>
                )}
              </>
            )}
          </Form.List>
        </Form>
      </Modal>
    );
  }
);

export default ModeratorComponent;
