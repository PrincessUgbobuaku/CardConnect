package com.cardconnect.backend.service;

import com.cardconnect.backend.domain.Student;
import com.cardconnect.backend.domain.User.Role;
// import com.cardconnect.backend.security.TestPasswordEncoderConfig;

import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
// @Import(TestPasswordEncoderConfig.class)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class StudentServiceTest {

    @Autowired
    private StudentService studentService;

    private static Student student;

    @BeforeAll
    static void init() {
        student = new Student.Builder()
                .setUserID("STU000001")
                .setRole(Role.ROLE_STUDENT)
                .setFirstName("Patricia")
                .setLastName("Lemmington")
                .setContactNumber("0123456777")
                .setGender('F')
                .setDateOfBirth(LocalDate.of(2000, 1, 1))
                .setIdType(Student.IDType.SA_ID)
                .setIdentificationNumber("9001015555087")
                .setAgreedToTerms(true)
                .setDepartment("Computer Science")
                .setDegree("BSc IT")
                .setSchool("Engineering")
                .setYearOfStudy(3)
                .build();
    }

    @Test
    @Rollback(false)
    @Order(1)
    void testCreateStudent() {
        Student created = studentService.create(student);
        assertNotNull(created);
        assertEquals("STU000001", created.getUserID());
    }

    @Test
    @Rollback(false)

    @Order(2)
    void testReadStudent() {
        Student read = studentService.read("STU000001");
        assertNotNull(read);
        assertEquals(student.getFirstName(), read.getFirstName());
    }

    @Test
    @Rollback(false)

    @Order(3)
    void testUpdateStudent() {
        Student existing = studentService.read("STU000001");
        Student updated = new Student.Builder()
                .copy(existing)
                .setYearOfStudy(4)
                .build();

        Student saved = studentService.update(updated);
        assertNotNull(saved);
        assertEquals(4, saved.getYearOfStudy());
    }

    @Test
    @Rollback(false)
    @Order(4)
    void testGetAllStudents() {
        List<Student> all = studentService.getAllStudents();
        assertFalse(all.isEmpty());
        System.out.println("📚 Students in DB: " + all);
    }

    // @Test
    // @Order(5)
    // void testDeleteStudent() {
    // boolean deleted = studentService.delete("STU001");
    // assertTrue(deleted);
    // assertNull(studentService.read("STU001"));
    // }
}