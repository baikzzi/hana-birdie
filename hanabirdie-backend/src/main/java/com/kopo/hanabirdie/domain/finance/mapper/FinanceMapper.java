package com.kopo.hanabirdie.domain.finance.mapper;

import com.kopo.hanabirdie.domain.finance.dto.*;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface FinanceMapper {
    void uploadFinanceStatement(List<UploadFinanceStatementRequest> dto);
    List<LoadFinanceStatementResponse> loadFinanceStatement(LoadFinanceStatementRequest dto);
    FinanceAnalysisResponse financeAnalysis(FinanceAnalysisRequest dto);
}
