package com.kopo.hanabirdie.domain.user.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class UserSignUpRequest {
    @NotBlank(message = "아이디를 입력해주세요.")
    private String userId;

    @NotBlank(message = "패스워드를 입력해주세요.")
    private String userPasswd;

    @NotBlank(message = "이름을 입력해주세요.")
    private String name;

    @NotBlank(message = "이메일을 입력해주세요.")
    private String email;

    @NotBlank(message = "휴대폰 번호를 입력해주세요.")
    private String phoneNum;

    @NotNull(message = "생년월일을 입력해주세요.")
    private java.sql.Date birthDate;

    @NotBlank(message = "성별을 선택해주세요.")
    private String gender;

    @NotBlank(message = "주민등록번호를 입력해주세요.")
    private String identifyNum;

    @NotBlank(message = "통신사를 선택해주세요.")
    private String carrier;
}