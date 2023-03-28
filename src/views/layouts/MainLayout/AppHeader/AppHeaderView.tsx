import React, { Dispatch, SetStateAction, useEffect } from "react";
import { Dropdown, Layout, Form } from "antd";
import { DownOutlined } from "@ant-design/icons";
import Avatar from "../../../../assets/images/user.png";
import useStore from "../../../../store";
import { FormBox, InputBox } from "../../../../components/AntdAddons";
import { observer } from "mobx-react";
import { ReactComponent as LeftArrow } from "../../../../assets/images/icon/left-arrow-icon.svg";
import { useNavigate } from "react-router-dom";
import { CONSTANT } from "../../../../config/Constant";

interface HeaderViewProps {
  collapsed: boolean;
  SetCollapsed: Dispatch<SetStateAction<boolean>>;
}

const AppHeaderView: React.FC<HeaderViewProps> = observer(
  ({ collapsed, SetCollapsed }) => {
    const { AUTH } = useStore();
    const { doLogout, fetchAdminMenu } = AUTH;
    const [form] = Form.useForm();
    const navigate = useNavigate();

    // call logout function
    const logout = () => {
      doLogout().then(() => {
        navigate("/login");
      });
    };

    // console.log("menu", toJS(AUTH.accessMenu));

    const items = [
      { label: <div onClick={() => logout()}>Logout</div>, key: "Logout" },
    ];

    const selectCityDropdown = (e: any) => {
      const payload = {
        app_master_id: e ? e : null,
      };
      fetchAdminMenu(payload).then(() => {
        const menuName = AUTH.accessMenu.find(
          (menu: any) => menu.path === window.location.pathname
        );

        if (menuName) {
          window.location.reload();
          // navigate(window.location.pathname);
        } else {
          navigate(CONSTANT.DASHBOARD_REDIRECT_PATH);
        }
      });
    };

    useEffect(() => {
      if (localStorage.getItem("app_list")) {
        AUTH.setAppList(JSON.parse(localStorage.getItem("app_list") ?? ""));
      }
      if (
        localStorage.getItem("app_id") &&
        localStorage.getItem("app_id") !== "null"
      ) {
        form.setFieldsValue({
          app_list: parseInt(localStorage.getItem("app_id") ?? ""),
        });
      }
    }, []);

    return (
      <Layout.Header className="main__page__appheader">
        <div className="headerWrap">
          <div className="appheader__left">
            {/* {visible ? ( */}
            <div className="menuToggle">
              {collapsed ? (
                <div
                  className="icon right"
                  onClick={() => SetCollapsed(!collapsed)}
                >
                  <LeftArrow />
                </div>
              ) : (
                <div className="icon" onClick={() => SetCollapsed(!collapsed)}>
                  <LeftArrow />
                </div>
              )}
            </div>

            {AUTH.user.user_role_id === CONSTANT.SUPER_ADMIN_ROLE_ID &&
              AUTH.appList && (
                <div className="adminDropdown">
                  <FormBox form={form} id="adminDropForm">
                    <InputBox.Select
                      // label="App List"
                      placeholder="Select App"
                      name="app_list"
                      required
                      allowClear
                      onChange={(e: any) => selectCityDropdown(e)}
                      options={{
                        list: AUTH.appList,
                        valueKey: "id",
                        textKey: "officer_app_name",
                      }}
                      showSearch
                      optionFilterProp="children"
                      filterOption={(input: any, option: any) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    />
                  </FormBox>
                </div>
              )}
          </div>
          <div className="appheader__right">
            <div className="userDropdown">
              <Dropdown
                menu={{ items }}
                // dropdownRender={(menu) => (
                //   <div className="dropdown-content">jinal</div>
                // )}
                trigger={["click"]}
                overlayClassName="userMenuList"
              >
                <div className="userMenuWrap">
                  <span className="avatar">
                    <img src={Avatar} alt="Avatar" />
                  </span>
                  <span className="userName">{AUTH?.user?.full_name}</span>
                  <DownOutlined />
                </div>
              </Dropdown>
            </div>
          </div>
        </div>
      </Layout.Header>
    );
  }
);

export default AppHeaderView;
