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
public class ReservationCreateRequest {
    private String userId;
    private String golfCourseId;
    private Date reservationDate;
    private String teeOffTime;
    private String reservationType;
    private String teeTime;
    private String courseType;
    private String caddyYn;
    private String cartYn;
    private String dailyInsuranceYn;
}