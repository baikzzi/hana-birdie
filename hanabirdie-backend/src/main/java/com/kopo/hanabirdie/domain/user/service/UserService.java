package com.kopo.hanabirdie.domain.user.service;

import com.kopo.hanabirdie.domain.user.dto.*;

public interface UserService {
    UserLoginResponse login(UserLoginRequest dto);
    void signUp(UserSignUpRequest dto);
}