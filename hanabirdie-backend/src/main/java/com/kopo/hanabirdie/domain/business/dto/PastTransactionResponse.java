package com.kopo.hanabirdie.domain.business.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PastTransactionResponse {
    private String transactionDate;
//    private String month;
    private String transactionType;
    private String transactionCategory;
    private String description;
    private Long amount;


    public static PastTransactionResponse of(
            String transactionDate,
//            String month,
            String transactionType, String transactionCategory, String description, Long amount) {
        return PastTransactionResponse.builder()
                .transactionDate(transactionDate)
//                .month(month)
                .transactionType(transactionType)
                .transactionCategory(transactionCategory)
                .description(description)
                .amount(amount)
                .build();
    }
}
