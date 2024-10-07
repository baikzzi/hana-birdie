package com.kopo.hanabirdie.domain.insurance.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class InsuranceMyListRequest {
    private String userId;
}
