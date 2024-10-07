import React from "react";
import "../../assets/css/Reservation/ReservationConfirmModal.css";

const ReservationConfirmModal = ({
  isOpen,
  title,
  content,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  // content가 존재하고 올바르게 split되어 있는지 확인
  const contentLines = content
    ? content.split("\n").map((line) => line.trim())
    : [];

  return (
    <div className="reservation-confirm-modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">{title}</h2>
        <div className="modal-body">
          {contentLines.length > 0 && (
            <div className="modal-intro">
              <span>{contentLines[0]}</span>
            </div>
          )}
          <table className="modal-table">
            <tbody>
              {contentLines.slice(1).map((line, index) => {
                if (!line) return null; // line이 비어있거나 undefined일 경우 무시
                const [label, value] = line.split(":");
                return (
                  <tr key={index}>
                    <td className="modal-table-label">{label?.trim()}</td>
                    <td className="modal-table-value">{value?.trim()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="modal-buttons">
          <button className="cancel-button" onClick={onClose}>
            취소
          </button>
          <button className="confirm-button" onClick={onConfirm}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationConfirmModal;
