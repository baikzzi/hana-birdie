package com.kopo.hanabirdie.domain.membership.controller;

import com.kopo.hanabirdie.domain.membership.dto.*;
import com.kopo.hanabirdie.domain.membership.service.MembershipService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Tag(name = "Membership")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/membership")
public class MembershipController {

    private final MembershipService membershipService;

    @PostMapping("/list")
    public ResponseEntity<List<MembershipListResponse>> getMembershipList() {
        return ResponseEntity.ok(membershipService.getMembershipList());
    }

    @PostMapping("/detail")
    public ResponseEntity<MembershipDetailResponse> getMembershipDetail(@RequestBody MembershipDetailRequest dto) {
        return ResponseEntity.ok(membershipService.getMembershipDetail(dto));
        // return ResponseEntity.ok().build(); 이렇게 했을 때는 return이 안됐었음
    }

    @PostMapping("/myList")
    public ResponseEntity<List<MembershipMyListResponse>> getMembershipMyList(@RequestBody MembershipMyListRequest dto) {
        return ResponseEntity.ok(membershipService.getMembershipMyList(dto));
    }

    @PostMapping("/renewal")
    public ResponseEntity<Void> renewalMembership(@RequestBody MembershipRenewalRequest dto) {
        membershipService.renewalMembership(dto);
        return ResponseEntity.ok().build();
    }
}
