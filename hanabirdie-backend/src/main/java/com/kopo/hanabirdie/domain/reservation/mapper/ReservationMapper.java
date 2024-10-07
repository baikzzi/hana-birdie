package com.kopo.hanabirdie.domain.reservation.mapper;

import com.kopo.hanabirdie.domain.reservation.dto.*;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ReservationMapper {
    ReservationInfoResponse getInfo(ReservationInfoRequest dto);
    List<ReservationAvailableDateResponse> getAvailableDate(ReservationAvailableDateRequest dto);
    List<ReservationAvailableTimeResponse> getAvailableTime(ReservationAvailableTimeRequest dto);
    void createReservation(ReservationCreateRequest dto);
    List<ReservationStatusResponse> getReservationStatus(ReservationStatusRequest dto);
    void cancelReservation(ReservationCancelRequest dto);
}
