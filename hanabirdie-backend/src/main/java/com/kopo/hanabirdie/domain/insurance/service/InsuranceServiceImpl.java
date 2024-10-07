package com.kopo.hanabirdie.domain.insurance.service;

import com.kopo.hanabirdie.domain.insurance.dto.*;
import com.kopo.hanabirdie.domain.insurance.mapper.InsuranceMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class InsuranceServiceImpl implements InsuranceService {
    private final InsuranceMapper insuranceMapper;

    @Override
    public List<InsuranceListResponse> getInsuranceList() {
        return insuranceMapper.getInsuranceList();
    }

    @Override
    public InsuranceDetailResponse getInsuranceDetail(InsuranceDetailRequest dto) {
        return insuranceMapper.getInsuranceDetail(dto);
    }

    @Override
    public List<InsuranceMyListResponse> getInsuranceMyList(InsuranceMyListRequest dto) {
        return insuranceMapper.getInsuranceMyList(dto);
    }

    @Override
    public void subscribeInsurance(InsuranceSubscribeRequest dto) {
        insuranceMapper.subscribeInsurance(dto);
    }
}
