package com.kopo.hanabirdie.domain.user.controller;

import com.kopo.hanabirdie.domain.user.dto.*;
import com.kopo.hanabirdie.domain.user.service.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;


@Tag(name = "User")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    private final UserService userService;
    @PostMapping("/login")
    public ResponseEntity<UserLoginResponse> login(@Valid @RequestBody UserLoginRequest dto) {
        return ResponseEntity.ok(userService.login(dto));
    }

    @PostMapping("/sign-up")
    public ResponseEntity<Map<String, String>> signUp(@Valid @RequestBody UserSignUpRequest dto) {
        userService.signUp(dto);
        Map<String, String> response = new HashMap<>();
        response.put("message", "회원가입 성공");
        return ResponseEntity.ok(response);
    }

}