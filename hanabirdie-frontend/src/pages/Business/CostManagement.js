import React, { useState, useEffect } from "react";
import RegisterCost from "./RegisterCost";
import EditCost from "./EditCost";
import "../../assets/css/Business/CostManagement.css";

const CostManagement = () => {
  const [activePage, setActivePage] = useState("register");

  return (
    <div className="cost-management-page">
      <div className="cost-management-header">
        <button
          className={`toggle-button ${
            activePage === "register" ? "active" : ""
          }`}
          onClick={() => setActivePage("register")}
        >
          비용 등록
        </button>
        <button
          className={`toggle-button ${activePage === "edit" ? "active" : ""}`}
          onClick={() => setActivePage("edit")}
        >
          비용 수정
        </button>
      </div>

      {activePage === "register" ? (
        <>
          <RegisterCost />
        </>
      ) : (
        <>
          <EditCost />
        </>
      )}
    </div>
  );
};

export default CostManagement;
