package com.cardconnect.backend.controller;

import com.cardconnect.backend.dto.LoginRequest;
import com.cardconnect.backend.dto.SignUpRequest;
import com.cardconnect.backend.domain.UserAccount;
import com.cardconnect.backend.service.UserAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserAccountService userAccountService;

    // @Autowired
    // private UserAccountService userAccountService;

    // STEP 1: Verify CPUT student
    @PostMapping("/verify-student")
    public ResponseEntity<?> verifyStudent(@RequestBody SignUpRequest request) {
        try {
            String userId = userAccountService.verifyStudent(request.getStudentNumber(),
                    request.getIdentificationNumber());
            return ResponseEntity.ok("Verification successful for user ID: " + userId);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Verification failed: " + e.getMessage());
        }
    }

    // STEP 2: Complete Signup (password creation)
    @PostMapping("/complete-signup")
    public ResponseEntity<?> completeSignup(@RequestBody SignUpRequest request) {
        try {
            UserAccount createdAccount = userAccountService.completeSignup(request.getStudentNumber(),
                    request.getPassword());
            return ResponseEntity.ok("Signup complete for: " + createdAccount.getEmail());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Signup failed: " + e.getMessage());
        }
    }

    // LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            UserAccount userAccount = userAccountService.login(request.getEmail(), request.getPassword());
            return ResponseEntity.ok("Login successful for: " + userAccount.getEmail());
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Login failed: " + e.getMessage());
        }
    }
}