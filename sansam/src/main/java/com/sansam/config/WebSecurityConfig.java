package com.sansam.config;

import com.sansam.config.jwt.JwtAuthenticationFilter;
import com.sansam.config.jwt.JwtProvider;
import com.sansam.service.OAuth2UserServiceImpl;
import com.sansam.service.UserDetailsServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@RequiredArgsConstructor
public class WebSecurityConfig {

    private final JwtProvider jwtProvider;

    private final UserDetailsServiceImpl userDetailsService;

    private final OAuth2UserServiceImpl oAuth2UserServiceImpl;

    private final AuthenticationSuccessHandler authenticationSuccessHandler;

    private final AuthenticationFailureHandler authenticationFailureHandler;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
            .formLogin().disable()
            .httpBasic().disable()
            .csrf().disable()
            .headers().frameOptions().disable()
            .and()
            .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .authorizeRequests()
            .antMatchers(HttpMethod.OPTIONS).permitAll()
            .antMatchers("/", "/login/*").permitAll()
//                .antMatchers("/", "/auth/**", "/js/**", "/image/**", "/webjars/**").permitAll()
            .and()
            .oauth2Login()
            .userInfoEndpoint().userService(oAuth2UserServiceImpl)
            .and()
            .successHandler(authenticationSuccessHandler)
            .failureHandler(authenticationFailureHandler);
        http
            .addFilterBefore(new JwtAuthenticationFilter(userDetailsService, jwtProvider), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
