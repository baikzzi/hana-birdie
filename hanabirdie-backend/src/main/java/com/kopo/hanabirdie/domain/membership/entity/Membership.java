package com.kopo.hanabirdie.domain.membership.entity;

import lombok.Getter;

@Getter
public class Membership {
    private int goldCourseId;
    private int membershipId;
    private String golfCourseName;
//    private Blob image;
    private String address;
    private int price;
}