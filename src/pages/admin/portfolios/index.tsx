import {
  Button,
  Flex,
  Form,
  Image,
  Input,
  Modal,
  Pagination,
  Space,
  Table,
} from "antd";
import { Fragment, useEffect } from "react";
import usePortfolios from "../../../zustand/portfolios";
import { LIMIT } from "../../../constants";
import { useNavigate } from "react-router-dom";
import { getImage } from "../../../utils/getImage";
import { Link } from "react-router-dom";
import { PhotoType } from "../../../types/portfolios";

const PortfoliosPage = () => {
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
    photo,
    data: portfolios,
    showModal,
    closeModal,
    handleSearch,
    handlePage,
    handleOk,
    uploadPhoto,
    editData: editPortfolio,
    deleteData: deletePortfolio,
    getData: getPortfolios,
  } = usePortfolios();

  useEffect(() => {
    getPortfolios();
  }, [getPortfolios]);

  const columns = [
    {
      title: "Photo",
      dataIndex: "photo",
      key: "photo",
      render: (data: PhotoType) => (
        <Image
          height={50}
          width={50}
          style={{
            objectFit: "cover",
            borderRadius: "50%",
          }}
          src={getImage(data)}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "External link",
      dataIndex: "url",
      key: "url",
      render: (data: string) => (
        <Link to={data} rel="noreferrer" target="_blank">
          {data}
        </Link>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "_id",
      render: (id: string) => (
        <Space size="middle">
          <Button type="primary" onClick={() => editPortfolio(form, id)}>
            Edit
          </Button>
          <Button
            type="primary"
            danger
            onClick={() =>
              Modal.confirm({
                title: "Do you want to delete this portfolio ?",
                onOk: () => deletePortfolio(id),
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
        dataSource={portfolios?.data}
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
              <h1 className="skills-title">Portfolios</h1>
              <Input
                className="search-input"
                value={search}
                onChange={(e) => handleSearch(e, navigate)}
                style={{ width: "auto", flexGrow: 1 }}
                placeholder="Searching..."
              />
              <Button onClick={() => showModal(form)} type="dashed">
                Add portfolio
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
        title="Portfolio info"
        maskClosable={false}
        confirmLoading={isModalLoading}
        okText={selected === null ? "Add portfolio" : "Save portfolio"}
        open={isModalOpen}
        onOk={() => handleOk(form)}
        onCancel={closeModal}
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
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please include project name!",
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
                message: "Please enter a brief description of your project !",
              },
            ]}
          >
            <Input.TextArea showCount maxLength={100} />
          </Form.Item>

          <Form.Item
            label="External link"
            name="url"
            rules={[
              {
                required: true,
                message: "Please enter a valid url !",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <div>
            <input
              className="upload-btn"
              type="file"
              onChange={(e) => uploadPhoto(e)}
            />{" "}
            {/* {photo ? <Image src={getImage(photo)} /> : null} */}
          </div>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default PortfoliosPage;
