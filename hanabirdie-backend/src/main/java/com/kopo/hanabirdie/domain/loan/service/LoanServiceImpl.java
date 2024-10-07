package com.kopo.hanabirdie.domain.loan.service;

//import com.kopo.hanagolf.domain.loan.dto.*;
import com.kopo.hanabirdie.domain.loan.dto.LoanApplyRequest;
import com.kopo.hanabirdie.domain.loan.dto.LookupLoanRequest;
import com.kopo.hanabirdie.domain.loan.dto.LookupLoanResponse;
import com.kopo.hanabirdie.domain.loan.mapper.LoanMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class LoanServiceImpl implements LoanService {
    private final LoanMapper loanMapper;

    @Override
    public void applyLoan(LoanApplyRequest dto) {
        loanMapper.applyLoan(dto);
    }

    @Override
    public List<LookupLoanResponse> lookupLoan(LookupLoanRequest dto) {
        return loanMapper.lookupLoan(dto);
    }
}
