package com.sansam.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
public class SaveReviewRequest {
    private int courseNo;
    private Date reviewDate;
    private int reviewTime;
    private Character reviewDiff;
    private String reviewContent;
}
