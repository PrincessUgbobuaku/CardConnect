package com.cardconnect.backend.controller;

import com.cardconnect.backend.domain.Student;
import com.cardconnect.backend.dto.StudentProfileDTO;
import com.cardconnect.backend.service.IStudentService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/student-info")
public class StudentInfoController {

    private final IStudentService studentService;

    public StudentInfoController(IStudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping
    public StudentProfileDTO getStudentInfo(Authentication authentication) {
        String userId = (String) authentication.getPrincipal();
        Optional<Student> studentOpt = studentService.getByUserId(userId);
        if (studentOpt.isEmpty()) {
            throw new RuntimeException("Student not found");
        }
        Student student = studentOpt.get();
        // Map Student to StudentProfileDTO (adjust fields as needed)
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
                student.getInstitutionalEmail(),
                "ROLE_STUDENT");
    }
}
