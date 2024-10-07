import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../assets/css/User/ModifyForm.css";

const ModifyForm = () => {
  const [imgFiles, setImgFiles] = useState(null);
  const [preview, setPreview] = useState("");

  const [updateUser, setUpdateUser] = useState({
    userId: "", // userId는 수정 불가
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
        setUpdateUser({
          userId: data.userId, // userId를 설정
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

  const updateUserHandleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("userId", updateUser.userId); // userId는 API에서 받아온 그대로 전송
      formData.append("name", updateUser.name);
      formData.append("email", updateUser.email);
      formData.append("phoneNum", updateUser.phoneNum);
      formData.append("profileImg", imgFiles);

      const response = await axios.put(
        `http://localhost:8080/api/v1/user/${updateUser.userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (!response.status === 200) {
        throw new Error("Failed to update user info.");
      }

      alert("회원 정보가 수정되었습니다.");
    } catch (error) {
      console.error(error.message);
    }
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setUpdateUser({
      ...updateUser,
      [name]: value,
    });
  };

  const saveImgFileHandle = (e) => {
    setImgFiles(e.target.files[0]);
    const fileReader = new FileReader();
    fileReader.readAsDataURL(e.target.files[0]);
    fileReader.onload = (e) => {
      setPreview(e.target.result);
    };
  };

  if (isLoading) {
    return <div className="loading">로딩 중...</div>;
  }

  return (
    <div className="modify-form-container">
      <h1 className="modify-form-title">회원 정보 수정</h1>
      <div className="modify-form-group">
        <label className="modify-form-label">ID</label>
        <input
          className="modify-form-input"
          type="text"
          value={updateUser.userId}
          disabled
        />
      </div>
      <div className="modify-form-group">
        <label className="modify-form-label">이름</label>
        <input
          className="modify-form-input"
          type="text"
          name="name"
          value={updateUser.name}
          onChange={onChangeHandler}
        />
      </div>
      <div className="modify-form-group">
        <label className="modify-form-label">이메일</label>
        <input
          className="modify-form-input"
          type="email"
          name="email"
          value={updateUser.email}
          onChange={onChangeHandler}
        />
      </div>
      <div className="modify-form-group">
        <label className="modify-form-label">전화번호</label>
        <input
          className="modify-form-input"
          type="text"
          name="phoneNum"
          value={updateUser.phoneNum}
          onChange={onChangeHandler}
        />
      </div>
      <div className="modify-form-group">
        <label className="modify-form-label">프로필 사진</label>
        <input
          className="modify-form-input"
          type="file"
          onChange={saveImgFileHandle}
        />
        <img
          className="modify-form-img-preview"
          src={preview ? preview : updateUser.profileImg}
          alt="미리보기"
        />
      </div>
      <button className="modify-form-button" onClick={updateUserHandleSubmit}>
        수정하기
      </button>
    </div>
  );
};

export default ModifyForm;
