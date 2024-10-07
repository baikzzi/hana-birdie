import React from "react";
import TopButton from "../../components/Top/TopButton";
import Section2 from "./Section2";
import Section3 from "./Section3";
import LoanStep from "./LoanStep";
import styles from "../../assets/css/Loan/LoanMain.module.css"; // CSS Module import
import LoanProcess from "../../assets/png/LoanProcess.png"; // 이미지 경로 유지

const LoanMain = () => {
  return (
    <main className={styles.main}>
      <Section2 />
      <Section3 LoanProcess={LoanProcess} LoanStep={<LoanStep />} />
      <TopButton />
    </main>
  );
};

export default LoanMain;
