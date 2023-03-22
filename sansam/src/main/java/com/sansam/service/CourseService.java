package com.sansam.service;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CourseService {
    List<String> createMountainList();
}
