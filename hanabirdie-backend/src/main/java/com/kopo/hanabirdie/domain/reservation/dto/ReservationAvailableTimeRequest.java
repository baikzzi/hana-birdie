package com.kopo.hanabirdie.domain.reservation.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReservationAvailableTimeRequest {
    private String golfCourseId; // 어느 골프장에
    private String reservationDate; // 몇일에 예약할건데
}
