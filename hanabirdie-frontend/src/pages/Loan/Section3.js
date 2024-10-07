import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../assets/css/Loan/Section3.module.css"; // CSS Module import

const Section3 = ({ LoanProcess, LoanStep }) => {
  const section3Ref = useRef(null);
  const loanProcessRef = useRef(null);
  const loanStepRef = useRef(null);
  const buttonsRef = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    const section3 = section3Ref.current;
    const loanProcess = loanProcessRef.current;
    const loanStep = loanStepRef.current;
    const buttons = buttonsRef.current;

    if (section3) {
      const observer = new IntersectionObserver(
        (entries, observerInstance) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // 애니메이션 트리거
              loanProcess.style.opacity = 1;
              loanProcess.style.transform = "translateY(0)";
              loanProcess.style.transition =
                "opacity 1.5s ease, transform 1.5s ease";

              loanStep.style.opacity = 1;
              loanStep.style.transform = "translateY(0)";
              loanStep.style.transition =
                "opacity 1.5s ease, transform 1.5s ease";

              buttons.forEach((button, index) => {
                setTimeout(() => {
                  button.style.opacity = 1;
                  button.style.transform = "translateY(0)";
                  button.style.transition = `opacity 1.5s ease, transform 1.5s ease ${
                    index * 0.3
                  }s`;
                }, index * 300);
              });

              observerInstance.unobserve(section3);
            }
          });
        },
        { threshold: 0.3 }
      );

      observer.observe(section3);

      // Cleanup on unmount
      return () => {
        if (observer && section3) {
          observer.unobserve(section3);
        }
      };
    }
  }, []);

  // 각 버튼의 클릭 핸들러 정의
  const handleLoanProductClick = () => {
    navigate("/loanProduct"); // "/loanProduct" 경로로 이동
  };

  const handleLoanHistoryClick = () => {
    navigate("/loanHistory"); // "/loanHistory" 경로로 이동
  };

  return (
    <section className={styles.section3} ref={section3Ref}>
      <div className={styles.loanMainDiv}>
        <div className={styles.textOverlay}>
          <h2>대출은 다음 순서로 이루어집니다</h2>
        </div>

        <img
          className={styles.loanProcessImg}
          src={LoanProcess}
          alt="Loan Process"
          ref={loanProcessRef}
          style={{ opacity: 0, transform: "translateY(50px)" }}
        />
        <div
          className={styles.loanStep}
          ref={loanStepRef}
          style={{ opacity: 0, transform: "translateY(50px)" }}
        >
          {LoanStep}
        </div>

        <div className={styles.buttonContainer}>
          <button
            className={styles.button}
            ref={(el) => (buttonsRef.current[0] = el)}
            style={{ opacity: 0, transform: "translateY(50px)" }}
            onClick={handleLoanProductClick}
          >
            대출상품 둘러보기
          </button>
          <button
            className={styles.button}
            ref={(el) => (buttonsRef.current[1] = el)}
            style={{ opacity: 0, transform: "translateY(50px)" }}
            onClick={handleLoanHistoryClick}
          >
            대출내역 조회하기
          </button>
        </div>
      </div>
    </section>
  );
};

export default Section3;
