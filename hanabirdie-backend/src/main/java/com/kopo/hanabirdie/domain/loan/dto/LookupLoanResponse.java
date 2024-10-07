package com.kopo.hanabirdie.domain.loan.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LookupLoanResponse {
    private String loanId;
    private String userId;
    private String loanProductId;
    private String loanName;
    private int loanAmount;
    private int loanTerm;
    private int interestDueDate;
    private String loanRepaymentMethod;
    private String loanAccountNumber;
    private double interestRate;
    private Date loanStartDate;
    private Date loanExpireDate;
    private int loanRepaymentDate;
    private Date loanApplicationDate;
    private String loanStatus;


    public static LookupLoanResponse of(String loanId, String userId, String loanProductId, String loanName, int loanAmount, int loanTerm, int interestDueDate,
                                        String loanRepaymentMethod, String loanAccountNumber, double interestRate, Date loanStartDate, Date loanExpireDate,
                                        int loanRepaymentDate, Date loanApplicationDate, String loanStatus) {
        return LookupLoanResponse.builder()
                .loanId(loanId)
                .userId(userId)
                .loanProductId(loanProductId)
                .loanName(loanName)
                .loanAmount(loanAmount)
                .loanTerm(loanTerm)
                .interestDueDate(interestDueDate)
                .loanRepaymentMethod(loanRepaymentMethod)
                .loanAccountNumber(loanAccountNumber)
                .interestRate(interestRate)
                .loanStartDate(loanStartDate)
                .loanExpireDate(loanExpireDate)
                .loanRepaymentDate(loanRepaymentDate)
                .loanApplicationDate(loanApplicationDate)
                .loanStatus(loanStatus)
                .build();
    }
}
