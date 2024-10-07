package com.kopo.hanabirdie.domain.reservation.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReservationAvailableTimeResponse {
    private String teeOffTime; // 몇시티오프
    private String teeTime; // 몇부
    private String courseType; // 무슨코스
    private String reservationType; // 개인 혹은 단체


    public static ReservationAvailableTimeResponse of(String teeOffTime, String teeTime, String courseType, String reservationType) {
        return ReservationAvailableTimeResponse.builder()
                .teeOffTime(teeOffTime)
                .teeTime(teeTime)
                .courseType(courseType)
                .reservationType(reservationType)
                .build();
    }
}
