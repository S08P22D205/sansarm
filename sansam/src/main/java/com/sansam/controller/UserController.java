package com.sansam.controller;

import com.sansam.config.jwt.JwtProvider;
import com.sansam.data.entity.User;
import com.sansam.data.repository.UserRepository;
import com.sansam.dto.request.SignOutRequest;
import com.sansam.dto.request.SignUpRequest;
import com.sansam.dto.response.SignUpResponse;
import com.sansam.service.UserServiceImpl;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/user")
@AllArgsConstructor
public class UserController {
    private final JwtProvider jwtProvider;

    private final UserServiceImpl userService;

    private final UserRepository userRepository;

    @ApiOperation(
			value = "카카오 인가코드 발송",
			notes = "인가코드를 받으면 success를 반환하고, 실패하면 fail을 반환한다.")
    @GetMapping("/oauth/code")
    public ResponseEntity<String> kakaoCode(@RequestParam String code) {
        try {
            System.out.println(code);
            return new ResponseEntity<>("success", HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<>("fail", HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(
			value = "카카오 OAuth 회원가입",
			notes = "회원가입이 성공적으로 이루어지면 해당 회원의 accessToken과 refreshToken을 반환하고, 실패하면 Fail을 출력한다.")
    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody SignUpRequest signUpRequest) {
        try {
            userService.SignUp(signUpRequest);
            User user = userRepository.findByUserNo(signUpRequest.getUserNo());

            String accessToken = jwtProvider.createAccessToken(user.getUserEmail());
            String refreshToken = jwtProvider.createRefreshToken(user.getUserEmail());

            SignUpResponse signUpResponse = new SignUpResponse();
            signUpResponse.setAccessToken(accessToken);
            signUpResponse.setRefreshToken(refreshToken);
            return new ResponseEntity<>(signUpResponse, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<>("Fail", HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(
			value = "카카오 인가코드 발송",
			notes = "인가코드를 받으면 success를 반환하고, 실패하면 fail을 반환한다.")
    @PostMapping("/signout")
    public ResponseEntity<String> signOut(@RequestBody SignOutRequest signOutRequest) {
        try {
            userService.SignOut(signOutRequest.getRefreshToken());
            return new ResponseEntity<>("Success", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Fail", HttpStatus.BAD_REQUEST);
        }
    }

}
