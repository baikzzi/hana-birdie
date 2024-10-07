package com.kopo.hanabirdie.domain.membership.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MembershipDetailResponse {
    private int golfCourseId;
    private int membershipId;
    private String golfCourseName;
    private Date openingDate;
    private String address;
    private String holeCount;
    private int memberCount;
    private String personal;
    private String corporate;
    private String membershipIntro;
    private String courseIntro;
    private String history;
    private String locationInfo;
    private String priceTrend;
    private String futureOutlook;
    private String pRecommendedCustomers;
    private String pComposition;
    private String pMembershipType;
    private String pBooking;
    private String pJoiningConditions;
    private String pRequiredDocuments;
    private String pFeatures;
    private String cRecommendedCustomers;
    private String cComposition;
    private String cMembershipType;
    private String cBooking;
    private String cJoiningConditions;
    private String cRequiredDocuments;
    private String cFeatures;
    private int weekdayMember;
    private int weekendMember;
    private int weekdayFamily;
    private int weekendFamily;
    private int weekdayNonMember;
    private int weekendNonMember;
    private int weekdayPrime;
    private int weekendPrime;
    private String caddyFee;
    private String cartFee;

    public static MembershipDetailResponse of(int golfCourseId, int membershipId, String golfCourseName, Date openingDate, String address, String holeCount, int memberCount, String personal, String corporate,
                                            String membershipIntro, String courseIntro, String history, String locationInfo, String priceTrend, String futureOutlook,
                                            String pRecommendedCustomers, String pComposition, String pMembershipType, String pBooking, String pJoiningConditions, String pFeatures,
                                            String cRecommendedCustomers, String cComposition, String cMembershipType, String cBooking, String cJoiningConditions, String cFeatures,
                                            int weekdayMember, int weekendMember, int weekdayFamily, int weekendFamily, int weekdayNonMember, int weekendNonMember,
                                            int weekdayPrime, int weekendPrime, String caddyFee, String cartFee) {
        return MembershipDetailResponse.builder()
                .golfCourseId(golfCourseId)
                .membershipId(membershipId)
                .golfCourseName(golfCourseName)
                .openingDate(openingDate)
                .openingDate(openingDate)
                .address(address)
                .holeCount(holeCount)
                .memberCount(memberCount)
                .personal(personal)
                .corporate(corporate)
                .membershipIntro(membershipIntro)
                .courseIntro(courseIntro)
                .history(history)
                .locationInfo(locationInfo)
                .priceTrend(priceTrend)
                .futureOutlook(futureOutlook)
                .pRecommendedCustomers(pRecommendedCustomers)
                .pComposition(pComposition)
                .pMembershipType(pMembershipType)
                .pBooking(pBooking)
                .pJoiningConditions(pJoiningConditions)
                .pFeatures(pFeatures)
                .cRecommendedCustomers(cRecommendedCustomers)
                .cComposition(cComposition)
                .cMembershipType(cMembershipType)
                .cBooking(cBooking)
                .cJoiningConditions(cJoiningConditions)
                .cFeatures(cFeatures)
                .weekdayMember(weekdayMember)
                .weekendMember(weekendMember)
                .weekdayFamily(weekdayFamily)
                .weekendFamily(weekendFamily)
                .weekdayNonMember(weekdayNonMember)
                .weekendNonMember(weekendNonMember)
                .weekdayPrime(weekdayPrime)
                .weekendPrime(weekendPrime)
                .caddyFee(caddyFee)
                .cartFee(cartFee)
                .build();
    }
}
