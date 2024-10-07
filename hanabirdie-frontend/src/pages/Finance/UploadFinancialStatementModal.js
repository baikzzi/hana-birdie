import React, { useState } from "react";
import Modal from "react-modal";
import "../../assets/css/Finance/UploadFinancialStatementModal.css";
import { message } from "antd";
import DefaultView from "./DefaultView";
import FinancialStatementView from "./FinancialStatementView";
import axios from "axios";
import Select from "react-select";
import { ClipLoader } from "react-spinners";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxHeight: "80vh",
    overflow: "auto",
    zIndex: 1002,
    width: "800px",
    padding: "20px",
    borderRadius: "8px",
  },
};

const customSelectStyles = {
  menu: (provided) => ({
    ...provided,
    maxHeight: "200px",
    overflowY: "hidden",
  }),
  control: (provided) => ({
    ...provided,
    minWidth: "200px",
  }),
  menuPortal: (base) => ({
    ...base,
    zIndex: 2000,
  }),
};

Modal.setAppElement("#root");

const UploadFinancialStatementModal = ({
  isOpen,
  onRequestClose,
  onUploadSuccess,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [parsedTableData, setParsedTableData] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const golfCourseId = 10002; // 고정된 골프장 아이디

  // 현재 년도부터 과거로 30년간의 재무년도 목록 생성 함수
  const getFinancialYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = 0; i < 30; i++) {
      years.push({ value: currentYear - i, label: `${currentYear - i}` });
    }
    return years;
  };

  // 파일 정보 설정 함수
  const handleFileChange = (file) => {
    setSelectedFile(file);
  };

  // 업로드 및 OCR 추출 함수
  const handleUpload = async () => {
    if (!selectedFile) {
      message.info("파일을 선택해주세요.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await axios.post(
        "http://localhost:8080/api/v1/finance/ocr",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const tableData = response.data; // API 응답 데이터를 사용
      const parsedData = JSON.parse(JSON.stringify(tableData));
      setParsedTableData(parsedData); // OCR 데이터 설정
      setLoading(false);
      message.success("OCR 처리가 완료되었습니다. 재무제표를 확인하세요.");
    } catch (error) {
      console.error("업로드 중 오류 발생:", error);
      setError(error.message);
      setLoading(false);
      message.error("업로드 중 오류가 발생했습니다.");
    }
  };

  // "등록하기" 버튼 클릭 시 호출되는 함수
  const handleConfirmAndRegister = async () => {
    if (!selectedYear) {
      message.info("재무년도를 선택해주세요.");
      return;
    }

    if (!parsedTableData || !parsedTableData.rows || !parsedTableData.headers) {
      message.error("추출된 데이터가 유효하지 않습니다.");
      return;
    }

    // thstrm_num을 정수로 변환
    const thstrmNum = parseInt(
      parsedTableData.headers[1].match(/\d+/g)?.join("") || "0",
      10
    );

    // sampleFinancialStatement 생성
    const sampleFinancialStatement = parsedTableData.rows.map((row, index) => ({
      golfCourseId: golfCourseId, // 고정된 골프장 아이디
      reportYear: selectedYear.value, // 선택한 재무년도
      thstrmNum: thstrmNum, // 정수로 변환한 thstrm_num
      rowCnt: index + 1, // 행번호 (1부터 시작)
      accountNm: row[0].trim(), // 과목명
      thstrmLeft: row[1].trim(), // thstrm_left
      thstrmRight: row[2].trim(), // thstrm_right
      frmtrmLeft: row[3].trim(), // frmtrm_left
      frmtrmRight: row[4].trim(), // frmtrm_right
    }));

    try {
      const uploadResponse = await axios.post(
        "http://localhost:8080/api/v1/finance/upload",
        sampleFinancialStatement,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Upload Response:", uploadResponse.data);
      message.success("재무상태표가 성공적으로 등록되었습니다.");
      onUploadSuccess(); // 업로드 성공 콜백 호출
      handleReadAgain(); // 모달 닫기 및 초기화
    } catch (error) {
      console.error("재무상태표 등록 중 오류 발생:", error);
      setError(error.message);
      message.error("재무상태표 등록 중 오류가 발생했습니다.");
    }
  };

  // "다시 읽기" 버튼 클릭 시 호출되는 함수
  const handleReadAgain = () => {
    setSelectedFile(null);
    setParsedTableData(null);
    setError(null);
    setSelectedYear(null); // 재무년도 초기화
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="재무상태표 업로드 모달"
    >
      <button
        className="financial-statement-management-close-button"
        onClick={onRequestClose}
      >
        <span className="material-symbols-outlined">close</span>
      </button>

      {/* OCR 완료 전: 파일 업로드 영역 */}
      {!parsedTableData ? (
        <>
          <DefaultView onFileUpload={handleFileChange} />
          <div
            className="file-upload-container"
            style={{ textAlign: "center" }}
          >
            {loading ? (
              <ClipLoader size={35} color={"#007bff"} loading={loading} />
            ) : (
              <button
                className="financial-statement-management-upload-button"
                onClick={handleUpload}
                disabled={!selectedFile} // 파일이 선택되지 않은 경우 버튼 비활성화
              >
                업로드 및 추출
              </button>
            )}
            {error && <p className="error-message">오류: {error}</p>}
          </div>
        </>
      ) : (
        <>
          {/* OCR 완료 후: 재무제표 미리보기 및 재무년도 선택 */}
          <div className="year-selection-section">
            <div className="financial-statement-management-year-selection">
              <div className="upload-financial-statement-button-group">
                <button
                  className="financial-statement-management-read-again-button"
                  onClick={handleReadAgain}
                >
                  다시 읽기
                </button>
              </div>
              <div className="financial-statement-management-dropdown-and-confirm">
                <div className="year-dropdown">
                  <label
                    htmlFor="financialYear"
                    style={{ marginRight: "10px" }}
                  >
                    재무년도를 선택하세요:
                  </label>
                  <Select
                    id="financialYear"
                    value={selectedYear}
                    onChange={setSelectedYear}
                    options={getFinancialYears()}
                    styles={customSelectStyles}
                    placeholder="선택"
                    menuPortalTarget={document.body}
                    menuPosition="fixed"
                  />
                </div>
                <button
                  className="financial-statement-management-confirm-button"
                  onClick={handleConfirmAndRegister}
                  disabled={!selectedYear} // 재무년도 선택이 안되면 버튼 비활성화
                >
                  등록하기
                </button>
              </div>
            </div>
          </div>

          {/* 재무상태표 데이터 뷰어 */}
          <FinancialStatementView
            data={parsedTableData}
            thstrmNum={parseInt(
              parsedTableData.headers[1].match(/\d+/g)?.join("") || "0",
              10
            )}
          />
        </>
      )}
    </Modal>
  );
};

export default UploadFinancialStatementModal;
