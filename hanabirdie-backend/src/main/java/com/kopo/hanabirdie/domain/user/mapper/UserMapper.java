package com.kopo.hanabirdie.domain.user.mapper;

import com.kopo.hanabirdie.domain.user.dto.UserLoginResponse;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.sql.Date;

@Mapper
public interface UserMapper {
    UserLoginResponse login(@Param("userId") String userId, @Param("userPasswd") String userPasswd);

void signUp(@Param("userId") String userId, @Param("userPasswd") String userPasswd,
            @Param("name") String name,
            @Param("phoneNum") String phoneNum,
            @Param("email") String email,
            @Param("birthDate") Date birthDate,
            @Param("gender") String gender,
            @Param("identifyNum") String identifyNum,
            @Param("carrier") String carrier);


}

