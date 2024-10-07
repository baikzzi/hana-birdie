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
public class DateTransactionHistoryResponse {
    private String transactionId;
    private Date transactionDate;
    private String transactionType;
    private String transactionCategory;
    private String description;
    private Long amount;


    public static DateTransactionHistoryResponse of(String transactionId, Date transactionDate, String transactionType, String transactionCategory, String description, Long amount) {
        return DateTransactionHistoryResponse.builder()
                .transactionId(transactionId)
                .transactionDate(transactionDate)
                .transactionType(transactionType)
                .transactionCategory(transactionCategory)
                .description(description)
                .amount(amount)
                .build();
    }
}
