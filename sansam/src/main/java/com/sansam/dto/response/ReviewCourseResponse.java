package com.sansam.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReviewCourseResponse {
    private int courseNo;
    private String courseMtNm;
    private String courseMtCd;
    private int courseMtNo;
    private List<BigDecimal> courseXCoords;
    private List<BigDecimal> courseYCoords;
    private Character courseAbsDiff;
    private int courseUptime;
    private int courseDowntime;
    private BigDecimal courseLength;
    private String courseLocation;
    private String courseAddress;
    private Date reviewDate;
    private int reviewTime;
    private String  reviewContent;
}
