package com.cardconnect.backend.service;

import com.cardconnect.backend.domain.Student;
import com.cardconnect.backend.domain.User.Role;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class StudentServiceTest {

    @Autowired
    private StudentService studentService;

    private static Student student;

    @BeforeAll
    static void setup() {
        student = new Student.Builder()
                .setUserId("STU000006")
                .setRole(Role.ROLE_STUDENT)
                .setFirstName("Tisha")
                .setLastName("Anderson")
                .setContactNumber("0123444333")
                .setGender('F')
                .setDateOfBirth(LocalDate.of(2002, 4, 13))
                .setIdType(Student.IDType.SA_ID)
                .setIdentificationNumber("9331555575087")
                .setAgreedToTerms(true)
                .setDepartment("Computer Science")
                .setDegree("BSc IT")
                .setSchool("Engineering")
                .setYearOfStudy(1)
                .build();
    }

    @Test
    @Order(1)
    @Rollback(false) // Keep data for next tests
    void testCreateStudent() {
        student = studentService.create(student); // Save the created student with ID
        assertNotNull(student);
        assertEquals("STU000006", student.getUserId());
    }

    @Test
    @Order(2)
    void testReadStudent() {
        Student read = studentService.read(student.getId()); // Use dynamic ID
        assertNotNull(read);
        assertEquals("Tisha", read.getFirstName()); // Updated to match the test student
    }

    @Test
    @Order(3)
    @Rollback(false)
    void testUpdateStudent() {
        Student existing = studentService.read(student.getId()); // Use dynamic ID
        Student updated = new Student.Builder()
                .copy(existing)
                .setYearOfStudy(3)
                .build();

        updated.setId(existing.getId()); // Ensure ID is set for update

        Student saved = studentService.update(updated);
        assertEquals(3, saved.getYearOfStudy()); // Check correct year
    }

    @Test
    @Order(4)
    void testGetAllStudents() {
        List<Student> all = studentService.getAllStudents();
        assertFalse(all.isEmpty());
        System.out.println("Students in DB: " + all.size());
    }

    // Uncomment if delete functionality is needed
    // @Test
    // @Order(5)
    // @Rollback(false)
    // void testDeleteStudent() {
    //     boolean deleted = studentService.delete(student.getUserId());
    //     assertTrue(deleted);
    //     assertNull(studentService.read(student.getId()));
    // }

    @Test
    @Order(6)
    void testVerifyStudentIdentity() {
        // Positive case: matching studentNumber and identificationNumber
        Optional<Student> studentOpt = studentService.verifyStudentIdentity("STU000006", "9331555575087");
        assertTrue(studentOpt.isPresent());
        assertEquals("STU000006", studentOpt.get().getUserId());

        // Negative case: wrong identificationNumber
        Optional<Student> wrongIdOpt = studentService.verifyStudentIdentity("STU000006", "WRONGID123456");
        assertTrue(wrongIdOpt.isEmpty());

        // Negative case: non-existent studentNumber
        Optional<Student> nonExistentOpt = studentService.verifyStudentIdentity("NONEXISTENT", "9331015675087");
        assertTrue(nonExistentOpt.isEmpty());
    }
}

// // package com.cardconnect.backend.service;

// // import com.cardconnect.backend.domain.Student;
// // import com.cardconnect.backend.domain.User.Role;
// // // import com.cardconnect.backend.security.TestPasswordEncoderConfig;

// // import org.junit.jupiter.api.*;
// // import org.springframework.beans.factory.annotation.Autowired;
// // import org.springframework.boot.test.context.SpringBootTest;
// // import org.springframework.test.annotation.Rollback;

// // import java.time.LocalDate;
// // import java.util.List;

// // import static org.junit.jupiter.api.Assertions.*;

// // @SpringBootTest
// // // @Import(TestPasswordEncoderConfig.class)
// // @TestMethodOrder(MethodOrderer.OrderAnnotation.class)
// // class StudentServiceTest {

// // @Autowired
// // private StudentService studentService;

// // private static Student student;

// // @BeforeAll
// // static void init() {
// // student = new Student.Builder()
// // .setUserID("STU000001")
// // .setRole(Role.ROLE_STUDENT)
// // .setFirstName("Patricia")
// // .setLastName("Lemmington")
// // .setContactNumber("0123456777")
// // .setGender('F')
// // .setDateOfBirth(LocalDate.of(2000, 1, 1))
// // .setIdType(Student.IDType.SA_ID)
// // .setIdentificationNumber("9001015555087")
// // .setAgreedToTerms(true)
// // .setDepartment("Computer Science")
// // .setDegree("BSc IT")
// // .setSchool("Engineering")
// // .setYearOfStudy(3)
// // .build();
// // }

// // @Test
// // @Rollback(false)
// // @Order(1)
// // void testCreateStudent() {
// // Student created = studentService.create(student);
// // assertNotNull(created);
// // assertEquals("STU000001", created.getUserID());
// // }

// // @Test
// // @Rollback(false)

// // @Order(2)
// // void testReadStudent() {
// // Student read = studentService.read("STU000001");
// // assertNotNull(read);
// // assertEquals(student.getFirstName(), read.getFirstName());
// // }

// // @Test
// // @Rollback(false)

// // @Order(3)
// // void testUpdateStudent() {
// // Student existing = studentService.read("STU000001");
// // Student updated = new Student.Builder()
// // .copy(existing)
// // .setYearOfStudy(4)
// // .build();

// // Student saved = studentService.update(updated);
// // assertNotNull(saved);
// // assertEquals(4, saved.getYearOfStudy());
// // }

// // @Test
// // @Rollback(false)
// // @Order(4)
// // void testGetAllStudents() {
// // List<Student> all = studentService.getAllStudents();
// // assertFalse(all.isEmpty());
// // System.out.println("📚 Students in DB: " + all);
// // }

// // // @Test
// // // @Order(5)
// // // void testDeleteStudent() {
// // // boolean deleted = studentService.delete("STU001");
// // // assertTrue(deleted);
// // // assertNull(studentService.read("STU001"));
// // // }
// // }