package com.sansam.controller;

import com.sansam.config.jwt.JwtProvider;
import com.sansam.data.entity.User;
import com.sansam.data.repository.UserRepository;
import com.sansam.dto.request.SaveExperienceRequest;
import com.sansam.dto.request.FavoriteRequest;
import com.sansam.dto.request.SignOutRequest;
import com.sansam.dto.request.SignUpRequest;
import com.sansam.dto.response.FavoriteListResponse;
import com.sansam.dto.response.SignUpResponse;
import com.sansam.service.UserServiceImpl;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;


@RestController
@RequestMapping("/user")
@AllArgsConstructor
public class UserController {
    private final JwtProvider jwtProvider;
    private final UserServiceImpl userService;
    private final UserRepository userRepository;

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
            return new ResponseEntity<>("Fail", HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(
			value = "로그아웃",
			notes = "로그아웃 과정에서 refreshToken을 만료시키고 성공하면 Success를, 실패 시 Fail을 반환한다.")
    @PostMapping("/signout")
    public ResponseEntity<String> signOut(@RequestBody SignOutRequest signOutRequest) {
        try {
            userService.SignOut(signOutRequest.getRefreshToken());
            return new ResponseEntity<>("Success", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Fail", HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(
			value = "최초 회원가입 시 산 정보 저장",
			notes = "산 정보 저장이 성공적으로 이루어지면 Success를, 실패하면 Fail을 반환한다.")
    @PostMapping("/experience/insert")
    public ResponseEntity<?> saveExperience(@RequestHeader(value="X-ACCESS-TOKEN") String accessToken, HttpServletResponse response, @RequestBody SaveExperienceRequest saveExperienceRequest) {
        HttpHeaders headers = new HttpHeaders();
        if (response.getHeader("X-ACCESS-TOKEN") != null) {
            headers.set("X-ACCESS-TOKEN", response.getHeader("X-ACCESS-TOKEN"));
        } else {
            headers.set("X-ACCESS-TOKEN", accessToken);
        }

        String userEmail = jwtProvider.getEmailFromToken(accessToken);
        User user = userRepository.findByUserEmail(userEmail);

        try {
            userService.SaveExperience(user.getUserNo(), saveExperienceRequest);
            return new ResponseEntity<>("Success", headers, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Fail", headers, HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(
			value = "찜 목록",
			notes = "찜 목록을 조회하고 성공하면 찜 목록을, 실패하면 Fail을 반환한다.")
    @GetMapping("/favorite")
    public ResponseEntity<?> getFavoriteList(@RequestHeader(value = "X-ACCESS-TOKEN") String accessToken, HttpServletResponse response) {
        HttpHeaders headers = new HttpHeaders();
        if (response.getHeader("X-ACCESS-TOKEN") != null) {
            headers.set("X-ACCESS-TOKEN", response.getHeader("X-ACCESS-TOKEN"));
        } else {
            headers.set("X-ACCESS-TOKEN", accessToken);
        }

        try {
            FavoriteListResponse favoriteListResponse = userService.getFavoriteList(jwtProvider.getEmailFromToken(accessToken));
            return new ResponseEntity<>(favoriteListResponse, headers, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Fail", HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/favorite/insert")
    public ResponseEntity<?> saveFavorite(@RequestHeader(value="X-ACCESS-TOKEN") String accessToken, HttpServletResponse response, @RequestBody FavoriteRequest favoriteRequest) {
        HttpHeaders headers = new HttpHeaders();
        if (response.getHeader("X-ACCESS-TOKEN") != null) {
            headers.set("X-ACCESS-TOKEN", response.getHeader("X-ACCESS-TOKEN"));
        } else {
            headers.set("X-ACCESS-TOKEN", accessToken);
        }

        String userEmail = jwtProvider.getEmailFromToken(accessToken);
        User user = userRepository.findByUserEmail(userEmail);

        try {
            userService.SaveFavorite(user.getUserNo(), favoriteRequest);
            return new ResponseEntity<>("Success", headers, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Fail", headers, HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(
			value = "찜 목록에서 삭제",
			notes = "코스 번호에 해당하는 코스를 찜 목록에서 삭제하고, 성공하면 찜 목록을, 실패하면 Fail을 반환한다.")
    @DeleteMapping("/favorite/delete")
    public ResponseEntity<?> removeFavorite(@RequestHeader(value = "X-ACCESS-TOKEN") String accessToken, HttpServletResponse response, @RequestBody FavoriteRequest favoriteRequest) {
        HttpHeaders headers = new HttpHeaders();
        if (response.getHeader("X-ACCESS-TOKEN") != null) {
            headers.set("X-ACCESS-TOKEN", response.getHeader("X-ACCESS-TOKEN"));
        } else {
            headers.set("X-ACCESS-TOKEN", accessToken);
        }

        String userEmail = jwtProvider.getEmailFromToken(accessToken);
        User user = userRepository.findByUserEmail(userEmail);

        try {
            userService.removeFavorite(user.getUserNo(), favoriteRequest);
            return new ResponseEntity<>("Success", headers, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Fail", headers, HttpStatus.BAD_REQUEST);
        }
    }
}
