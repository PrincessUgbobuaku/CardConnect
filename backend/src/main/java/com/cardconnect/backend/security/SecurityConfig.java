package com.cardconnect.backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // @Bean
    // public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    //     http
    //             .csrf(csrf -> csrf.disable()) // Disable CSRF for APIs
    //             .authorizeHttpRequests(auth -> auth
    //                     .requestMatchers("/api/auth/**").permitAll() // Allow auth endpoints
    //                     .anyRequest().authenticated() // Secure all other endpoints
    //             )
    //             .sessionManagement(session -> session
    //                     .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
    //             .httpBasic(httpBasic -> {
    //             }); // Disable popup but allow programmatic Basic Auth (optional)

    //     return http.build();
    // }
}