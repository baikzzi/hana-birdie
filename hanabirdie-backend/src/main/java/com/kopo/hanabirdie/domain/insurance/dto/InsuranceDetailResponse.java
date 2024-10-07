package com.kopo.hanabirdie.domain.insurance.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class InsuranceDetailResponse {
    private String insuranceId;
    private String insuranceName;
    private Date createdDate;
    private int price;
    private String coverage;
    private String tag;

    public static InsuranceDetailResponse of(String insuranceId, String insuranceName, Date createdDate, int price, String coverage, String tag) {
        return InsuranceDetailResponse.builder()
                .insuranceId(insuranceId)
                .insuranceName(insuranceName)
                .createdDate(createdDate)
                .price(price)
                .coverage(coverage)
                .tag(tag)
                .build();
    }
}
