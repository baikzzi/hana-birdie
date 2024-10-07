import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../assets/css/User/MyPage.css";

const MyPage = () => {
  const navigate = useNavigate();
  const [checkType, setCheckType] = useState("myPlan");
  const [userInfo, setUserInfo] = useState({
    userId: "",
    name: "",
    email: "",
    phoneNum: "",
    profileImg: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/v1/auth/principal",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user info.");
        }

        const data = await response.json();
        setUserInfo({
          userId: data.userId,
          name: data.name,
          email: data.email,
          phoneNum: data.phoneNum,
          profileImg: data.postsImgUrl,
        });
        setIsLoading(false);
      } catch (error) {
        console.error(error.message);
        setIsLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const myPlanChangeHandler = (type) => {
    setCheckType(type);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <main className="main">
        <div className="imgContainer">
          <img className="imgStyle" src={userInfo.profileImg} alt="" />
        </div>
        <div>{userInfo.email || "이메일 로딩 중..."}</div>
        <div className="modifyButtons">
          <button className="modifyButton" onClick={() => navigate(`/modify`)}>
            수정하기
          </button>
          <button
            className="modifyButton"
            onClick={() => navigate(`/user/modify/password/${userInfo.userId}`)}
          >
            비밀번호 변경
          </button>
        </div>
      </main>
    </div>
  );
};

export default MyPage;
