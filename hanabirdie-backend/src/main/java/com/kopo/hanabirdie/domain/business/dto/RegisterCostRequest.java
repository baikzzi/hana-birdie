package com.kopo.hanabirdie.domain.business.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RegisterCostRequest {
    private int golfCourseId;
    private Date transactionDate;
    private String transactionType;
    private String transactionCategory;
    private String description;
    private Long amount;
}
