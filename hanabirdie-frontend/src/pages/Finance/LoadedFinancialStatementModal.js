// LoadedFinancialStatementModal.js
import React from "react";
import Modal from "react-modal";
import LoadedFinancialStatementView from "./LoadedFinancialStatementView";
import "../../assets/css/Finance/LoadedFinancialStatementModal.css";

// 모달 스타일 설정
const customStyles = {
  overlay: {
    zIndex: 1000,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)", // Ensures modal is centered
    maxHeight: "80vh",
    overflow: "auto",
    zIndex: 1002,
    width: "900px",
    padding: "20px", // Optional: adds some padding inside the modal
    borderRadius: "8px", // Optional: softens the corners of the modal
  },
};

Modal.setAppElement("#root");

const LoadedFinancialStatementModal = ({
  isOpen,
  onRequestClose,
  rows,
  thstrmNum,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="재무상태표 보기 모달"
      className="financial-statement-loaded-modal"
      portalClassName="financial-statement-loaded-modal-portal"
    >
      <button
        className="financial-statement-loaded-close-button"
        onClick={onRequestClose}
      >
        <span className="material-symbols-outlined">close</span>
      </button>

      <LoadedFinancialStatementView rows={rows} thstrmNum={thstrmNum} />
    </Modal>
  );
};

export default LoadedFinancialStatementModal;
