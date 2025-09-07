package com.cardconnect.backend.controller;

import com.cardconnect.backend.domain.Student;
import com.cardconnect.backend.domain.UserAccount;
import com.cardconnect.backend.dto.*;
import com.cardconnect.backend.service.IStudentService;
import com.cardconnect.backend.service.IUserAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/user-accounts")
public class AuthController {

    private final IUserAccountService userAccountService;
    private final IStudentService studentService;

    @Autowired
    public AuthController(IUserAccountService userAccountService, IStudentService studentService) {
        this.userAccountService = userAccountService;
        this.studentService = studentService;
    }

    // 1. Verify Student (signup step 1)
    @PostMapping("/verify-student")
    public ResponseEntity<?> verifyStudent(@RequestBody VerifyStudentRequest request) {
        try {

            // 🐛 Debugging output
            System.out.println("=== Incoming Verify Student Request ===");
            System.out.println("Student number: " + request.getStudentNumber());
            System.out.println("ID number: " + request.getIdentificationNumber());
            System.out.println("Agreed to terms: " + request.isAgreedToTerms());
            System.out.println("=======================================");

            // Check for terms agreement (optional but recommended)
            if (!request.isAgreedToTerms()) {
                return ResponseEntity.badRequest().body("You must agree to the terms to proceed pls.");
            }

            String studentNumber = request.getStudentNumber();
            String idNumber = request.getIdentificationNumber();

            Optional<Student> studentOpt = studentService.verifyStudentIdentity(studentNumber, idNumber);

            if (studentOpt.isEmpty()) {
                return ResponseEntity.status(404).body("You are not a CPUT student or ID number does not match.");
            }

            if (userAccountService.accountExistsForUserId(studentNumber)) {
                return ResponseEntity.status(409).body("You already have an account. Please log in.");
            }

            return ResponseEntity.ok(studentNumber);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // 2. Complete signup by creating account with password
    @PostMapping("/signup")
    public ResponseEntity<?> completeSignup(@RequestBody CompleteSignupRequest request) {
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            return ResponseEntity.badRequest().body("Passwords do not match.");
        }
        try {
            UserAccount account = userAccountService.completeSignup(request.getUserId(), request.getPassword());
            return ResponseEntity.ok(account);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // 3. Login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            UserAccount account = userAccountService.login(request.getEmail(), request.getPassword());
            return ResponseEntity.ok(account);
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body("Email or password is incorrect.");
        }
    }

    // 4. Change Password (optional)
    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest request) {
        if (!request.getNewPassword().equals(request.getConfirmPassword())) {
            return ResponseEntity.badRequest().body("New passwords do not match.");
        }
        try {
            UserAccount updatedAccount = userAccountService.changePassword(request.getEmail(), request.getOldPassword(),
                    request.getNewPassword());
            return ResponseEntity.ok(updatedAccount);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}

// package com.cardconnect.backend.controller;

// import com.cardconnect.backend.domain.UserAccount;
// import com.cardconnect.backend.service.IUserAccountService;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;
// import org.springframework.web.bind.annotation.RestController;

// @RestController
// @RequestMapping("/api/user-accounts")
// public class AuthController {

// private final IUserAccountService userAccountService;

// @Autowired
// public AuthController(IUserAccountService userAccountService) {
// this.userAccountService = userAccountService;
// }

// // 1. Verify Student (signup step 1)
// @PostMapping("/verify-student")
// public ResponseEntity<?> verifyStudent(@RequestParam String studentNumber,
// @RequestParam String idNumber) {
// try {
// String userId = userAccountService.verifyStudent(studentNumber, idNumber);
// // student exists and no account -> proceed to password setup
// return ResponseEntity.ok(userId);
// } catch (RuntimeException e) {
// String msg = e.getMessage();
// if (msg.contains("already exists")) {
// // User has account, ask frontend to redirect to login screen with message
// return ResponseEntity.status(409).body("You already have an account. Please
// log in.");
// } else if (msg.contains("No student found") || msg.contains("ID number does
// not match")) {
// // Not a student or ID mismatch
// return ResponseEntity.status(404).body("You are not a CPUT student. Please
// register on campus.");
// }
// return ResponseEntity.badRequest().body(msg);
// }
// }

// // 2. Complete signup by creating account with password
// @PostMapping("/signup")
// public ResponseEntity<?> completeSignup(@RequestParam String userId,
// @RequestParam String password, @RequestParam String confirmPassword) {
// if (!password.equals(confirmPassword)) {
// return ResponseEntity.badRequest().body("Passwords do not match.");
// }
// try {
// UserAccount account = userAccountService.completeSignup(userId, password);
// return ResponseEntity.ok(account);
// } catch (RuntimeException e) {
// return ResponseEntity.badRequest().body(e.getMessage());
// }
// }

// // 3. Login
// @PostMapping("/login")
// public ResponseEntity<?> login(@RequestParam String email, @RequestParam
// String password) {
// try {
// UserAccount account = userAccountService.login(email, password);
// return ResponseEntity.ok(account);
// } catch (RuntimeException e) {
// return ResponseEntity.status(401).body("Email or password is incorrect.");
// }
// }

// // 4. Change Password (optional)
// @PostMapping("/change-password")
// public ResponseEntity<?> changePassword(@RequestParam String email,
// @RequestParam String oldPassword,
// @RequestParam String newPassword,
// @RequestParam String confirmPassword) {
// if (!newPassword.equals(confirmPassword)) {
// return ResponseEntity.badRequest().body("New passwords do not match.");
// }
// try {
// UserAccount updatedAccount = userAccountService.changePassword(email,
// oldPassword, newPassword);
// return ResponseEntity.ok(updatedAccount);
// } catch (RuntimeException e) {
// return ResponseEntity.badRequest().body(e.getMessage());
// }
// }
// }