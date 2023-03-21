package com.sansam.service;

import com.sansam.data.entity.Token;
import com.sansam.data.entity.User;
import com.sansam.data.repository.TokenRepository;
import com.sansam.data.repository.UserRepository;
import com.sansam.dto.request.SignUpRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;


@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final TokenRepository tokenRepository;

    @Override
    @Transactional
    public void SignUp(SignUpRequest signUpRequest) {
        User user = userRepository.findByUserNo(signUpRequest.getUserNo());
        user.updateSignUp(signUpRequest.getUserNicknm(), signUpRequest.getUserAge(), signUpRequest.getUserGender(), signUpRequest.getUserLocation());
    }

    @Override
    @Transactional
    public void saveRefreshToken(String refreshToken, int userNo) {
        Token token = tokenRepository.findByUserNo(userNo);
        User user = userRepository.findByUserNo(userNo);

        if (token == null) {
            token = new Token();
            token.createToken(userNo, user.getUserEmail(), refreshToken);
            tokenRepository.save(token);
        }

        token.updateRefreshToken(refreshToken);
    }
}
