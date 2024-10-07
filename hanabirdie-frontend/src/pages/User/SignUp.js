import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/User/SignUp.css";

function SignUp() {
  const [userId, setUserId] = useState("");
  const [userPasswd, setUserPasswd] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [birthDate, setBirthDate] = useState(""); // 생년월일
  const [gender, setGender] = useState(""); // 성별
  const [identifyNumFront, setIdentifyNumFront] = useState(""); // 주민등록번호 앞자리 6자리
  const [identifyNumBack, setIdentifyNumBack] = useState(""); // 주민등록번호 뒷자리 7자리
  const [carrier, setCarrier] = useState(""); // 통신사
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const formatPhoneNumber = (value) => {
    const cleaned = value.replace(/\D/g, ""); // 숫자가 아닌 모든 것을 제거

    if (cleaned.length <= 3) {
      return cleaned;
    } else if (cleaned.length <= 7) {
      return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
    } else {
      return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(
        7
      )}`;
    }
  };

  const handlePhoneNumChange = (e) => {
    const formattedPhoneNum = formatPhoneNumber(e.target.value);
    setPhoneNum(formattedPhoneNum);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 간단한 유효성 검사
    if (
      !userId ||
      !userPasswd ||
      !confirmPassword ||
      !name ||
      !email ||
      !phoneNum ||
      !birthDate ||
      !gender ||
      !identifyNumFront ||
      !identifyNumBack ||
      !carrier
    ) {
      setErrorMessage("모든 필드를 입력해 주세요.");
      return;
    }

    if (userPasswd !== confirmPassword) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 유효성 검사 통과 후 에러 메시지 초기화
    setErrorMessage("");

    // 회원가입 API 호출
    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/user/sign-up",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            userPasswd: userPasswd,
            name: name,
            email: email,
            phoneNum: phoneNum,
            birthDate: birthDate, // "yyyy-MM-dd" 형식의 문자열이 그대로 전송됨
            gender: gender,
            identifyNum: `${identifyNumFront}-${identifyNumBack}`,
            carrier: carrier,
          }),
        }
      );

      console.log(`응답 상태 코드: ${response.status}`);
      console.log(`응답 상태 텍스트: ${response.statusText}`);

      if (!response.ok) {
        throw new Error("회원가입에 실패했습니다.");
      }

      // 회원가입이 성공적으로 완료되었을 때 /login 페이지로 리디렉션
      navigate("/login");
    } catch (error) {
      console.error("회원가입 에러:", error);
      setErrorMessage("회원가입에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <div className="signup-container">
      <h2>회원가입</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <label htmlFor="userId">아이디:</label>
          <input
            type="text"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="아이디를 입력하세요"
          />
        </div>
        <div className="form-group">
          <label htmlFor="userPasswd">비밀번호:</label>
          <input
            type="password"
            id="userPasswd"
            value={userPasswd}
            onChange={(e) => setUserPasswd(e.target.value)}
            placeholder="비밀번호를 입력하세요"
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">비밀번호 확인:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="비밀번호를 다시 입력하세요"
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">이름:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름을 입력하세요"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">이메일:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일을 입력하세요"
          />
        </div>

        <div className="form-group">
          <label htmlFor="birthDate">생년월일:</label>
          <input
            type="date"
            id="birthDate"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">성별:</label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">선택하세요</option>
            <option value="male">남성</option>
            <option value="female">여성</option>
            {/* <option value="other">기타</option> */}
          </select>
        </div>
        <div className="form-group ssn-group">
          <label htmlFor="identifyNumFront">주민등록번호:</label>
          <div className="ssn-inputs">
            <input
              type="text"
              id="identifyNumFront"
              value={identifyNumFront}
              onChange={(e) => setIdentifyNumFront(e.target.value)}
              placeholder="앞자리 6자리"
              maxLength="6"
            />
            <span>-</span>
            <input
              type="password"
              id="identifyNumBack"
              value={identifyNumBack}
              onChange={(e) => setIdentifyNumBack(e.target.value)}
              placeholder="뒷자리 7자리"
              maxLength="7"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="phoneNum">전화번호:</label>
          <input
            type="text"
            id="phoneNum"
            value={phoneNum}
            onChange={handlePhoneNumChange}
            placeholder="전화번호를 입력하세요"
          />
        </div>

        <div className="form-group">
          <label htmlFor="carrier">통신사:</label>
          <select
            id="carrier"
            value={carrier}
            onChange={(e) => setCarrier(e.target.value)}
          >
            <option value="">통신사를 선택해주세요</option>
            <option value="SKT">SKT</option>
            <option value="KT">KT</option>
            <option value="LGT">LG U+</option>
            <option value="SKM">알뜰폰 SKT</option>
            <option value="KTM">알뜰폰 KT</option>
            <option value="LGM">알뜰폰 LG U+</option>
          </select>
        </div>
        <button type="submit" className="signup-button">
          회원가입
        </button>
      </form>
    </div>
  );
}

export default SignUp;
