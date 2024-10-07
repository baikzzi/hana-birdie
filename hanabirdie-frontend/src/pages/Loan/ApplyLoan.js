// src/components/Loan/ApplyLoan.js

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import LoanCalculator from "./LoanCalculator";
import BizRegModal from "./BizRegModal";
import "../../assets/css/Loan/ApplyLoan.css";
import loanCalculatorImg from "../../assets/png/loanCalculator.png";
import pdfIcon from "../../assets/png/pdf.png";

// PDF 파일 임포트
import pdf1 from "../../assets/pdf/은행여신거래기본약관(기업용).pdf";
import pdf2 from "../../assets/pdf/여신거래약정서(기업용).pdf";
import pdf3 from "../../assets/pdf/대출상품설명서.pdf";
import pdf5 from "../../assets/pdf/기업정보제공활용동의서.pdf";

const ApplyLoan = () => {
  const location = useLocation(); // 현재 위치와 state 접근
  const navigate = useNavigate(); // useNavigate 훅 사용
  const { loanProduct } = location.state || {}; // 전달된 loanProduct 데이터
  const { userInfo } = useAuth();
  const userId = userInfo?.userId || ""; // userId 추출

  // Destructure loanProduct with default values
  const {
    loanProductId = "",
    loanName = "",
    description = "",
  } = loanProduct || {};

  // 폼 데이터 상태
  const [formData, setFormData] = useState({
    compName: "하나CC", // 기업명 (비활성화)
    compRegno: "",
    compStartDate: "",
    compAddr: "",
    ceo: "",
    managerName: "",
    ceoPhone: "",
    managerPhone: "",
    ceoEmail: "",
    managerEmail: "",
    loanAmount: "",
    loanAccountNumber: "", // 변경: accountNo → loanAccountNumber
    loanTerm: "",
    interestRate: "",
    interestDueDate: "1", // 변경: interestPaydate → interestDueDate
    loanRepaymentMethod: "", // 변경: loanPayType → loanRepaymentMethod
    loanProductId: loanProductId, // 이전 페이지에서 받은 loanProductId 사용
    userId: userId, // 추가: userId 포함
  });

  // 대출 상세 정보 상태 (필요에 따라 수정 또는 제거 가능)
  const [loanDetails, setLoanDetails] = useState({
    detail: "",
    loanProductCode: "",
    interestLow: "",
    loanTermB: 0, // 필요에 따라 수정 또는 제거 가능
  });

  // 계좌 목록 상태
  const [accounts, setAccounts] = useState([]);

  // 로딩 상태
  const [loading, setLoading] = useState(true);

  // 모달 상태
  const [showBizRegModal, setShowBizRegModal] = useState(false);

  // 약관 동의 상태
  const [agreements, setAgreements] = useState({
    agreement1: false,
    agreement2: false,
    agreement3: false,
    agreement4: false,
    agreement5: false,
  });

  // 알림 상태
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    variant: "",
  });

  // 대출계산기 모달 열림/닫힘 상태
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  // 대출계산기 모달 열기 함수
  const openLoanCalculator = () => {
    setIsCalculatorOpen(true);
  };

  // 대출계산기 모달 닫기 함수
  const closeLoanCalculator = () => {
    setIsCalculatorOpen(false);
  };

  // 컴포넌트 마운트 시 데이터 설정
  useEffect(() => {
    const fetchData = () => {
      try {
        // 샘플 계좌 데이터 (실제 API 호출로 대체 가능)
        const mockedAccounts = [
          { loanAccountNumber: "123-456-7890" },
          { loanAccountNumber: "987-654-3210" },
          { loanAccountNumber: "555-666-7777" },
        ];
        setAccounts(mockedAccounts);

        // 전달된 loanProduct 데이터가 있는 경우, 대출 상세 정보 설정
        if (loanProduct) {
          setLoanDetails((prevDetails) => ({
            ...prevDetails,
            detail: loanName, // 이전에는 title
            loanProductCode: loanProductId, // 예: "LN_0001"
            interestLow: "3.5", // 우대 금리 설정 (예시)
            loanTermB: 6, // 우대 대출 기한 설정 (예시: 필요에 따라 수정)
          }));

          setFormData((prevData) => ({
            ...prevData,
            interestRate: "3.5",
          }));
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setAlert({
          show: true,
          message: "데이터를 불러오는 중 오류가 발생했습니다.",
          variant: "danger",
        });
        setLoading(false);
      }
    };

    fetchData();
  }, [loanProduct, loanName, loanProductId]);

  // 폼 입력 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 약관 동의 변경 핸들러
  const handleAgreementChange = (e) => {
    const { name, checked } = e.target;
    setAgreements((prevAgreements) => ({
      ...prevAgreements,
      [name]: checked,
    }));
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 필수 입력 필드 검증
    const requiredFields = [
      { name: "compRegno", label: "사업자등록번호" },
      { name: "compStartDate", label: "설립일자" },
      { name: "compAddr", label: "주소" },
      { name: "ceo", label: "대표자 성명" },
      { name: "managerName", label: "담당자 성명" },
      { name: "ceoPhone", label: "대표자 연락처" },
      { name: "managerPhone", label: "담당자 연락처" },
      { name: "ceoEmail", label: "대표자 이메일" },
      { name: "managerEmail", label: "담당자 이메일" },
      { name: "loanAmount", label: "대출신청금액" },
      { name: "loanAccountNumber", label: "대출금 입금계좌" }, // 변경
      { name: "loanTerm", label: "희망대출기한" },
      { name: "interestRate", label: "희망대출이자" },
      { name: "interestDueDate", label: "이자납부일" }, // 변경
      { name: "loanRepaymentMethod", label: "상환방법" }, // 변경
    ];

    for (let field of requiredFields) {
      if (!formData[field.name]) {
        setAlert({
          show: true,
          message: `${field.label} 항목은 필수 입력사항입니다.`,
          variant: "warning",
        });
        return;
      }
    }

    // 약관 동의 검증
    const requiredAgreements = [
      "agreement1",
      "agreement2",
      "agreement3",
      "agreement4",
      "agreement5",
    ];

    for (let agreement of requiredAgreements) {
      if (!agreements[agreement]) {
        setAlert({
          show: true,
          message: "모든 약관에 동의해야 합니다.",
          variant: "warning",
        });
        return;
      }
    }

    // Prepare the request body
    const requestBody = {
      userId, // golfCourseId 대신 userId 사용
      loanProductId: loanProductId,
      loanAmount: formData.loanAmount,
      loanTerm: formData.loanTerm, // 희망대출기한을 월 단위로 직접 사용
      interestRate: parseFloat(formData.interestRate),
      interestDueDate: formData.interestDueDate,
      loanRepaymentMethod: formData.loanRepaymentMethod,
      loanAccountNumber: formData.loanAccountNumber,
    };

    try {
      // API 호출 주석 처리
      const response = await axios.post(
        "http://localhost:8080/api/v1/loan/apply",
        requestBody
      );

      // 성공 알림 표시
      setAlert({
        show: true,
        message: "대출 신청이 성공적으로 완료되었습니다.",
        variant: "success",
      });

      // 실제 환경에서는 서버 응답에 따라 추가 처리가 필요할 수 있습니다.

      // 2초 후 ConfirmLoan 페이지로 이동
      setTimeout(() => {
        navigate("/confirmLoan", {
          state: { loanProduct: loanProduct, formData: formData },
        });
      }, 2000);
    } catch (error) {
      console.error("Error applying for loan:", error);
      setAlert({
        show: true,
        message: "대출 신청 중 오류가 발생했습니다.",
        variant: "danger",
      });
    }
  };

  // 사업자등록증 업로드 핸들러
  const handleBizRegSubmit = async (formData) => {
    const file = formData.get("uploadfile");
    if (file) {
      try {
        // 파일 이름에 따른 formData 업데이트
        let updatedFields = {};

        if (file.name === "a.png") {
          updatedFields = {
            compName: "하나CC",
            compRegno: "111321113",
            compStartDate: "2011-10-12",
            compAddr: "인천광역시 서구 에코로 181",
            ceo: "백하나",
            managerName: "김별순",
            ceoPhone: "010-4046-1111",
            managerPhone: "010-3321-3321",
            ceoEmail: "hanacc@naver.com",
            managerEmail: "kim@naver.com",
          };
        } else if (file.name === "b.png") {
          updatedFields = {
            compName: "청라CC",
            compRegno: "21144405",
            compStartDate: "2009-02-10",
            compAddr: "인천광역시 서구 비즈니스로 41",
            ceo: "김하나",
            managerName: "김별돌",
            ceoPhone: "010-1111-0737",
            managerPhone: "010-3333-1111",
            ceoEmail: "cheongnacc@naver.com",
            managerEmail: "baik@naver.com",
          };
        }

        if (Object.keys(updatedFields).length > 0) {
          setFormData((prevData) => ({
            ...prevData,
            ...updatedFields,
          }));

          // 업데이트된 formData를 바로 콘솔에 출력
          console.log("Updated Form Data based on file name:", {
            ...formData,
            ...updatedFields,
          });

          // 성공 알림 표시
          setAlert({
            show: true,
            message: "파일 업로드와 함께 폼 데이터가 업데이트되었습니다.",
            variant: "success",
          });
        } else {
          // 파일 이름이 a.png 또는 b.png가 아닌 경우
          setAlert({
            show: true,
            message:
              "지원되지 않는 파일 이름입니다. 폼 데이터가 업데이트되지 않았습니다.",
            variant: "warning",
          });
        }

        // 모달 닫기
        setShowBizRegModal(false);
      } catch (error) {
        console.error("File upload error:", error);
        setAlert({
          show: true,
          message: "파일 업로드 중 오류가 발생했습니다.",
          variant: "danger",
        });
      }
    } else {
      setAlert({
        show: true,
        message: "업로드할 파일을 선택해주세요.",
        variant: "warning",
      });
    }
  };

  // 데이터 수신 확인을 위한 로그 추가
  useEffect(() => {
    console.log("Received loanProduct:", loanProduct);
  }, [loanProduct]);

  if (loading) {
    return (
      <div className="applyLoan-loader-container">
        <div className="applyLoan-spinner"></div>
      </div>
    );
  }

  return (
    <div className="applyLoan-apply-loan-container">
      {alert.show && (
        <div className={`applyLoan-alert ${alert.variant}`}>
          <span
            className="applyLoan-closebtn"
            onClick={() => setAlert({ ...alert, show: false })}
          >
            &times;
          </span>
          {alert.message}
        </div>
      )}

      <div className="applyLoan-main-content">
        {/* 헤더 영역 */}
        <div className="applyLoan-header">
          {/* 첫 번째 행: 기업대출신청 및 상세 정보 */}
          <div className="applyLoan-title">
            <h2>기업대출신청</h2>
            <span id="loanName2">{loanDetails.detail}</span>
          </div>
          {/* 두 번째 행: 사업자등록증 업로드 버튼 */}
          <div className="applyLoan-upload-button-container">
            <button
              onClick={() => setShowBizRegModal(true)}
              className="applyLoan-upload-button"
            >
              <span
                className="material-icons-sharp"
                style={{ marginRight: "5px" }}
              >
                upload_file
              </span>
              사업자등록증 업로드
            </button>
          </div>
        </div>

        {/* 기본사항 */}
        <div className="applyLoan-section-header">
          <span className="material-icons-sharp">arrow_circle_right</span>
          <h4>기본사항</h4>
        </div>
        <p>
          <span style={{ color: "red" }}>*</span> 표시는 필수 입력사항입니다
        </p>

        <form onSubmit={handleSubmit}>
          <div className="applyLoan-form-section">
            <table className="applyLoan-loan-apply-table">
              <tbody>
                <tr>
                  <th>
                    <span style={{ color: "red" }}>*</span> 기업명
                  </th>
                  <td colSpan="3">
                    <input
                      type="text"
                      name="compName"
                      value={formData.compName} // 비활성화된 기업명
                      disabled
                    />
                  </td>
                </tr>
                <tr>
                  <th>
                    <span style={{ color: "red" }}>*</span> 사업자등록번호
                  </th>
                  <td>
                    <input
                      type="text"
                      name="compRegno"
                      id="compRegno"
                      value={formData.compRegno}
                      onChange={handleChange}
                      required
                    />
                  </td>
                  <th>
                    <span style={{ color: "red" }}>*</span> 설립일자
                  </th>
                  <td>
                    <input
                      type="date"
                      name="compStartDate"
                      id="compStartDate"
                      value={formData.compStartDate}
                      onChange={handleChange}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <th>
                    <span style={{ color: "red" }}>*</span> 주소
                  </th>
                  <td colSpan="3">
                    <input
                      type="text"
                      name="compAddr"
                      id="compAddr"
                      value={formData.compAddr}
                      onChange={handleChange}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <th>
                    <span style={{ color: "red" }}>*</span> 대표자 성명
                  </th>
                  <td>
                    <input
                      type="text"
                      name="ceo"
                      id="ceo"
                      value={formData.ceo}
                      onChange={handleChange}
                      required
                    />
                  </td>
                  <th>
                    <span style={{ color: "red" }}>*</span> 담당자 성명
                  </th>
                  <td>
                    <input
                      type="text"
                      name="managerName"
                      id="managerName"
                      value={formData.managerName}
                      onChange={handleChange}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <th>
                    <span style={{ color: "red" }}>*</span> 대표자 연락처
                  </th>
                  <td>
                    <input
                      type="text"
                      name="ceoPhone"
                      value={formData.ceoPhone}
                      onChange={handleChange}
                      required
                    />
                  </td>
                  <th>
                    <span style={{ color: "red" }}>*</span> 담당자 연락처
                  </th>
                  <td>
                    <input
                      type="text"
                      name="managerPhone"
                      value={formData.managerPhone}
                      onChange={handleChange}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <th>
                    <span style={{ color: "red" }}>*</span> 대표자 이메일
                  </th>
                  <td>
                    <input
                      type="email"
                      name="ceoEmail"
                      id="ceoEmail"
                      value={formData.ceoEmail}
                      onChange={handleChange}
                      required
                    />
                  </td>
                  <th>
                    <span style={{ color: "red" }}>*</span> 담당자 이메일
                  </th>
                  <td>
                    <input
                      type="email"
                      name="managerEmail"
                      id="managerEmail"
                      value={formData.managerEmail}
                      onChange={handleChange}
                      required
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 대출내용 */}
          <div className="applyLoan-section-header my-5">
            <span className="material-icons-sharp">arrow_circle_right</span>
            <h4>대출내용</h4>
          </div>
          <p>
            <span style={{ color: "red" }}>*</span> 표시는 필수 입력사항입니다
          </p>

          <div className="applyLoan-form-section">
            <table className="applyLoan-loan-apply-table">
              <tbody>
                {/* 1행: 대출명 */}
                <tr>
                  <th>
                    <span style={{ color: "red" }}>*</span> 대출명
                  </th>
                  <td colSpan="3" id="loanName">
                    {loanDetails.detail}
                  </td>
                </tr>
                {/* 2행: 대출신청금액 */}
                <tr>
                  <th>
                    <span style={{ color: "red" }}>*</span> 대출신청금액
                  </th>
                  <td colSpan="3">
                    <input
                      type="number"
                      name="loanAmount"
                      id="loanAmount"
                      value={formData.loanAmount}
                      onChange={handleChange}
                      min="0"
                      required
                    />
                  </td>
                </tr>
                {/* 3행: 대출금 입금계좌, 희망대출기한 */}
                <tr>
                  <th>
                    <span style={{ color: "red" }}>*</span> 대출금 입금계좌
                  </th>
                  <td>
                    <select
                      name="loanAccountNumber" // 변경: accountNo → loanAccountNumber
                      id="selectAccountNo"
                      value={formData.loanAccountNumber} // 변경
                      onChange={handleChange}
                      required
                    >
                      <option value="">계좌 선택</option>
                      {Array.isArray(accounts) && accounts.length > 0 ? (
                        accounts.map((account) => (
                          <option
                            key={account.loanAccountNumber} // 변경
                            value={account.loanAccountNumber} // 변경
                          >
                            {account.loanAccountNumber} {/* 변경 */}
                          </option>
                        ))
                      ) : (
                        <option value="">계좌가 없습니다.</option>
                      )}
                    </select>
                  </td>
                  <th>
                    <span style={{ color: "red" }}>*</span> 희망대출기한
                  </th>
                  <td>
                    <select
                      name="loanTerm"
                      id="loanTerm"
                      value={formData.loanTerm}
                      onChange={handleChange}
                      required
                    >
                      <option value="">기한 선택</option>
                      <option value="6">6개월</option>
                      <option value="12">12개월</option>
                      <option value="24">24개월</option>
                      <option value="36">36개월</option>
                      <option value="48">48개월</option>
                      <option value="60">60개월</option>
                    </select>
                  </td>
                </tr>
                {/* 4행: 희망대출이자, 이자납부일 */}
                <tr>
                  <th>
                    <span style={{ color: "red" }}>*</span> 희망대출이자
                  </th>
                  <td>
                    <input
                      type="number"
                      name="interestRate"
                      id="interestRate"
                      value={formData.interestRate}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      required
                    />
                  </td>
                  <th>
                    <span style={{ color: "red" }}>*</span> 이자납부일
                  </th>
                  <td>
                    <select
                      name="interestDueDate" // 변경: interestPaydate → interestDueDate
                      value={formData.interestDueDate} // 변경
                      onChange={handleChange}
                      required
                    >
                      <option value="1">매달 1일</option>
                      <option value="5">매달 5일</option>
                      <option value="10">매달 10일</option>
                      <option value="15">매달 15일</option>
                      <option value="20">매달 20일</option>
                      <option value="25">매달 25일</option>
                    </select>
                  </td>
                </tr>
                {/* 5행: 상환방법, 대출계산기 버튼 */}
                <tr>
                  <th>
                    <span style={{ color: "red" }}>*</span> 상환방법
                  </th>
                  <td>
                    <select
                      name="loanRepaymentMethod" // 변경: loanPayType → loanRepaymentMethod
                      id="loanRepaymentMethod" // 변경: loanPayTypeSelect → loanRepaymentMethod
                      value={formData.loanRepaymentMethod} // 변경
                      onChange={handleChange}
                      required
                    >
                      <option value="">상환방법 선택</option>
                      <option value="원금만기일시상환">원금만기일시상환</option>
                      <option value="원리금균등상환">원리금균등상환</option>
                      <option value="원금균등상환">원금균등상환</option>
                    </select>
                  </td>
                  <td colSpan="2">
                    <button
                      type="button"
                      className="LoanProductDetailApplyButton"
                      onClick={openLoanCalculator} // 클릭 시 모달 열기
                    >
                      <img src={loanCalculatorImg} alt="Loan Calculator" />
                      대출계산기
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 대출약관동의 */}
          <div className="applyLoan-section-header my-5">
            <span className="material-icons-sharp">arrow_circle_right</span>
            <h4>대출약관동의</h4>
          </div>

          <div className="applyLoan-form-section">
            {/* 각 약관 동의 항목 */}
            <div className="applyLoan-agreement">
              <div className="applyLoan-agreement-left">
                <a
                  href={pdf1}
                  className="applyLoan-downloadApply"
                  download
                  aria-label="은행여신거래기본약관(기업용) 다운로드"
                >
                  <img src={pdfIcon} alt="PDF" />
                  <span>은행여신거래기본약관(기업용)</span>
                </a>
              </div>
              <input
                type="checkbox"
                id="agreement1"
                name="agreement1"
                checked={agreements.agreement1}
                onChange={handleAgreementChange}
              />
              <label htmlFor="agreement1">
                은행여신거래기본약관에 동의합니다.
              </label>
            </div>

            <div className="applyLoan-agreement">
              <div className="applyLoan-agreement-left">
                <a
                  href={pdf2}
                  className="applyLoan-downloadApply"
                  download
                  aria-label="여신거래약정서(기업용) 다운로드"
                >
                  <img src={pdfIcon} alt="PDF" />
                  <span>여신거래약정서(기업용)</span>
                </a>
              </div>

              <input
                type="checkbox"
                id="agreement2"
                name="agreement2"
                checked={agreements.agreement2}
                onChange={handleAgreementChange}
              />
              <label htmlFor="agreement2">여신거래약정서에 동의합니다.</label>
            </div>

            <div className="applyLoan-agreement">
              <div className="applyLoan-agreement-left">
                <a
                  href={pdf3}
                  className="applyLoan-downloadApply"
                  download
                  aria-label="대출상품설명서 다운로드"
                >
                  <img src={pdfIcon} alt="PDF" />
                  <span>대출상품설명서</span>
                </a>
              </div>

              <input
                type="checkbox"
                id="agreement3"
                name="agreement3"
                checked={agreements.agreement3}
                onChange={handleAgreementChange}
              />
              <label htmlFor="agreement3">
                대출상품설명서를 읽고 이해했으며 동의합니다.
              </label>
            </div>

            <div className="applyLoan-agreement">
              <div className="applyLoan-agreement-left">
                <a
                  href={pdf5}
                  className="applyLoan-downloadApply"
                  download
                  aria-label="기업정보제공활용동의서 다운로드"
                >
                  <img src={pdfIcon} alt="PDF" />
                  <span>기업정보제공활용동의서</span>
                </a>
              </div>

              <input
                type="checkbox"
                id="agreement4"
                name="agreement4"
                checked={agreements.agreement4}
                onChange={handleAgreementChange}
              />
              <label htmlFor="agreement4">재무상태표 열람에 동의합니다.</label>
            </div>

            <div className="applyLoan-agreement">
              <div className="applyLoan-agreement-left">
                <a
                  href={pdf5}
                  className="applyLoan-downloadApply"
                  download
                  aria-label="기업정보제공활용동의서 다운로드"
                >
                  <img src={pdfIcon} alt="PDF" />
                  <span>열람동의서</span>
                </a>
              </div>
              <input
                type="checkbox"
                id="agreement5"
                name="agreement5"
                checked={agreements.agreement5}
                onChange={handleAgreementChange}
              />
              <label htmlFor="agreement5">
                대출 심사와 관련 기업정보를 제공 및 활용하는 것에 동의합니다.
              </label>
            </div>
          </div>

          {/* 제출 버튼 */}
          <div className="applyLoan-submit-button-container">
            <button type="submit" className="applyLoan-submit-button">
              <span
                className="material-icons-sharp"
                style={{ marginRight: "5px" }}
              >
                approval
              </span>
              신청하기
            </button>
          </div>
        </form>
      </div>

      {/* LoanCalculator Modal */}
      {isCalculatorOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <LoanCalculator closeCalculator={closeLoanCalculator} />
          </div>
        </div>
      )}

      {/* Business Registration Modal */}
      <BizRegModal
        show={showBizRegModal}
        handleClose={() => setShowBizRegModal(false)}
        handleBizRegSubmit={handleBizRegSubmit} // 수정: 불필요한 props 제거
      />
    </div>
  );
};

export default ApplyLoan;
