package com.kopo.hanabirdie.domain.user.service;

import com.kopo.hanabirdie.domain.user.dto.*;
import com.kopo.hanabirdie.domain.user.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private final UserMapper userMapper;

    @Override
    public UserLoginResponse login(UserLoginRequest dto) {
        UserLoginResponse user = userMapper.login(dto.getUserId(), dto.getUserPasswd());
        return UserLoginResponse.of(user.getUserId(), user.getUserRole(), user.getName(), user.getPhoneNum(), user.getEmail(), user.getUserStatus());
    }

@Override
public void signUp(UserSignUpRequest dto) {
    userMapper.signUp(dto.getUserId(), dto.getUserPasswd(), dto.getName(),
            dto.getPhoneNum(), dto.getEmail(),
            dto.getBirthDate(), dto.getGender(),
            dto.getIdentifyNum(), dto.getCarrier());
}
}