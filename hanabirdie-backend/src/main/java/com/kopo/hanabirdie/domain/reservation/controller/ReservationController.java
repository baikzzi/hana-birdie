package com.kopo.hanabirdie.domain.reservation.controller;

import com.kopo.hanabirdie.domain.reservation.dto.*;
import com.kopo.hanabirdie.domain.reservation.service.ReservationService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Tag(name = "Reservation")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/reservation")
public class ReservationController {

    private final ReservationService reservationService;

    @PostMapping("/info")
    public ResponseEntity<ReservationInfoResponse> getInfo(@RequestBody ReservationInfoRequest dto) {
        return ResponseEntity.ok(reservationService.getInfo(dto));
    }
    @PostMapping("/available-date")
    public ResponseEntity<List<ReservationAvailableDateResponse>> getAvailableDate(@RequestBody ReservationAvailableDateRequest dto) {
        return ResponseEntity.ok(reservationService.getAvailableDate(dto));
    }

    @PostMapping("/available-time")
    public ResponseEntity<List<ReservationAvailableTimeResponse>> getAvailableTime(@RequestBody ReservationAvailableTimeRequest dto) {
        return ResponseEntity.ok(reservationService.getAvailableTime(dto));
    }

    @PostMapping("/create")
    public ResponseEntity<Void> createReservation(@RequestBody ReservationCreateRequest dto) {
        reservationService.createReservation(dto);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/status")
    public ResponseEntity<List<ReservationStatusResponse>> getReservationStatus(@RequestBody ReservationStatusRequest dto) {
        return ResponseEntity.ok(reservationService.getReservationStatus(dto));
    }

    @PostMapping("/cancel")
    public ResponseEntity<Void> createReservation(@RequestBody ReservationCancelRequest dto) {
        reservationService.cancelReservation(dto);
        return ResponseEntity.ok().build();
    }
}
