package com.kopo.hanabirdie.domain.finance.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LoadFinanceStatementResponse {
    private int reportYear;
    private int thstrmNum;
    private int rowCnt;
    private String accountNm;
    private String thstrmLeft;
    private String thstrmRight;
    private String frmtrmLeft;
    private String frmtrmRight;

    public static LoadFinanceStatementResponse of(int reportYear, int thstrmNum, int rowCnt, String accountNm, String thstrmLeft, String thstrmRight, String frmtrmLeft, String frmtrmRight) {
        return LoadFinanceStatementResponse.builder()
                .reportYear(reportYear)
                .thstrmNum(thstrmNum)
                .rowCnt(rowCnt)
                .accountNm(accountNm)
                .thstrmLeft(thstrmLeft)
                .thstrmRight(thstrmRight)
                .frmtrmLeft(frmtrmLeft)
                .frmtrmRight(frmtrmRight)
                .build();
    }
}
