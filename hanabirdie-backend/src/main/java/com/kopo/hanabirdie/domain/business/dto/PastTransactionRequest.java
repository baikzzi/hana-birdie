package com.kopo.hanabirdie.domain.business.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PastTransactionRequest {
    private String golfCourseId;
//    private Date startDate;
//    private Date endDate;
}
