package com.kopo.hanabirdie.domain.insurance.controller;

import com.kopo.hanabirdie.domain.insurance.dto.*;
import com.kopo.hanabirdie.domain.insurance.service.InsuranceService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Tag(name = "Insurance")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/insurance")
public class InsuranceController {

    private final InsuranceService insuranceService;

    @PostMapping("/list")
    public ResponseEntity<List<InsuranceListResponse>> getInsuranceList() {
        return ResponseEntity.ok(insuranceService.getInsuranceList());
    }

    @PostMapping("/detail")
    public ResponseEntity<InsuranceDetailResponse> getInsuranceDetail(@RequestBody InsuranceDetailRequest dto) {
        return ResponseEntity.ok(insuranceService.getInsuranceDetail(dto));
    }

    @PostMapping("/subscribe")
    public ResponseEntity<Void> subscribeInsurance(@RequestBody InsuranceSubscribeRequest dto) {
        insuranceService.subscribeInsurance(dto);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/myList")
    public ResponseEntity<List<InsuranceMyListResponse>> getInsuranceMyList(@RequestBody InsuranceMyListRequest dto) {
        return ResponseEntity.ok(insuranceService.getInsuranceMyList(dto));
    }

}
