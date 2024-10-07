package com.kopo.hanabirdie.domain.finance.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FinanceAnalysisResponse {
    // 자산
    private Long thstrmCurrentAssets; // 당기 유동자산
    private Long frmtrmCurrentAssets; // 전기 유동자산
    private Long thstrmNonCurrentAssets; // 당기 비유동자산
    private Long frmtrmNonCurrentAssets; // 전기 비유동자산
    // 부채
    private Long thstrmCurrentLiabilities;// 당기 유동부채
    private Long frmtrmCurrentLiabilities; // 전기 유동부채
    private Long thstrmNonCurrentLiabilities; // 당기 비유동부채
    private Long frmtrmNonCurrentLiabilities; // 전기 비유동부채
    // 총계
    private Long thstrmTotalAssets; // 당기 자산총계
    private Long frmtrmTotalAssets; // 전기 자산총계
    private Long thstrmTotalLiabilities; // 당기 부채총계
    private Long frmtrmTotalLiabilities; // 전기 부채총계
    // 손익계산서
    private Long thstrmNetIncome; //당기 순이익
    private Long frmtrmNetIncome; // 전기 순이익
    private Long thstrmTotalSales; // 당기 총매출액
    private Long frmtrmTotalSales; // 전기 총매출액
    private Long thstrmCostOfSales; // 당기 매출원가
    private Long frmtrmCostOfSales; // 전기 매출원가

    public static FinanceAnalysisResponse of(Long thstrmCurrentAssets, Long frmtrmCurrentAssets, Long thstrmNonCurrentAssets, Long frmtrmNonCurrentAssets, Long thstrmCurrentLiabilities, Long frmtrmCurrentLiabilities,
                                             Long thstrmNonCurrentLiabilities, Long frmtrmNonCurrentLiabilities, Long thstrmTotalAssets, Long frmtrmTotalAssets, Long thstrmTotalLiabilities, Long frmtrmTotalLiabilities,
                                             Long thstrmNetIncome, Long frmtrmNetIncome, Long thstrmTotalSales, Long frmtrmTotalSales, Long thstrmCostOfSales, Long frmtrmCostOfSales) {
        return FinanceAnalysisResponse.builder()
                .thstrmCurrentAssets(thstrmCurrentAssets)
                .frmtrmCurrentAssets(frmtrmCurrentAssets)
                .thstrmNonCurrentAssets(thstrmNonCurrentAssets)
                .frmtrmNonCurrentAssets(frmtrmNonCurrentAssets)
                .thstrmCurrentLiabilities(thstrmCurrentLiabilities)
                .frmtrmCurrentLiabilities(frmtrmCurrentLiabilities)
                .thstrmNonCurrentLiabilities(thstrmNonCurrentLiabilities)
                .frmtrmNonCurrentLiabilities(frmtrmNonCurrentLiabilities)
                .thstrmTotalAssets(thstrmTotalAssets)
                .frmtrmTotalAssets(frmtrmTotalAssets)
                .thstrmTotalLiabilities(thstrmTotalLiabilities)
                .frmtrmTotalLiabilities(frmtrmTotalLiabilities)
                .thstrmNetIncome(thstrmNetIncome)
                .frmtrmNetIncome(frmtrmNetIncome)
                .thstrmTotalSales(thstrmTotalSales)
                .frmtrmTotalSales(frmtrmTotalSales)
                .thstrmCostOfSales(thstrmCostOfSales)
                .frmtrmCostOfSales(frmtrmCostOfSales)
                .build();
    }
}
