package com.kopo.hanabirdie.domain.business.mapper;

import com.kopo.hanabirdie.domain.business.dto.*;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface BusinessMapper {
    List<BusinessStatisticsResponse> getStatistics(BusinessStatisticsRequest dto);
    void registerCost(List<RegisterCostRequest> dto);
    List<DateTransactionHistoryResponse> getDateTransactionHistory(DateTransactionHistoryRequest dto);
    void deleteTransaction(TransactionDeleteRequest dto);
    void editTransaction(@Param("transactions") List<EditCostRequest> request);
    List<DailyTransactionResponse> getDailyTransaction(DailyTransactionRequest dto);
    List<PastTransactionResponse> getPastTransaction(PastTransactionRequest dto);
}
