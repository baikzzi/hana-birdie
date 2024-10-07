package com.kopo.hanabirdie.domain.loan.controller;

//import com.kopo.hanagolf.domain.loan.dto.*;
import com.kopo.hanabirdie.domain.loan.dto.LoanApplyRequest;
import com.kopo.hanabirdie.domain.loan.dto.LookupLoanRequest;
import com.kopo.hanabirdie.domain.loan.dto.LookupLoanResponse;
import com.kopo.hanabirdie.domain.loan.service.LoanService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Tag(name = "Loan")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/loan")
public class LoanController {

    private final LoanService loanService;

    @PostMapping("/apply")
    public ResponseEntity<Void> applyLoan(@RequestBody LoanApplyRequest dto) {
        loanService.applyLoan(dto);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/lookup")
    public ResponseEntity<List<LookupLoanResponse>> lookupLoan(@RequestBody LookupLoanRequest dto) {
        return ResponseEntity.ok(loanService.lookupLoan(dto));
    }


}
