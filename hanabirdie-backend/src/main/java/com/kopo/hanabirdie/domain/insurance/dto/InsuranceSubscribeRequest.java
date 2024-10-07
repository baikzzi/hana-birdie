package com.kopo.hanabirdie.domain.insurance.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class InsuranceSubscribeRequest {
    private String userId;
    private String insuranceId;
    private int price;
    private LocalDateTime startDate;
    private LocalDateTime expireDate;
}
