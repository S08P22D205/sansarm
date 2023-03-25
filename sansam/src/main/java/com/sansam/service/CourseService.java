package com.sansam.service;

import com.sansam.dto.response.CourseResponse;
import com.sansam.dto.response.CourseReviewListResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CourseService {
    List<String> createMountainList();
    CourseResponse getCourseDetails(int no);
    CourseReviewListResponse getCourseReviewList(int courseNo);
}
