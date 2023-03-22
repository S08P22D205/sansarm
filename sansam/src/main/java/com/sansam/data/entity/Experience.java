package com.sansam.data.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "EXPERIENCE")
public class Experience {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "EX_NO", nullable = false)
    private int exNo;

    @Column(name = "USER_NO", nullable = false)
    private int userNo;

    @Column(name = "EX_MT_NM", nullable = false)
    private String exMtNm;

    @Column(name = "EX_REL_DIFF", nullable = false)
    private Character exRelDiff;

    @Builder
    public Experience(int exNo, int userNo, String exMtNm, Character exRelDiff) {
        this.exNo = exNo;
        this.userNo = userNo;
        this.exMtNm = exMtNm;
        this.exRelDiff = exRelDiff;
    }

    public void createExperience(int userNo, String exMtNm, Character exRelDiff) {
        this.userNo = userNo;
        this.exMtNm = exMtNm;
        this.exRelDiff = exRelDiff;
    }
}
