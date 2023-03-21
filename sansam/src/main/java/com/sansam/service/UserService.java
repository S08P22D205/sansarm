package com.sansam.service;

import com.sansam.dto.request.SignUpRequest;
import org.springframework.stereotype.Service;

@Service
public interface UserService {
    void SignUp(SignUpRequest signUpRequest);
    void SaveRefreshToken(String refreshToken, int userNo);
    void SignOut(String refreshToken);
}
