package com.cardconnect.backend.factory;

import com.cardconnect.backend.domain.Student;
import com.cardconnect.backend.domain.User.IDType;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

class StudentFactoryTest {

    @Test
    void createStudent_WithValidInput_ShouldCreateStudent() {
        Student student = StudentFactory.createStudent(
                "John",
                "Doe",
                "0123456789",
                'M',
                LocalDate.of(2000, 1, 15),
                IDType.PASSPORT,
                "A12345678",
                true,
                null, // profilePhoto can be null for test
                "Computer Science",
                "BSc",
                "University of Test",
                3);

        System.out.println("Created Student:");
        System.out.println("UserID: " + student.getUserID());
        System.out.println("First Name: " + student.getFirstName());
        System.out.println("Last Name: " + student.getLastName());
        System.out.println("Gender: " + student.getGender());
        System.out.println("Date of Birth: " + student.getDateOfBirth());
        System.out.println("ID Type: " + student.getIdType());
        System.out.println("Department: " + student.getDepartment());
        System.out.println("Year of Study: " + student.getYearOfStudy());

        assertNotNull(student, "Student should not be null with valid input");
        assertEquals("John", student.getFirstName());
        assertEquals("Doe", student.getLastName());
        assertEquals('M', student.getGender());
        assertEquals(IDType.PASSPORT, student.getIdType());
        assertEquals("Computer Science", student.getDepartment());
        assertTrue(student.isAgreedToTerms());
        assertNotNull(student.getUserID());
        assertEquals(9, student.getUserID().length(), "UserID length should be 9");
    }

    @Test
    void createStudent_WithEmptyFirstName_ShouldReturnNull() {
        Student student = StudentFactory.createStudent(
                "",
                "Doe",
                "0123456789",
                'M',
                LocalDate.of(2000, 1, 15),
                IDType.PASSPORT,
                "A12345678",
                true,
                null,
                "Computer Science",
                "BSc",
                "University of Test",
                3);

        assertNull(student, "Student should be null if firstName is empty");
    }

    @Test
    void createStudent_WithYearOfStudyZero_ShouldReturnNull() {
        Student student = StudentFactory.createStudent(
                "John",
                "Doe",
                "1234567890",
                'M',
                LocalDate.of(2000, 1, 15),
                IDType.PASSPORT,
                "A12345678",
                true,
                null,
                "Computer Science",
                "BSc",
                "University of Test",
                0 // invalid yearOfStudy
        );

        assertNull(student, "Student should be null if yearOfStudy is zero or less");
    }
}