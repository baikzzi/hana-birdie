package com.kopo.hanabirdie.domain.business.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BusinessStatisticsRequest {
    private String golfCourseId;
}
