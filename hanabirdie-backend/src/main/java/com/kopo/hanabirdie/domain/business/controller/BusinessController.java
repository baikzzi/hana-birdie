package com.kopo.hanabirdie.domain.business.controller;

import com.kopo.hanabirdie.domain.business.dto.*;
import com.kopo.hanabirdie.domain.business.service.BusinessService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Tag(name = "Business")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/business")
public class BusinessController {

    private final BusinessService businessService;

    @PostMapping("/statistics")
    public ResponseEntity<List<BusinessStatisticsResponse>> getInsuranceList(@RequestBody BusinessStatisticsRequest dto) {
        return ResponseEntity.ok(businessService.getStatistics(dto));
    }

    @PostMapping("/registerCost")
    public ResponseEntity<Void> registerCost(@RequestBody List<RegisterCostRequest> dto) {
        businessService.registerCost(dto);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/dateHistory")
    public ResponseEntity<List<DateTransactionHistoryResponse>> getDateTransactionHistory(@RequestBody DateTransactionHistoryRequest dto) {
        return ResponseEntity.ok(businessService.getDateTransactionHistory(dto));
    }

    @PostMapping("/deleteTransaction")
    public ResponseEntity<Void> deleteTransaction(@RequestBody TransactionDeleteRequest dto) {
        businessService.deleteTransaction(dto);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/editTransaction")
    public ResponseEntity<Void> editTransaction(@RequestBody List<EditCostRequest> dto) {
        businessService.editTransaction(dto);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/fetchPastTransaction")
    public ResponseEntity<List<PastTransactionResponse>> getPastTransaction(@RequestBody PastTransactionRequest dto) {
        return ResponseEntity.ok(businessService.getPastTransaction(dto));
    }

    @PostMapping("/fetchDailyTransaction")
    public ResponseEntity<List<DailyTransactionResponse>> getDailyTransaction(@RequestBody DailyTransactionRequest dto) {
        return ResponseEntity.ok(businessService.getDailyTransaction(dto));
    }

}
