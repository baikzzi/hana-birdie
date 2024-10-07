package com.kopo.hanabirdie.domain.reservation.service;

import com.kopo.hanabirdie.domain.reservation.dto.*;
import com.kopo.hanabirdie.domain.reservation.mapper.ReservationMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ReservationServiceImpl implements ReservationService {
    private final ReservationMapper reservationMapper;

    @Override
    public ReservationInfoResponse getInfo(ReservationInfoRequest dto) {
        return reservationMapper.getInfo(dto);
    }

    @Override
    public List<ReservationAvailableDateResponse> getAvailableDate(ReservationAvailableDateRequest dto) {
        return reservationMapper.getAvailableDate(dto);
    }

    @Override
    public List<ReservationAvailableTimeResponse> getAvailableTime(ReservationAvailableTimeRequest dto) {
        return reservationMapper.getAvailableTime(dto);
    }

    @Override
    public void createReservation(ReservationCreateRequest dto) {
        reservationMapper.createReservation(dto);
    }

    @Override
    public List<ReservationStatusResponse> getReservationStatus(ReservationStatusRequest dto) {
        return reservationMapper.getReservationStatus(dto);
    }

    @Override
    public void cancelReservation(ReservationCancelRequest dto) {
        reservationMapper.cancelReservation(dto);
    }
}
