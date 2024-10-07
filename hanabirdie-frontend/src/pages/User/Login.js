import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../../assets/css/User/Login.css";

function Login() {
  const [userId, setUserId] = useState("");
  const [userPasswd, setUserPasswd] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth(); // 로그인 함수 가져오기

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId || !userPasswd) {
      setErrorMessage("아이디와 비밀번호를 입력해 주세요.");
      return;
    }

    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:8080/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          userPasswd: userPasswd,
        }),
      });

      if (!response.ok) {
        throw new Error("로그인에 실패했습니다.");
      }

      const data = await response.json();
      // console.log("로그인 성공: ", data);

      // 로그인 성공 시 상태를 업데이트하고 사용자 정보를 저장
      login(data); // data는 서버에서 반환된 사용자 정보

      navigate("/");
    } catch (error) {
      // console.error("로그인 에러: ", error);
      setErrorMessage("로그인에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <div className="login-container">
      <h2>로그인</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="login-form">
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
        <div className="button-group">
          <button type="submit" className="login-button">
            로그인
          </button>
          <Link to="/signUp">
            <button type="button" className="signup-button">
              회원가입
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
