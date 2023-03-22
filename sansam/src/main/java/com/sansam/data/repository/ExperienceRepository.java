package com.sansam.data.repository;

import com.sansam.data.entity.Experience;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExperienceRepository extends JpaRepository<Experience, Integer> {
    Experience findByUserNo(int userNo);
}
