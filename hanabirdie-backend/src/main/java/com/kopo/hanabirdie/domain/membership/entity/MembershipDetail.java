package com.kopo.hanabirdie.domain.membership.entity;

import lombok.Getter;

import java.sql.Date;

@Getter
public class MembershipDetail {
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
    private String pRecommendedCustomer;
    private String pComposition;
    private String pMembershipType;
    private String pBooking;
    private String pJoiningConditions;
    private String pRequiredDocuments;
    private String pFeatures;
    private String cRecommendedCustomer;
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
}
