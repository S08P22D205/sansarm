package com.sansam.data.repository;

import com.sansam.data.entity.Mountain;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MountainRepository extends JpaRepository<Mountain, Integer> {

}