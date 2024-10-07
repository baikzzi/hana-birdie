package com.kopo.hanabirdie.domain.reservation.service;


import com.kopo.hanabirdie.domain.reservation.dto.*;

import java.util.List;

public interface ReservationService {
    ReservationInfoResponse getInfo(ReservationInfoRequest dto);
    List<ReservationAvailableDateResponse> getAvailableDate(ReservationAvailableDateRequest dto);
    List<ReservationAvailableTimeResponse> getAvailableTime(ReservationAvailableTimeRequest dto);
    void createReservation(ReservationCreateRequest dto);
    List<ReservationStatusResponse> getReservationStatus(ReservationStatusRequest dto);
    void cancelReservation(ReservationCancelRequest dto);
}
