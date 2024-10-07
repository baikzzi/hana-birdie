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
public class ReservationAvailableDateResponse {
    private Date reservationDate;
    private int availableSlots;

    public static ReservationAvailableDateResponse of(Date reservationDate, int availableSlots) {
        return ReservationAvailableDateResponse.builder()
                .reservationDate(reservationDate)
                .availableSlots(availableSlots)
                .build();
    }
}
