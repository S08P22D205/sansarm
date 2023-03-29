package com.sansam.service;

import com.sansam.data.entity.*;
import com.sansam.data.repository.*;
import com.sansam.dto.response.*;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class CourseServiceImpl implements CourseService {

    private final MountainRepository mountainRepository;
    private final CourseRepository courseRepository;
    private final CoordinateRepository coordinateRepository;
    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;

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

        return new CourseResponse(course.getCourseNo(), course.getCourseMtNm(), course.getCourseMtCd(), course.getCourseMtNo(), courseXCoords, courseYCoords, course.getCourseElevDiff(), course.getCourseUptime(), course.getCourseDowntime(), course.getCourseLength(), course.getCourseLocation(), course.getCourseAddress());
    }

    @Override
    public CourseReviewListResponse getCourseReviewList(int courseNo) {
        List<ReviewResponse> courseReviewList = new ArrayList<>();
        List<Review> reviews = reviewRepository.findAllByCourseNo(courseNo);
        User user;
        for (Review review : reviews) {
            user = userRepository.findByUserNo(review.getUserNo());
            courseReviewList.add(new ReviewResponse(user.getUserNicknm(), review.getReviewRelDiff(), review.getReviewDate(), review.getReviewTime(), review.getReviewContent()));
        }

        return new CourseReviewListResponse(courseReviewList);
    }

    @Override
    public TopTenCourseListResponse getTopTenCourseList() {
        EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("my-persistence-unit");
        EntityManager entityManager = entityManagerFactory.createEntityManager();

        String sql = "SELECT c.COURSE_NO " +
             "FROM COURSE c " +
             "INNER JOIN REVIEW r ON r.COURSE_NO = c.COURSE_NO " +
             "GROUP BY c.COURSE_NO " +
             "ORDER BY COUNT(*) DESC " +
             "LIMIT 10";
        List<Integer> courseNumbers = entityManager.createNativeQuery(sql).getResultList();

        List<TopTenCourseResponse> topTenCourseList = new ArrayList<>();

        for (Integer courseNumber: courseNumbers) {
            Course course = courseRepository.findCourseByCourseNo(courseNumber);
            topTenCourseList.add(new TopTenCourseResponse(course.getCourseNo(), course.getCourseMtNm(), course.getCourseMtNo(), course.getCourseUptime(), course.getCourseDowntime(), course.getCourseLength()));
        }

        return new TopTenCourseListResponse(topTenCourseList);
    }
}
