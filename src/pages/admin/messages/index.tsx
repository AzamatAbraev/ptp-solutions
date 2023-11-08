import {
  Button,
  Flex,
  Form,
  Input,
  Modal,
  Pagination,
  Space,
  Table,
} from "antd";
import { Fragment, useEffect } from "react";
import { LIMIT } from "../../../constants";
import { useNavigate } from "react-router-dom";

import useMessages from "../../../zustand/messages";

import "./style.scss";

const MessagesPage = () => {
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
    data: education,
    showModal,
    closeModal,
    handleSearch,
    handlePage,
    handleOk,
    editData: editMessages,
    deleteData: deleteMessages,
    getData: getEducation,
  } = useMessages();

  useEffect(() => {
    getEducation();
  }, [getEducation]);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
      render: (data: string) => (
        <p
          style={{
            marginBottom: "0px",
          }}
          title="click answer to read more"
        >
          {data.slice(0, 50)}
        </p>
      ),
    },
    {
      title: "Sent by",
      dataIndex: "user",
    },
    {
      title: "Answer",
      dataIndex: "answer",
      render: (data: string) => {
        return (
          <p
            title="click answer to read more"
            className={data ? `answer` : `not-answered`}
          >
            {data ? `${data.slice(0, 50)}` : "No answer"}
          </p>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "_id",
      render: (id: string) => (
        <Space size="middle">
          <Button type="primary" onClick={() => editMessages(form, id)}>
            Answer
          </Button>
          <Button
            type="primary"
            danger
            onClick={() =>
              Modal.confirm({
                title: "Do you want to delete this message ?",
                onOk: () => deleteMessages(id),
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
        dataSource={education?.data}
        columns={columns}
        bordered={true}
        title={() => (
          <Fragment>
            <Flex
              className="table-title2"
              align="center"
              justify="space-between"
              gap={36}
            >
              <h1 className="skills-title">Messages</h1>
              <Input
                className="search-input"
                value={search}
                onChange={(e) => handleSearch(e, navigate)}
                style={{ width: "auto", flexGrow: 1 }}
                placeholder="Searching..."
              />
              <Button onClick={() => showModal(form)} type="dashed">
                Add message
              </Button>
            </Flex>
            <div>
              <p className="search-result-text">
                About <span>{total}</span> results match
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
        title="Message info"
        maskClosable={false}
        confirmLoading={isModalLoading}
        okText={selected === null ? "Add message" : "Save message"}
        open={isModalOpen}
        onOk={() => handleOk(form)}
        onCancel={closeModal}
      >
        <Form
          name="message"
          autoComplete="off"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          form={form}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                message: "Please type message title!",
              },
            ]}
          >
            <Input
              title="This is ready-only mode"
              disabled={Boolean(selected)}
            />
          </Form.Item>

          <Form.Item
            label="Message"
            name="message"
            rules={[
              {
                required: true,
                message: "Please enter your message !",
              },
            ]}
          >
            <Input.TextArea
              title="This is ready-only mode"
              disabled={Boolean(selected)}
              showCount
              maxLength={100}
            />
          </Form.Item>

          {selected ? null : (
            <Fragment>
              <Form.Item
                label="The receiver id"
                name="whom"
                rules={[
                  {
                    required: true,
                    message: "Please enter receiver id !",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Your email or phone number"
                name="user"
                rules={[
                  {
                    required: true,
                    message: "Please enter receiver id !",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Fragment>
          )}

          {selected ? (
            <Form.Item
              label="Answer"
              name="answer"
              rules={[
                {
                  required: true,
                  message: "Please enter your response",
                },
              ]}
            >
              <Input />
            </Form.Item>
          ) : null}
        </Form>
      </Modal>
    </Fragment>
  );
};

export default MessagesPage;
