package com.kopo.hanabirdie.domain.finance.service;

import com.kopo.hanabirdie.domain.finance.dto.*;
import com.kopo.hanabirdie.domain.finance.mapper.FinanceMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class FinanceServiceImpl implements FinanceService {
    private final FinanceMapper financeMapper;

    @Override
    public void uploadFinanceStatement(List<UploadFinanceStatementRequest> dto) {
        financeMapper.uploadFinanceStatement(dto);
    }

    @Override
    public List<LoadFinanceStatementResponse> loadFinanceStatement(LoadFinanceStatementRequest dto) {
        return financeMapper.loadFinanceStatement(dto);
    }

    @Override
    public FinanceAnalysisResponse financeAnalysis(FinanceAnalysisRequest dto) {
        return financeMapper.financeAnalysis(dto);
    }
}
