import { Fragment, useEffect, useState } from "react";

import { Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";

import Loader from "../../../components/loader/Loader";
import useAuth from "../../../zustand/auth";

import "./style.scss";

const LoginPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { login, loading } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timerId = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, []);

  return (
    <Fragment>
      {isLoading || loading ? (
        <Loader />
      ) : (
        <section className="login">
          <div className="container">
            <h2 className="login__title">Sign in</h2>
            <Form
              form={form}
              className="login-form"
              name="login"
              labelCol={{
                span: 24,
              }}
              wrapperCol={{
                span: 24,
              }}
              onFinish={() => login(form, navigate)}
              autoComplete="off"
            >
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

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
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
                <button className="submit-btn" type="submit">
                  Login
                </button>
              </Form.Item>
              <div>
                <div className="login__subinfo">
                  <p>Do not have an account yet? </p>
                  <Link to="/register">Register here</Link>
                </div>
                <div className="login__subinfo">
                  <p>Not ready yet ?</p>
                  <Link to="/">See our home page</Link>
                </div>
              </div>
            </Form>
          </div>
        </section>
      )}
    </Fragment>
  );
};

export default LoginPage;
