import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Select,
  Typography,
  Layout,
  Row,
  Col,
  Space,
  message,
  Empty,
} from "antd";
import { PlusOutlined, FileSearchOutlined } from "@ant-design/icons";
import "../../assets/css/Finance/FinancialStatementManagement.css";

import UploadFinancialStatementModal from "./UploadFinancialStatementModal";
import FinancialStatementModal from "./FinancialStatementModal";
import LoadedFinancialStatementModal from "./LoadedFinancialStatementModal";
import axios from "axios";

const { Title } = Typography;
const { Content } = Layout;
const { Option } = Select;

const FinancialStatementManagement = () => {
  const [uploadModalIsOpen, setUploadModalIsOpen] = useState(false);
  const [statements, setStatements] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [filteredStatements, setFilteredStatements] = useState([]);
  const [viewModalIsOpen, setViewModalIsOpen] = useState(false);
  const [selectedStatement, setSelectedStatement] = useState(null);
  const [loadedModalIsOpen, setLoadedModalIsOpen] = useState(false);
  const [thstrmNum, setThstrmNum] = useState(0);

  const loadFinancialStatements = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/finance/load",
        {
          golfCourseId: 10002,
        }
      );
      setStatements(response.data);
      message.success("재무상태표 데이터를 불러왔습니다.");
    } catch (error) {
      console.error("재무상태표 불러오기 중 오류 발생:", error);
      message.error("재무상태표 불러오기 중 오류가 발생했습니다.");
    }
  };

  const handleYearChange = (value) => {
    setSelectedYear(value);
    const filtered = statements.filter((stmt) => stmt.reportYear === value);
    setFilteredStatements(filtered);

    if (filtered.length > 0) {
      setThstrmNum(filtered[0].thstrmNum);
    } else {
      setThstrmNum(0);
    }
    setLoadedModalIsOpen(true);
  };

  const openUploadModal = () => setUploadModalIsOpen(true);
  const closeUploadModal = () => setUploadModalIsOpen(false);
  const openViewModal = () => setViewModalIsOpen(true);
  const closeViewModal = () => setViewModalIsOpen(false);
  const openLoadedModal = () => setLoadedModalIsOpen(true);
  const closeLoadedModal = () => setLoadedModalIsOpen(false);

  const handleSelectStatement = (statement) => {
    setSelectedStatement(statement);
    openViewModal();
  };

  const handleUploadSuccess = () => {
    closeUploadModal();
    loadFinancialStatements();
  };

  const uniqueReportYears = Array.from(
    new Set(statements.map((stmt) => stmt.reportYear))
  );

  return (
    <Layout className="financial-statement-management-layout">
      <Content className="financial-statement-management-content">
        <Title level={2} className="financial-statement-management-title">
          재무상태표 관리
        </Title>
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <Row justify="center" gutter={[16, 16]}>
            <Col>
              <Button
                type="primary"
                icon={<FileSearchOutlined />}
                onClick={loadFinancialStatements}
                style={{ backgroundColor: "#008485", borderColor: "#008485" }}
              >
                재무상태표 불러오기
              </Button>
            </Col>
            <Col>
              <Button
                type="dashed"
                icon={<PlusOutlined />}
                onClick={openUploadModal}
              >
                재무상태표 업로드하기
              </Button>
            </Col>
          </Row>

          {statements.length === 0 ? (
            <Empty description="재무상태표를 업로드하여 재무분석 서비스를 이용하세요." />
          ) : (
            <Row justify="center">
              <Col>
                <div className="year-selection-dropdown">
                  <label htmlFor="yearSelect" style={{ marginRight: "10px" }}>
                    년도를 선택하세요:
                  </label>
                  <Select
                    id="yearSelect"
                    value={selectedYear}
                    onChange={handleYearChange}
                    placeholder="선택"
                    style={{ width: 300 }}
                    className="custom-select-dropdown"
                  >
                    {uniqueReportYears.map((year) => (
                      <Option key={year} value={year}>
                        {year}
                      </Option>
                    ))}
                  </Select>
                </div>
              </Col>
            </Row>
          )}

          <LoadedFinancialStatementModal
            isOpen={loadedModalIsOpen}
            onRequestClose={closeLoadedModal}
            rows={filteredStatements.map((stmt) => [
              stmt.accountNm || "",
              stmt.thstrmLeft || "",
              stmt.thstrmRight || "",
              stmt.frmtrmLeft || "",
              stmt.frmtrmRight || "",
            ])}
            thstrmNum={thstrmNum}
          />

          {selectedStatement && (
            <FinancialStatementModal
              isOpen={viewModalIsOpen}
              onRequestClose={closeViewModal}
              data={selectedStatement.data}
            />
          )}
        </Space>

        <UploadFinancialStatementModal
          isOpen={uploadModalIsOpen}
          onRequestClose={closeUploadModal}
          onUploadSuccess={handleUploadSuccess}
        />
      </Content>
    </Layout>
  );
};

export default FinancialStatementManagement;
