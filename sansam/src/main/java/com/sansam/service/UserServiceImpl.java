package com.sansam.service;

import com.sansam.config.jwt.JwtProvider;
import com.sansam.data.entity.*;
import com.sansam.data.repository.*;
import com.sansam.dto.request.SaveExperienceRequest;
import com.sansam.dto.request.FavoriteRequest;
import com.sansam.dto.request.SignUpRequest;
import com.sansam.dto.response.CourseResponse;
import com.sansam.dto.response.FavoriteListResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;


@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final ExperienceRepository experienceRepository;
    private final FavoriteRepository favoriteRepository;
    private final CourseServiceImpl courseService;
    private final JwtProvider jwtProvider;

    @Override
    @Transactional
    public void SignUp(SignUpRequest signUpRequest) {
        User user = userRepository.findByUserNo(signUpRequest.getUserNo());
        user.updateSignUp(signUpRequest.getUserNicknm(), signUpRequest.getUserAge(), signUpRequest.getUserGender(), signUpRequest.getUserLocation());
    }

    @Override
    @Transactional
    public void SaveRefreshToken(String refreshToken, int userNo) {
        Token token = tokenRepository.findByUserNo(userNo);
        User user = userRepository.findByUserNo(userNo);

        if (token == null) {
            token = new Token();
            token.createToken(userNo, user.getUserEmail(), refreshToken);
            tokenRepository.save(token);
        }

        token.updateRefreshToken(refreshToken);
    }

    @Override
    @Transactional
    public void SignOut(String refreshToken) {
        String userEmail = jwtProvider.getEmailFromToken(refreshToken);
        Token token = tokenRepository.findByUserEmail(userEmail);
        token.updateRefreshToken(null);
    }

    @Override
    @Transactional
    public void SaveExperience(int userNo, SaveExperienceRequest saveExperienceRequest) {
        Experience experience = new Experience();
        experience.createExperience(userNo, saveExperienceRequest.getExMtNm(), saveExperienceRequest.getExDiff());
        experienceRepository.save(experience);
    }

    @Override
    public FavoriteListResponse getFavoriteList(String userEmail) {
        List<CourseResponse> favoriteCourses = new ArrayList<>();
        User user = userRepository.findByUserEmail(userEmail);
        List<Favorite> favorites = favoriteRepository.findAllByUserNo(user.getUserNo());
        for (Favorite favorite : favorites) {
            favoriteCourses.add(courseService.getCourseDetails(favorite.getCourseNo()));
        }

        return new FavoriteListResponse(favoriteCourses);
    }

    @Override
    @Transactional
    public void SaveFavorite(int userNo, FavoriteRequest favoriteRequest) {
        Favorite favorite = new Favorite();
        favorite.createFavorite(userNo, favoriteRequest.getCourseNo());
        favoriteRepository.save(favorite);
    }

    @Override
    @Transactional
    public void removeFavorite(int userNo, FavoriteRequest favoriteRequest) {
        favoriteRepository.deleteByUserNoAndCourseNo(userNo, favoriteRequest.getCourseNo());
    }
}
