package com.kopo.hanabirdie.domain.business.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BusinessStatisticsResponse {
    private String month;
    private String transactionType;
    private Long amount;


    public static BusinessStatisticsResponse of(String month, String transactionType, Long amount) {
        return BusinessStatisticsResponse.builder()
                .month(month)
                .transactionType(transactionType)
                .amount(amount)
                .build();
    }
}
