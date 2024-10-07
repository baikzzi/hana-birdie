package com.kopo.hanabirdie.domain.user.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User {
    private String userId;
    private String userPasswd;
    private String userRole;
    private String name;
    private String email;
    private String phoneNum;
    private String userStatus;
}