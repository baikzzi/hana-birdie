package com.kopo.hanabirdie.global.util;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;

@RequiredArgsConstructor
@Component
public class HttpUtil {

    private final RestTemplate restTemplate;

    // 기본 메서드: Content-Type 헤더만 설정
    public <T, R> List<R> makePostMethod(String url, T dto, Class<R[]> responseType) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");
        return makePostMethod(url, dto, responseType, headers);
    }

    // 오버로드된 메서드: 추가 헤더 설정 가능
    public <T, R> List<R> makePostMethod(String url, T dto, Class<R[]> responseType, HttpHeaders headers) {
        HttpEntity<T> requestEntity = new HttpEntity<>(dto, headers);

        ResponseEntity<R[]> responseEntity = restTemplate.exchange(
                url,
                HttpMethod.POST,
                requestEntity,
                responseType
        );

        R[] responseBody = responseEntity.getBody();
        return Arrays.asList(responseBody);
    }

    // 단일 객체 반환 메서드: 추가 헤더 설정 가능
    public <T, R> R makePostForSingleObject(String url, T dto, Class<R> responseType, HttpHeaders headers) {
        HttpEntity<T> requestEntity = new HttpEntity<>(dto, headers);

        ResponseEntity<R> responseEntity = restTemplate.exchange(
                url,
                HttpMethod.POST,
                requestEntity,
                responseType
        );

        return responseEntity.getBody();
    }
}