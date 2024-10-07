package com.kopo.hanabirdie.domain.user.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;

@Getter
public class UserLoginRequest {
    private String userId;

    @NotBlank(message = "패스워드를 입력해주세요.")
    @Size(min = 7, max = 20, message = "패스워드는 7글자 이상 20글자 이하여야 합니다.")
    private String userPasswd;
}