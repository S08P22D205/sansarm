package com.sansam.controller;

import com.sansam.dto.response.MountainListResponse;
import com.sansam.service.CourseServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/course")
@AllArgsConstructor
public class CourseController {

    private final CourseServiceImpl courseService;
    @GetMapping("/mtlist")
    public ResponseEntity<?> mountainList() {
        MountainListResponse mountainListResponse = new MountainListResponse();
        mountainListResponse.setMountainList(courseService.createMountainList());
        return new ResponseEntity<>(mountainListResponse, HttpStatus.OK);
    }
}
