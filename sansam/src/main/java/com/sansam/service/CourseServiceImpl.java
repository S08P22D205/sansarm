package com.sansam.service;

import com.sansam.data.entity.Mountain;
import com.sansam.data.repository.MountainRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class CourseServiceImpl implements CourseService {

    private final MountainRepository mountainRepository;

    @Override
    public List<String> createMountainList() {
        List<String> mountainList = new ArrayList<>();
        System.out.println(mountainRepository.findAll());
        List<Mountain> mtList = mountainRepository.findAll(Sort.by(Sort.Direction.ASC, "mtNm"));
        for (Mountain mountain : mtList) {
            mountainList.add(mountain.getMtNm());
        }

        return mountainList;
    }
}
