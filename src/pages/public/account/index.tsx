import { useState, useEffect } from "react";
import { Button, Flex, Form, Image, Input, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import useAuth from "../../../zustand/auth";
import Loader from "../../../components/loader/Loader";
import { getUserImage } from "../../../utils/getImage";

import "react-tabs/style/react-tabs.css";
import "./style.scss";

const AccountPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const {
    loading,
    photo,
    accountInfo,
    updateAccount,
    uploadPhoto,
    logout,
    updatePassword,
    getAccountInfo,
  } = useAuth();

  useEffect(() => {
    setIsLoading(true);
    const timerId = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, []);

  useEffect(() => {
    getAccountInfo(form);
  }, [form, getAccountInfo]);

  return (
    <>
      {isLoading || loading ? (
        <Loader />
      ) : (
        <section className="register">
          <div className="container">
            <Tabs className="tab">
              <TabList className="tab-account">
                <Tab className="tab-item tab1">Edit account info</Tab>
                <Tab className="tab-item tab2">Change password</Tab>
              </TabList>

              <TabPanel>
                <Form
                  form={form}
                  className="register-form"
                  name="register"
                  labelCol={{
                    span: 24,
                  }}
                  wrapperCol={{
                    span: 24,
                  }}
                  onFinish={() => updateAccount(form, navigate)}
                  autoComplete="off"
                >
                  <Form.Item>
                    <h2 className="register__title">Account Info</h2>
                  </Form.Item>
                  <div className="upload-image-container">
                    <Image
                      className="account-image"
                      style={{
                        width: "100%",
                      }}
                      src={
                        photo
                          ? getUserImage(photo)
                          : getUserImage(accountInfo.photo)
                      }
                    />
                    <input
                      className="upload-btn register-input"
                      type="file"
                      onChange={(e) => uploadPhoto(e)}
                    />
                  </div>
                  <Form.Item
                    label="First name"
                    name="firstName"
                    rules={[
                      {
                        required: true,
                        message: "Please input your firstname!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Last name"
                    name="lastName"
                    rules={[
                      {
                        required: true,
                        message: "Please input your lastname!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Flex align="center" justify="space-between" gap={30}>
                    <Form.Item
                      label="Address"
                      name="address"
                      rules={[
                        {
                          required: true,
                          message: "Please input your address!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item label="Date of birth" name="birthday">
                      <input
                        className="date-picker register-date-picker"
                        type="date"
                      />
                    </Form.Item>
                  </Flex>

                  <Flex align="center" justify="space-between" gap={30}>
                    <Form.Item
                      label="Phone number"
                      name="phoneNumber"
                      rules={[
                        {
                          required: true,
                          message: "Please input your address!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: "Please input your email address!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Flex>

                  <Flex>
                    <Flex align="center" justify="space-between" gap={10}>
                      <Form.Item label="Github" name="github">
                        <Input />
                      </Form.Item>

                      <Form.Item label="Instagram" name="instagram">
                        <Input />
                      </Form.Item>

                      <Form.Item label="Telegram" name="telegram">
                        <Input />
                      </Form.Item>
                    </Flex>
                  </Flex>

                  <Form.Item label="Describe yourself" name="info">
                    <Input.TextArea />
                  </Form.Item>

                  <Form.Item
                    className="btn-container"
                    wrapperCol={{
                      offset: 0,
                      span: 24,
                    }}
                  >
                    <button className="submit-btn" type="submit">
                      Update Info
                    </button>
                  </Form.Item>
                  <div>
                    <div className="register__subinfo">
                      <p>Do you want to change log out ? </p>
                      <Button
                        onClick={() =>
                          Modal.confirm({
                            title: "Do you want to log out ?",
                            onOk: () => logout(navigate),
                          })
                        }
                      >
                        Logout
                      </Button>
                    </div>
                  </div>
                </Form>
              </TabPanel>
              <TabPanel>
                <Form
                  form={form}
                  name="password"
                  className="reset-password"
                  style={{
                    paddingTop: "30px",
                  }}
                  labelCol={{
                    span: 24,
                  }}
                  wrapperCol={{
                    span: 24,
                  }}
                  onFinish={() => updatePassword(form, navigate)}
                  autoComplete="off"
                >
                  <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Current password"
                    name="currentPassword"
                    rules={[
                      {
                        required: true,
                        message: "Please input your current password",
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item
                    label="New password"
                    name="newPassword"
                    rules={[
                      {
                        required: true,
                        message: "Please input your new password",
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item
                    className="btn-container"
                    wrapperCol={{
                      offset: 0,
                      span: 24,
                    }}
                  >
                    <button
                      className="submit-btn"
                      style={{
                        width: "100%",
                      }}
                      type="submit"
                    >
                      Update Info
                    </button>
                  </Form.Item>
                </Form>
              </TabPanel>
            </Tabs>
          </div>
        </section>
      )}
    </>
  );
};

export default AccountPage;
