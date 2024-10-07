package com.kopo.hanabirdie.domain.business.service;

import com.kopo.hanabirdie.domain.business.dto.*;
import com.kopo.hanabirdie.domain.business.mapper.BusinessMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
public class BusinessServiceImpl implements BusinessService {
    private final BusinessMapper businessMapper;

    @Override
    public List<BusinessStatisticsResponse> getStatistics(BusinessStatisticsRequest dto) {
        return businessMapper.getStatistics(dto);
    }

    @Override
    @Transactional
    public void registerCost(List<RegisterCostRequest> dto) {
        businessMapper.registerCost(dto);
    }

    @Override
    public List<DateTransactionHistoryResponse> getDateTransactionHistory(DateTransactionHistoryRequest dto) {
        return businessMapper.getDateTransactionHistory(dto);
    }

    @Override
    public void deleteTransaction(TransactionDeleteRequest dto) {
        businessMapper.deleteTransaction(dto);
    }

    @Override
    @Transactional
    public void editTransaction(List<EditCostRequest> dto) {
        businessMapper.editTransaction(dto);
    }

    @Override
    public List<DailyTransactionResponse> getDailyTransaction(DailyTransactionRequest dto) {
        return businessMapper.getDailyTransaction(dto);
    }

    @Override
    public List<PastTransactionResponse> getPastTransaction(PastTransactionRequest dto) {
        return businessMapper.getPastTransaction(dto);
    }
}
