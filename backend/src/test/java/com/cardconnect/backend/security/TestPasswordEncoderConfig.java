// package com.cardconnect.backend.security;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.security.crypto.password.PasswordEncoder;

// @Configuration
// public class TestPasswordEncoderConfig {

//     @Bean
//     public PasswordEncoder passwordEncoder() {
//         return new PasswordEncoder() {
//             @Override
//             public String encode(CharSequence rawPassword) {
//                 // Just return the raw password as is (no encryption)
//                 return rawPassword.toString();
//             }

//             @Override
//             public boolean matches(CharSequence rawPassword, String encodedPassword) {
//                 // Simple string equality check
//                 return rawPassword.toString().equals(encodedPassword);
//             }
//         };
//     }
// }