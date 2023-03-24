package com.sansam.service;

import com.sansam.dto.request.SaveExperienceRequest;
import com.sansam.dto.request.FavoriteRequest;
import com.sansam.dto.request.SaveReviewRequest;
import com.sansam.dto.request.SignUpRequest;
import com.sansam.dto.response.FavoriteListResponse;
import com.sansam.dto.response.ReviewListResponse;
import org.springframework.stereotype.Service;

@Service
public interface UserService {
    void SignUp(SignUpRequest signUpRequest);
    void SaveRefreshToken(String refreshToken, int userNo);
    void SignOut(String refreshToken);
    void SaveExperience(int userNo, SaveExperienceRequest saveExperienceRequest);
    FavoriteListResponse getFavoriteList(String userEmail);
    void SaveFavorite(int userNo, FavoriteRequest favoriteRequest);
    void removeFavorite(int userNo, FavoriteRequest favoriteRequest);
    ReviewListResponse getReviewList(String userEmail);
    void SaveReview(int userNo, SaveReviewRequest saveReviewRequest);
}
