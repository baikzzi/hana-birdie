package com.kopo.hanabirdie.domain.membership.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MembershipListResponse {
    private int golfCourseId;
    private int membershipId;
    private String golfCourseName;
    private String address;
    private int price;

    public static MembershipListResponse of(int golfCourseId, int membershipId, String golfCourseName, String address, int price) {
        return MembershipListResponse.builder()
                .golfCourseId(golfCourseId)
                .membershipId(membershipId)
                .golfCourseName(golfCourseName)
                .address(address)
                .price(price)
                .build();
    }
}
