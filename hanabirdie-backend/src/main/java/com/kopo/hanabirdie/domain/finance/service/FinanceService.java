package com.kopo.hanabirdie.domain.finance.service;


import com.kopo.hanabirdie.domain.finance.dto.*;

import java.util.List;

public interface FinanceService {
    void uploadFinanceStatement(List<UploadFinanceStatementRequest> dto);
    List<LoadFinanceStatementResponse> loadFinanceStatement(LoadFinanceStatementRequest dto);
    FinanceAnalysisResponse financeAnalysis(FinanceAnalysisRequest dto);

}
