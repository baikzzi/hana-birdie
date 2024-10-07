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
public class InsuranceMyListResponse {
    private String insuranceId;
    private Date applicationDate;
    private int price;
    private Date startDate;
    private Date expireDate;
    private String insuranceName;


    public static InsuranceMyListResponse of(String insuranceId, Date applicationDate, int price, Date startDate, Date expireDate, String insuranceName) {
        return InsuranceMyListResponse.builder()
                .insuranceId(insuranceId)
                .applicationDate(applicationDate)
                .price(price)
                .startDate(startDate)
                .expireDate(expireDate)
                .insuranceName(insuranceName)
                .build();
    }
}
