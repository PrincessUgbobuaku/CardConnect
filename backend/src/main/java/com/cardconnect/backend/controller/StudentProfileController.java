package com.cardconnect.backend.controller;

import com.cardconnect.backend.domain.Student;
import com.cardconnect.backend.domain.UserAccount;
import com.cardconnect.backend.dto.StudentProfileDTO;
import com.cardconnect.backend.service.IStudentService;
import com.cardconnect.backend.repository.IUserAccountRepository;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

import org.springframework.http.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

@RestController
@RequestMapping("/api/profile")
public class StudentProfileController {

    private final IStudentService studentService;
    private final IUserAccountRepository accountRepository;

    public StudentProfileController(IStudentService studentService, IUserAccountRepository accountRepository) {
        this.studentService = studentService;
        this.accountRepository = accountRepository;
    }

    @GetMapping(value = "/{studentNumber}", produces = "application/json")
    public StudentProfileDTO getStudentProfile(@PathVariable String studentNumber) {
        // studentNumber is actually userId internally
        Student student = studentService.getByUserId(studentNumber)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Optional<UserAccount> userAccount = accountRepository.findByUser(student);
        String email = userAccount.map(UserAccount::getEmail).orElse(student.getInstitutionalEmail());

        // Set default role "STUDENT"
        String role = "ROLE_STUDENT";

        return new StudentProfileDTO(
                student.getId(),
                student.getUserId(),
                student.getFirstName(),
                student.getLastName(),
                student.getContactNumber(),
                student.getGender(),
                student.getDateOfBirth(),
                student.getDepartment(),
                student.getDegree(),
                student.getSchool(),
                student.getYearOfStudy(),
                email,
                role);
    }

    @PutMapping(value = "/{studentNumber}", consumes = "application/json")
    public void updateStudentProfile(
            @PathVariable String studentNumber,
            @RequestBody StudentProfileDTO updatedProfile) {
        // Find student
        Student student = studentService.getByUserId(studentNumber)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        // Update editable fields
        student.setContactNumber(updatedProfile.getContactNumber());

        // Optional: Update UserAccount email
        Optional<UserAccount> optionalAccount = accountRepository.findByUser(student);
        if (optionalAccount.isPresent()) {
            UserAccount existingAccount = optionalAccount.get();

            // Rebuild account with updated email using builder.copy()
            UserAccount updatedAccount = new UserAccount.Builder()
                    .copy(existingAccount)
                    .setEmail(updatedProfile.getEmail())
                    .build();

            accountRepository.save(updatedAccount);
        }

        // Save student
        studentService.update(student);
    }

    @PutMapping(value = "/{studentNumber}/photo", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> uploadProfilePhoto(
            @PathVariable String studentNumber,
            @RequestParam("file") MultipartFile file) {
        try {
            Student student = studentService.getByUserId(studentNumber)
                    .orElseThrow(() -> new RuntimeException("Student not found"));

            student.setProfilePhoto(file.getBytes());
            studentService.update(student); // <- Make sure this persists

            return ResponseEntity.ok("Photo uploaded successfully.");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error processing file: " + e.getMessage());
        }
    }

    @GetMapping(value = "/{studentNumber}/photo")
    public ResponseEntity<byte[]> getProfilePhoto(@PathVariable String studentNumber) {
        Student student = studentService.getByUserId(studentNumber)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        byte[] photo = student.getProfilePhoto();
        if (photo == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG) // Or IMAGE_PNG if needed
                .body(photo);
    }
}