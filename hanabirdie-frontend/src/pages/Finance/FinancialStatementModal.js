// FinancialStatementModal.js
import React from "react";
import Modal from "react-modal";
import FinancialStatementView from "./FinancialStatementView";

// 모달 스타일 설정
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

// 모달 접근성을 위한 설정
Modal.setAppElement("#root");

const FinancialStatementModal = ({ isOpen, onRequestClose, data }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="재무상태표 보기 모달"
    >
      <button
        className="financial-statement-management-close-button"
        onClick={onRequestClose}
      >
        <span className="material-symbols-outlined">close</span>
      </button>
      <FinancialStatementView data={data} />
    </Modal>
  );
};

export default FinancialStatementModal;
