import { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input } from "antd";

import useAuth from "../../../zustand/auth";

import Loader from "../../../components/loader/Loader";

import "./style.scss";

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { register, loading } = useAuth();

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
        <section className="register">
          <div className="container">
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
              onFinish={() => register(form, navigate)}
              autoComplete="off"
            >
              <Form.Item>
                <h2 className="register__title">Register</h2>
              </Form.Item>
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
                  Register
                </button>
              </Form.Item>
              <div>
                <div className="register__subinfo">
                  <p>Already have an account ? </p>
                  <Link to="/login">Login here</Link>
                </div>
                <div className="register__subinfo">
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

export default RegisterPage;
