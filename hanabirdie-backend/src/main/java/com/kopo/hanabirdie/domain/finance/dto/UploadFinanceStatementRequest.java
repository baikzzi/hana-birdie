package com.kopo.hanabirdie.domain.finance.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UploadFinanceStatementRequest {
    private int golfCourseId;
    private int reportYear;
    private int thstrmNum;
    private int rowCnt;
    private String accountNm;
    private String thstrmLeft;
    private String thstrmRight;
    private String frmtrmLeft;
    private String frmtrmRight;
}
