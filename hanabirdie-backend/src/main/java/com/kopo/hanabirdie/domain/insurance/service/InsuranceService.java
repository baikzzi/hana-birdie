package com.kopo.hanabirdie.domain.insurance.service;


import com.kopo.hanabirdie.domain.insurance.dto.*;

import java.util.List;

public interface InsuranceService {
    List<InsuranceListResponse> getInsuranceList();
    InsuranceDetailResponse getInsuranceDetail(InsuranceDetailRequest dto);
    List<InsuranceMyListResponse> getInsuranceMyList(InsuranceMyListRequest dto);
    void subscribeInsurance(InsuranceSubscribeRequest dto);
}
