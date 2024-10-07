// src/pages/Loan/Section2.js
import React, { useEffect, useRef } from "react";
import styles from "../../assets/css/Loan/Section2.module.css";
import finance from "../../assets/png/financeSafety.png";
import loan from "../../assets/png/loan.png";

const Section2 = () => {
  const home2TextRef = useRef(null);
  const home2ContentsRef = useRef([]);
  const home2ImagesRef = useRef([]);

  useEffect(() => {
    const home2Text = home2TextRef.current;
    const home2Contents = home2ContentsRef.current;
    const home2Images = home2ImagesRef.current;

    if (home2Text) {
      const observer2 = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // 텍스트에 애니메이션 클래스 추가
              home2Text.classList.add(styles.animateAppearFromBottom);

              setTimeout(() => {
                home2Contents.forEach((item) => {
                  if (item) {
                    item.classList.add(styles.animateAppearFromBottom);
                  }
                });
                setTimeout(() => {
                  home2Images.forEach((item) => {
                    if (item) {
                      item.classList.add(styles.animateAppearFromBottom);
                    }
                  });
                }, 600);
              }, 600);

              observer.unobserve(home2Text);
            }
          });
        },
        { threshold: 0.5 }
      );
      observer2.observe(home2Text);

      // Cleanup on unmount
      return () => {
        if (observer2 && home2Text) {
          observer2.unobserve(home2Text);
        }
      };
    }
  }, []);

  return (
    <section className={styles.home2Wrap}>
      <div className={styles.home2Container}>
        <div className={styles.home2ContainerInner}>
          <div className={styles.home2TextWrap} ref={home2TextRef}>
            <h1>대출</h1>
            <h2>
              운영자금 확보,
              <br />
              골프장 사업 확장을
              <br />
              미리 준비하세요
            </h2>
          </div>

          <div className={styles.home2GridContainer}>
            <div className={styles.home2Content}>
              <img
                src={finance}
                alt="예탁금 담보"
                ref={(el) => (home2ImagesRef.current[0] = el)}
                className={styles.imageItem1}
              />
              <div
                className={styles.home2ContentTextWrap}
                ref={(el) => (home2ContentsRef.current[0] = el)}
              >
                <h1>예탁금 담보 대출</h1>
                <h2>골프장 회원 예탁금을</h2>
                <h2>하나은행과 함께 관리하고,</h2>
                <h2>대출금리를 우대받으세요</h2>
              </div>
            </div>

            <div className={styles.home2Content}>
              <img
                src={loan}
                alt="운영자금 대출"
                ref={(el) => (home2ImagesRef.current[1] = el)}
                className={styles.imageItem2}
              />
              <div
                className={styles.home2ContentTextWrap}
                ref={(el) => (home2ContentsRef.current[1] = el)}
              >
                <h1>운영자금 대출</h1>
                <h2>유동성 확보 및</h2>
                <h2>사업 확장을 위한</h2>
                <h2>운영자금을 확보하세요</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section2;
