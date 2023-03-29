package com.sansam.controller;

import com.sansam.dto.response.CourseResponse;
import com.sansam.dto.response.CourseReviewListResponse;
import com.sansam.dto.response.MountainListResponse;
import com.sansam.dto.response.TopTenCourseListResponse;
import com.sansam.service.CourseServiceImpl;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/course")
@AllArgsConstructor
public class CourseController {

    private final CourseServiceImpl courseService;
    @ApiOperation(
			value = "산 목록",
			notes = "산 목록을 조회하여 성공 시 배열에 담아 반환하고, 실패 시 Fail을 반환한다.")
    @GetMapping("/mtlist")
    public ResponseEntity<?> getMountainList(@RequestHeader(value = "X-ACCESS-TOKEN") String accessToken, HttpServletResponse response) {
        if (response.getHeader("X-ACCESS-TOKEN") != null) {
            accessToken = response.getHeader("X-ACCESS-TOKEN");
        } else {
            response.setHeader("X-ACCESS-TOKEN", accessToken);
        }

        MountainListResponse mountainListResponse = new MountainListResponse();
        try {
            mountainListResponse.setMountainList(courseService.createMountainList());
            return new ResponseEntity<>(mountainListResponse, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Fail", HttpStatus.BAD_REQUEST);
        }
    }

     @ApiOperation(
			value = "코스 세부 정보 반환",
			notes = "해당 {no}의 코스 세부 정보를 조회하고, 성공 시 코스 세부 정보를 반환하고 실패 시 Fail을 반환한다.")
    @GetMapping("/search/{no}")
    public ResponseEntity<?> getCourseDetailsByCourseNo(@RequestHeader(value = "X-ACCESS-TOKEN") String accessToken, HttpServletResponse response, @PathVariable int no) {
        if (response.getHeader("X-ACCESS-TOKEN") != null) {
            accessToken = response.getHeader("X-ACCESS-TOKEN");
        } else {
            response.setHeader("X-ACCESS-TOKEN", accessToken);
        }

        try {
            CourseResponse courseResponse = courseService.getCourseDetails(no);
            return new ResponseEntity<>(courseResponse, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Fail", HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(
            value = "한 코스에 대한 모든 리뷰 목록",
            notes = "한 코스에 대한 모든 리뷰 목록을 조회하여 성공하면 목록을 반환하고, 실패하면 Fail을 반환한다.")
    @GetMapping("/review/{courseNo}")
    public ResponseEntity<?> getCourseReviewList(@RequestHeader(value = "X-ACCESS-TOKEN") String accessToken, HttpServletResponse response, @PathVariable int courseNo) {
        if (response.getHeader("X-ACCESS-TOKEN") != null) {
            accessToken = response.getHeader("X-ACCESS-TOKEN");
        } else {
            response.setHeader("X-ACCESS-TOKEN", accessToken);
        }

        try {
            CourseReviewListResponse courseReviewListResponse = courseService.getCourseReviewList(courseNo);
            return new ResponseEntity<>(courseReviewListResponse, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Fail", HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(
            value = "Top 10 코스 목록",
            notes = "Top 10 코스 목록을 추출하고, 성공 시 코스 목록을 반환하고, 실패 시 Fail을 반환한다.")
    @GetMapping("/top-ten")
    public ResponseEntity<?> getTopTenCourseList(@RequestHeader(value = "X-ACCESS-TOKEN") String accessToken, HttpServletResponse response) {
        if (response.getHeader("X-ACCESS-TOKEN") != null) {
            accessToken = response.getHeader("X-ACCESS-TOKEN");
        } else {
            response.setHeader("X-ACCESS-TOKEN", accessToken);
        }

        try {
            TopTenCourseListResponse topTenCourseListResponse = courseService.getTopTenCourseList();
            return new ResponseEntity<>(topTenCourseListResponse, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Fail", HttpStatus.BAD_REQUEST);
        }
    }
}
