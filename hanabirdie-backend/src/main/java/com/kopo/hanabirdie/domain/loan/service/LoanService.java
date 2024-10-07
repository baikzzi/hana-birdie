package com.kopo.hanabirdie.domain.loan.service;

import com.kopo.hanabirdie.domain.loan.dto.*;

import java.util.List;

public interface LoanService {
    void applyLoan(LoanApplyRequest dto);
    List<LookupLoanResponse> lookupLoan(LookupLoanRequest dto);
}
