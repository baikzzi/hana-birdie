package com.kopo.hanabirdie.domain.insurance.mapper;

import com.kopo.hanabirdie.domain.insurance.dto.*;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface InsuranceMapper {
    List<InsuranceListResponse> getInsuranceList();
    InsuranceDetailResponse getInsuranceDetail(InsuranceDetailRequest dto);
    List<InsuranceMyListResponse> getInsuranceMyList(InsuranceMyListRequest dto);
    void subscribeInsurance(InsuranceSubscribeRequest dto);
}
