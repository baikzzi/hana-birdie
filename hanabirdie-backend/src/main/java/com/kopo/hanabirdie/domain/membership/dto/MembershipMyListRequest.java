package com.kopo.hanabirdie.domain.membership.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MembershipMyListRequest {
    private String userId;
}
