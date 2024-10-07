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
public class DailyTransactionResponse {
    private Date transactionDate;
    private String transactionType;
    private String transactionCategory;
    private String description;
    private Long amount;


    public static DailyTransactionResponse of(Date transactionDate, String transactionType, String transactionCategory, String description, Long amount) {
        return DailyTransactionResponse.builder()
                .transactionDate(transactionDate)
                .transactionType(transactionType)
                .transactionCategory(transactionCategory)
                .description(description)
                .amount(amount)
                .build();
    }
}
