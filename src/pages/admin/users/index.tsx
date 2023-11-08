import {
  Button,
  Flex,
  Form,
  Input,
  Modal,
  Pagination,
  Select,
  Space,
  Table,
} from "antd";
import { Fragment, useEffect } from "react";
import { LIMIT } from "../../../constants";
import { useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons/lib/icons";

import useUsers from "../../../zustand/users";

import "./style.scss";
import { longDate } from "../../../utils/dataConvert";

const UsersPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const {
    loading,
    isModalLoading,
    selected,
    isModalOpen,
    search,
    total,
    page,
    data: users,
    showModal,
    closeModal,
    handleSearch,
    handlePage,
    handleOk,
    editData: editUsers,
    deleteData: deleteUsers,
    getData: getUsers,
  } = useUsers();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const columns = [
    {
      title: "Photo",
      dataIndex: "photo",
      key: "photo",
      render: () => <UserOutlined />,
    },
    {
      title: "First name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Account created",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (data: string) => (
        <p style={{ marginBottom: "0px" }}>{data ? longDate(data) : "N/A"}</p>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (data: string) => (
        <p
          className={`tag ${data === "client" ? "client" : ""} ${
            data === "admin" ? "admin" : ""
          } ${data === "client" ? "client" : ""} `}
        >
          {data}
        </p>
      ),
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "_id",
      render: (id: string) => (
        <Space size="middle">
          <Button type="primary" onClick={() => editUsers(form, id)}>
            Edit
          </Button>
          <Button
            type="primary"
            danger
            onClick={() =>
              Modal.confirm({
                title: "Do you want to delete this user ?",
                onOk: () => deleteUsers(id),
              })
            }
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Fragment>
      <Table
        className="skills-table"
        scroll={{
          x: 1000,
        }}
        pagination={false}
        loading={loading}
        dataSource={users?.data}
        columns={columns}
        bordered={true}
        title={() => (
          <Fragment>
            <Flex
              className="table-title"
              align="center"
              justify="space-between"
            >
              <h1 className="skills-title">Users</h1>
              <Input
                className="search-input"
                value={search}
                onChange={(e) => handleSearch(e, navigate)}
                style={{
                  width: "auto",
                  flexGrow: 1,
                  marginRight: "30px",
                  marginLeft: "30px",
                }}
                placeholder="Searching..."
              />
              <Select
                defaultValue="user"
                // onChange={() => sortUsers(e)}
                style={{ width: 120, marginRight: "20px" }}
                options={[
                  {
                    value: "user",
                    label: "User",
                  },
                  { value: "admin", label: "Admin" },
                  {
                    value: "client",
                    label: "Client",
                  },
                ]}
              />
              <Button onClick={() => showModal(form)} type="dashed">
                Add user
              </Button>
            </Flex>
            <div>
              <p className="search-result-text">
                About <span>{total}</span> results found
              </p>
            </div>
          </Fragment>
        )}
      />
      {total > LIMIT ? (
        <Pagination
          className="pagination"
          total={total}
          pageSize={LIMIT}
          current={page}
          onChange={(page) => handlePage(page, navigate)}
        />
      ) : null}
      <Modal
        title="Skill info"
        maskClosable={false}
        confirmLoading={isModalLoading}
        okText={selected === null ? "Add skill" : "Save skill"}
        open={isModalOpen}
        onOk={() => handleOk(form)}
        onCancel={closeModal}
      >
        <Form
          name="portfolio"
          autoComplete="off"
          initialValues={{
            phoneNumber: "+998 ",
          }}
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          form={form}
        >
          <Form.Item
            label="First name"
            name="firstName"
            rules={[
              {
                required: true,
                message: "Please include firstname!",
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
                message: "Please include your lastname",
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
                message: "Please include your username",
              },
            ]}
          >
            <Input />
          </Form.Item>

          {selected === null ? (
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please include your password",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
          ) : null}

          <Form.Item label="Address" name="address">
            <Input />
          </Form.Item>

          <Flex align="center" justify="space-between" gap={36}>
            <Form.Item
              label="Phone number"
              name="phoneNumber"
              rules={[
                {
                  required: true,
                  message: "Please include contact number",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Date of birth" name="birthday">
              <input className="date-picker" type="date" />
            </Form.Item>
          </Flex>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default UsersPage;
