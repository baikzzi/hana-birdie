package com.kopo.hanabirdie.domain.reservation.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReservationStatusResponse {
    private String reservationNum;
    private String golfCourseId;
    private String membershipId;
    private String golfCourseName;
    private Date createdDateTime;
    private Date reservationDate;
    private String teeOffTime;
    private String reservationType;
    private String teeTime;
    private String courseType;
    private String caddyYn;
    private String cartYn;
    private String status;
    private String dailyInsuranceYn;

    public static ReservationStatusResponse of(String golfCourseId, String membershipId, String golfCourseName, Date createdDateTime, Date reservationDate, String teeOffTime, String reservationType, String teeTime, String courseType,
                                               String caddyYn, String cartYn, String status, String dailyInsuranceYn) {
        return ReservationStatusResponse.builder()
                .golfCourseId(golfCourseId)
                .membershipId(membershipId)
                .golfCourseName(golfCourseName)
                .createdDateTime(createdDateTime)
                .reservationDate(reservationDate)
                .teeOffTime(teeOffTime)
                .reservationType(reservationType)
                .teeTime(teeTime)
                .courseType(courseType)
                .caddyYn(caddyYn)
                .cartYn(cartYn)
                .status(status)
                .dailyInsuranceYn(dailyInsuranceYn)
                .build();
    }
}