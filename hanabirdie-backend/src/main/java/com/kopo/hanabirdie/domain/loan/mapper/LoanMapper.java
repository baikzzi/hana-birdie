package com.kopo.hanabirdie.domain.loan.mapper;

import com.kopo.hanabirdie.domain.loan.dto.*;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface LoanMapper {
    void applyLoan(LoanApplyRequest dto);
    List<LookupLoanResponse> lookupLoan(LookupLoanRequest dto);
}
