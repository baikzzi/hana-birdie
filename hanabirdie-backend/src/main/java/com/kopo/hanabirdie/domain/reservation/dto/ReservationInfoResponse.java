package com.kopo.hanabirdie.domain.reservation.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReservationInfoResponse {
    private String golfCourseId;
    private String membershipId;
    private String golfCourseName;
    private int holeCount;
    private int weekdayMember;
    private int weekendMember;
    private int caddyFeeNum;
    private int cartFeeNum;
    private String location;
    private String locationEng;
    private String nightRound;

    public static ReservationInfoResponse of(String golfCourseId, String membershipId, String golfCourseName, int holeCount, int weekdayMember, int weekendMember, int caddyFeeNum, String location, String locationEng, String nightRound) {
        return ReservationInfoResponse.builder()
                .golfCourseId(golfCourseId)
                .membershipId(membershipId)
                .golfCourseName(golfCourseName)
                .holeCount(holeCount)
                .weekdayMember(weekdayMember)
                .weekendMember(weekendMember)
                .caddyFeeNum(caddyFeeNum)
                .location(location)
                .locationEng(locationEng)
                .nightRound(nightRound)
                .build();
    }
}