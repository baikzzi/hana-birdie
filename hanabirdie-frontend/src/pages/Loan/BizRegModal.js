// src/components/Loan/BizRegModal.js

import React, { useState } from "react";
import "../../assets/css/Loan/BizRegModal.css"; // 자체 CSS
import { useAuth } from "../../context/AuthContext";
import Loading from "../../components/Loading/Loading"; // Loading 컴포넌트 임포트

// Logo 컴포넌트
const Logo = () => (
  <svg className="defaultView-icon" x="0px" y="0px" viewBox="0 0 24 24">
    <path fill="transparent" d="M0,0h24v24H0V0z" />
    <path
      fill="#000"
      d="M20.5,5.2l-1.4-1.7C18.9,3.2,18.5,3,18,3H6C5.5,3,5.1,3.2,4.8,3.5L3.5,5.2C3.2,5.6,3,6,3,6.5V19
        c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V6.5C21,6,20.8,5.6,20.5,5.2z M12,17.5L6.5,12H10v-2h4v2h3.5L12,17.5z M5.1,5l0.8-1h12l0.9,1
        H5.1z"
    />
  </svg>
);

const BizRegModal = ({ show, handleClose, handleBizRegSubmit }) => {
  const { userInfo } = useAuth();
  const name = userInfo?.name || ""; // 이름 추출

  const [isActive, setActive] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  // 로딩 상태 관리
  const [loading, setLoading] = useState(false); // 파일 업로드 로딩 상태
  const loadingDuration = 2000; // 로딩 시간 (밀리초 단위, 2000ms = 2초)

  // 드래그 이벤트 핸들러
  const handleDragStart = () => setActive(true);
  const handleDragEnd = () => setActive(false);

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // 파일 정보 설정
  const setFileInfo = (file) => {
    const { name, type, size } = file;

    // 파일 유형 검사 (예: 이미지 파일만 허용)
    if (!type.startsWith("image/")) {
      alert("이미지 파일만 업로드할 수 있습니다.");
      return;
    }

    // 파일 크기 검사 (예: 5MB 이하)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (size > maxSize) {
      alert("파일 크기는 5MB 이하로 제한됩니다.");
      return;
    }

    setSelectedFile(file);

    // 이미지 미리보기
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // 드롭 이벤트 핸들러
  const handleDrop = (event) => {
    event.preventDefault();
    setActive(false);

    const file = event.dataTransfer.files[0];
    if (file) {
      setFileInfo(file);
    }
  };

  // 파일 선택 이벤트 핸들러
  const handleUpload = ({ target }) => {
    const file = target.files[0];
    if (file) {
      setFileInfo(file);
    }
  };

  // 폼 제출 핸들러
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      alert("파일을 업로드해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("uploadfile", selectedFile);

    setLoading(true); // 로딩 시작

    // 2초 후에 handleBizRegSubmit 호출 및 모달 닫기
    setTimeout(() => {
      handleBizRegSubmit(formData);
      setLoading(false);
      handleClose();
    }, loadingDuration);
  };

  if (!show) return null;

  return (
    <div className="BizRegModal-modal" onClick={handleClose}>
      <div
        className="BizRegModal-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="BizRegModal-modal-header">
          <h5 className="BizRegModal-modal-title">사업자등록증 업로드</h5>
          <span className="BizRegModal-close-button" onClick={handleClose}>
            &times;
          </span>
        </div>
        <div className="BizRegModal-modal-body">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            {!previewImage ? (
              <label
                className={`preview${isActive ? " active" : ""}`}
                onDragEnter={handleDragStart}
                onDragOver={handleDragOver}
                onDragLeave={handleDragEnd}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  className="file"
                  onChange={handleUpload}
                  accept="image/*"
                />
                <Logo />
                <p className="preview_msg">
                  클릭 혹은 파일을 이곳에 드롭하세요.
                </p>
                <p className="preview_desc">사업자등록증 이미지 업로드</p>
              </label>
            ) : (
              <div className="BizRegModal-preview-section">
                <div className="BizRegModal-preview-image">
                  <img src={previewImage} alt="Preview" />
                </div>
                <div className="BizRegModal-submit-button-container">
                  <button type="submit" className="BizRegModal-submit-button">
                    파일 업로드
                  </button>
                </div>
              </div>
            )}
          </form>

          {/* 로딩 오버레이 */}
          {loading && (
            <div className="BizRegModal-loading-overlay">
              <Loading
                text="사업자등록증을 읽고있습니다..."
                duration={loadingDuration / 1000} // 초 단위로 전달
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BizRegModal;
