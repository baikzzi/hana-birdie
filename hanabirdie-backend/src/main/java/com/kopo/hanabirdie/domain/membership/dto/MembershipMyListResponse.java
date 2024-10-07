package com.kopo.hanabirdie.domain.membership.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MembershipMyListResponse {
    private int golfCourseId;
    private int membershipId;
    private String golfCourseName;
    private Date firstContractDate;
    private Date lastContractDate;
    private Date expirationDate;

    public static MembershipMyListResponse of(int golfCourseId, int membershipId, String golfCourseName, Date firstContractDate, Date lastContractDate, Date expirationDate) {
        return MembershipMyListResponse.builder()
                .golfCourseId(golfCourseId)
                .membershipId(membershipId)
                .golfCourseName(golfCourseName)
                .firstContractDate(firstContractDate)
                .lastContractDate(lastContractDate)
                .expirationDate(expirationDate)
                .build();
    }
}
