package com.sansam.data.repository;

import com.sansam.data.entity.Experience;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExperienceRepository extends JpaRepository<Experience, Integer> {
    Experience findByUserNo(int userNo);
}
