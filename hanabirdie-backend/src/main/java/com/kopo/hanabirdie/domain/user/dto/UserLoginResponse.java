package com.kopo.hanabirdie.domain.user.dto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserLoginResponse {


    private String userId;
    private String userRole;
    private String name;
    private String email;
    private String phoneNum;
    private String userStatus;


    public static UserLoginResponse of(String userId, String userRole, String name, String email, String phoneNum, String userStatus) {
        return UserLoginResponse.builder()
                .userId(userId)
                .userRole(userRole)
                .name(name)
                .email(email)
                .phoneNum(phoneNum)
                .userStatus(userStatus)
                .build();
    }

}