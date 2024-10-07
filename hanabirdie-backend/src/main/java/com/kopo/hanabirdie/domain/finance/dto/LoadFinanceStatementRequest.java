package com.kopo.hanabirdie.domain.finance.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LoadFinanceStatementRequest {
    private int golfCourseId;
}
