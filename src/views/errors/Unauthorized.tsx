import { Modal } from "antd";
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import useStore from "../../store";
import LoginForm from "../app_pages/auth/LoginForm";

const Unauthorized: React.FC = observer(() => {
  const { AUTH } = useStore();
  let isUnauthorise = AUTH.isUnauthorized();

  useEffect(() => {
    isUnauthorise = AUTH.isUnauthorized();
  }, [isUnauthorise]);

  return (
    <Modal
      // title="New Topic"
      width={540}
      open={isUnauthorise}
      centered
      className="unauthoriseModal"
      // onCancel={drawerClose}
      // destroyOnClose
      // closeIcon={<FontAwesomeIcon icon={faTimes} />}
      footer={null}
    >
      <LoginForm />
    </Modal>
    // <section className="section unauthorized__section">
    // 	<Result
    // 		status="403"
    // 		title="403"
    // 		subTitle="Sorry, you are not authorized to access this page."
    // 		extra={
    // 			<Space size="large">
    // 				<Button
    // 					size="large"
    // 					type="primary"
    // 					onClick={() => navigate(-1)}
    // 				>
    // 					Go Back
    // 				</Button>
    // 				<Button size="large" type="primary">
    // 					<Link to="/">Bact Home</Link>
    // 				</Button>
    // 			</Space>
    // 		}
    // 	/>
    // </section>
  );
});

export default Unauthorized;
