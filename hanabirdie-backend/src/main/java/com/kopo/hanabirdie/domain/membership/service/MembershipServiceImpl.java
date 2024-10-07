package com.kopo.hanabirdie.domain.membership.service;

import com.kopo.hanabirdie.domain.membership.dto.*;
import com.kopo.hanabirdie.domain.membership.mapper.MembershipMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class MembershipServiceImpl implements MembershipService {
    private final MembershipMapper membershipMapper;

    @Override
    public List<MembershipListResponse> getMembershipList() {
        return membershipMapper.getMembershipList();
    }

    @Override
    public MembershipDetailResponse getMembershipDetail(MembershipDetailRequest dto) {
        return membershipMapper.getMembershipDetail(dto);
    }

    @Override
    public List<MembershipMyListResponse> getMembershipMyList(MembershipMyListRequest dto) {
        return membershipMapper.getMembershipMyList(dto);
    }

    @Override
    public void renewalMembership(MembershipRenewalRequest dto) {
        membershipMapper.renewalMembership(dto);
    }
}
