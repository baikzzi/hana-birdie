package com.kopo.hanabirdie.domain.membership.mapper;

import com.kopo.hanabirdie.domain.membership.dto.*;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MembershipMapper {
    List<MembershipListResponse> getMembershipList();
    MembershipDetailResponse getMembershipDetail(MembershipDetailRequest dto);
    List<MembershipMyListResponse> getMembershipMyList(MembershipMyListRequest dto);
    void renewalMembership(MembershipRenewalRequest dto);
}
