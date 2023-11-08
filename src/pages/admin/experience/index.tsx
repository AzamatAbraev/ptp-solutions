import {
  Button,
  Flex,
  Form,
  Input,
  Modal,
  Pagination,
  Space,
  Spin,
  Table,
} from "antd";
import { Fragment, useEffect } from "react";
import { LIMIT } from "../../../constants";
import { useNavigate } from "react-router-dom";
import { longDate } from "../../../utils/dataConvert";
import useExperience from "../../../zustand/experience";

import "./style.scss";

const ExperiencePage = () => {
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
    data: experience,
    showModal,
    closeModal,
    handleSearch,
    handlePage,
    handleOk,
    editData: editExperience,
    deleteData: deleteExperience,
    getData: getExperience,
  } = useExperience();

  useEffect(() => {
    getExperience();
  }, [getExperience]);

  const columns = [
    {
      title: "Full name",
      render: (
        _: any,
        row: { user: { firstName: string; lastName: string } }
      ) =>
        `${row?.user?.firstName ?? "Anonymous"} ${row?.user?.lastName ?? ""}`,
    },
    {
      title: "Position",
      dataIndex: "workName",
      key: "workName",
    },
    {
      title: "Company",
      dataIndex: "companyName",
      key: "workName",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (data: string) => (
        <p style={{ marginBottom: "0px" }}>{data.slice(0, 40)}...</p>
      ),
    },
    {
      title: "Started",
      dataIndex: "startDate",
      key: "startDate",
      render: (date: string) => <p>{longDate(date)}</p>,
    },
    {
      title: "Finished",
      dataIndex: "endDate",
      key: "endDate",
      render: (date: string) => <p>{longDate(date)}</p>,
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "_id",
      render: (id: string) => (
        <Space size="middle">
          <Button type="primary" onClick={() => editExperience(form, id)}>
            Edit
          </Button>
          <Button
            type="primary"
            danger
            onClick={() =>
              Modal.confirm({
                title: "Do you want to delete this experience?",
                onOk: () => deleteExperience(id),
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
    <Spin spinning={loading}>
      <Table
        className="skills-table"
        scroll={{
          x: 1000,
        }}
        pagination={false}
        loading={loading}
        dataSource={experience?.data}
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
              <h1 className="skills-title">Experience</h1>
              <Input
                className="search-input"
                value={search}
                onChange={(e) => handleSearch(e, navigate)}
                style={{ width: "auto", flexGrow: 1 }}
                placeholder="Searching..."
              />
              <Button onClick={() => showModal(form)} type="dashed">
                Add experience
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
        title="Experience info"
        maskClosable={false}
        confirmLoading={isModalLoading}
        okText={selected === null ? "Add experience" : "Save experience"}
        open={isModalOpen}
        onOk={() => handleOk(form)}
        onCancel={() => closeModal()}
      >
        <Form
          name="portfolio"
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
            label="Position"
            name="workName"
            rules={[
              {
                required: true,
                message: "Please include your role or position!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Company"
            name="companyName"
            rules={[
              {
                required: true,
                message: "Please include company you work for!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message:
                  "Please enter a brief description about your experience !",
              },
            ]}
          >
            <Input.TextArea showCount maxLength={100} />
          </Form.Item>

          <Flex align="center" justify="space-between">
            <Form.Item
              label="Start date"
              name="startDate"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <input className="date-picker" type="date" />
            </Form.Item>

            <Form.Item
              label="End date"
              name="endDate"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <input className="date-picker" type="date" />
            </Form.Item>
          </Flex>
        </Form>
      </Modal>
    </Spin>
  );
};

export default ExperiencePage;
