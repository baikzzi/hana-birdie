package com.kopo.hanabirdie.domain.membership.service;


import com.kopo.hanabirdie.domain.membership.dto.*;

import java.util.List;

public interface MembershipService {
    List<MembershipListResponse> getMembershipList();
    MembershipDetailResponse getMembershipDetail(MembershipDetailRequest dto);
    List<MembershipMyListResponse> getMembershipMyList(MembershipMyListRequest dto);
    void renewalMembership(MembershipRenewalRequest dto);
}
