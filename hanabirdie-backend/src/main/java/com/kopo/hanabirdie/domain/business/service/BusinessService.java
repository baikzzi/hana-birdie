package com.kopo.hanabirdie.domain.business.service;


import com.kopo.hanabirdie.domain.business.dto.*;

import java.util.List;

public interface BusinessService {
    List<BusinessStatisticsResponse> getStatistics(BusinessStatisticsRequest dto);
    void registerCost(List<RegisterCostRequest> dto);
    List<DateTransactionHistoryResponse> getDateTransactionHistory(DateTransactionHistoryRequest dto);
    void deleteTransaction(TransactionDeleteRequest dto);
    void editTransaction(List<EditCostRequest> request);
    List<DailyTransactionResponse> getDailyTransaction(DailyTransactionRequest dto);
    List<PastTransactionResponse> getPastTransaction(PastTransactionRequest dto);
}
