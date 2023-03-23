package com.sansam.service;

import com.sansam.data.entity.Coordinate;
import com.sansam.data.entity.Course;
import com.sansam.data.entity.Mountain;
import com.sansam.data.repository.CoordinateRepository;
import com.sansam.data.repository.CourseRepository;
import com.sansam.data.repository.MountainRepository;
import com.sansam.dto.response.CourseResponse;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class CourseServiceImpl implements CourseService {

    private final MountainRepository mountainRepository;
    private final CourseRepository courseRepository;
    private final CoordinateRepository coordinateRepository;

    @Override
    public List<String> createMountainList() {
        List<String> mountainList = new ArrayList<>();
        List<Mountain> mtList = mountainRepository.findAll(Sort.by(Sort.Direction.ASC, "mtNm"));
        for (Mountain mountain : mtList) {
            mountainList.add(mountain.getMtNm());
        }

        return mountainList;
    }

    @Override
    public CourseResponse getCourseDetails(int no) {
        Course course = courseRepository.findCourseByCourseNo(no);
        List<BigDecimal> courseXCoords = new ArrayList<>();
        List<BigDecimal> courseYCoords = new ArrayList<>();
        List<Coordinate> coordinates = coordinateRepository.findAllByCourseNo(no);
        for (Coordinate coordinate : coordinates) {
            courseXCoords.add(coordinate.getCoordX());
            courseYCoords.add(coordinate.getCoordY());
        }

        return new CourseResponse(course.getCourseNo(), course.getCourseMtNm(), course.getCourseMtCd(), course.getCourseMtNo(), courseXCoords, courseYCoords, course.getCourseAbsDiff(), course.getCourseUptime(), course.getCourseDowntime(), course.getCourseLength(), course.getCourseLocation(), course.getCourseAddress());
    }
}
