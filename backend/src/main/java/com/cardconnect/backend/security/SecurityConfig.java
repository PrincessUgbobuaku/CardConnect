package com.cardconnect.backend.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {
        @Autowired
        private JwtAuthenticationFilter jwtAuthenticationFilter;

        @Bean
        public PasswordEncoder passwordEncoder() {
                return new BCryptPasswordEncoder();
        }

        @Bean
        public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
                // http
                // .csrf(csrf -> csrf.disable())
                // .authorizeHttpRequests(auth -> auth
                // .anyRequest().permitAll() // Allow all for testing
                // );
                // return http.build();
                System.out.println("⚙️ Configuring security filter chain");

                http
                                .csrf(csrf -> csrf.disable())
                                .authorizeHttpRequests(auth -> auth
                                                .requestMatchers("/api/auth/**", "/api/user-accounts/login",
                                                                "/api/user-accounts/verify-student",
                                                                "/api/user-accounts/signup")
                                                .permitAll()
                                                // .requestMatchers("/api/profile/**").permitAll() // Allows PUT too
                                                .requestMatchers("/api/profile/**").authenticated()

                                                .anyRequest().authenticated())
                                .sessionManagement(session -> session
                                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

                return http.build();
        }
}