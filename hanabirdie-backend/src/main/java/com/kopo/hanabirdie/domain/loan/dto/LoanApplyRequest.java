package com.kopo.hanabirdie.domain.loan.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LoanApplyRequest {
//    private int golfCourseId;
    private String userId;
    private String loanProductId;
    private int loanAmount;
    private int loanTerm;
    private int interestDueDate;
    private String loanRepaymentMethod;
    private String loanAccountNumber;
    private double interestRate;
}