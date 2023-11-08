import {
  Button,
  Flex,
  Form,
  Input,
  InputNumber,
  Modal,
  Pagination,
  Space,
  Table,
} from "antd";
import { Fragment, useEffect } from "react";
import { LIMIT } from "../../../constants";
import { useNavigate } from "react-router-dom";

import "./style.scss";
import useSkills from "../../../zustand/skills";

const SkillsPage = () => {
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
    editData: editSkills,
    deleteData: deleteSkills,
    getData: getEducation,
  } = useSkills();

  useEffect(() => {
    getEducation();
  }, [getEducation]);

    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Percent",
        dataIndex: "percent",
        key: "percent",
        render: (data: string) => <p style={{ marginBottom: "0px" }}>{data}%</p>,
      },
      {
        title: "Posted by",
        render: (_: string, row: any) =>
          `${row?.user?.firstName ?? "Anonymous"} ${row?.user?.lastName ?? ""}`,
      },
      {
        title: "Action",
        dataIndex: "_id",
        key: "_id",
        render: (id: string) => (
          <Space size="middle">
            <Button type="primary" onClick={() => editSkills(form, id)}>
              Edit
            </Button>
            <Button
              type="primary"
              danger
              onClick={() =>
                Modal.confirm({
                  title: "Do you want to delete this skill ?",
                  onOk: () => deleteSkills(id),
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
              <h1 className="skills-title">Skills</h1>
              <Input
                className="search-input"
                value={search}
                onChange={(e) => handleSearch(e, navigate)}
                style={{ width: "auto", flexGrow: 1 }}
                placeholder="Searching..."
              />
              <Button onClick={() => showModal(form)} type="dashed">
                Add skill
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
        title="Skill info"
        maskClosable={false}
        confirmLoading={isModalLoading}
        okText={selected === null ? "Add skill" : "Save skill"}
        open={isModalOpen}
        onOk={() => handleOk(form)}
        onCancel={closeModal}
      >
        <Form
          name="category"
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
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please include skill name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Percent"
            name="percent"
            rules={[
              {
                required: true,
                message: "Please input value up to 100"
              },
            ]}
          >
            <InputNumber max={100} />
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default SkillsPage;
