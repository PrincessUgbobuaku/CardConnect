package com.cardconnect.backend.domain;
import java.time.LocalDate;

import jakarta.persistence.Entity;

@Entity
public class Student extends User {

    private String department;
    private String degree;
    private String school;
    private int yearOfStudy;

    protected Student() {
        // JPA
    }

    private Student(Builder builder) {
        this.id = builder.id;  // Set inherited id here
        this.userId = builder.userId;
        this.role = builder.role;
        this.firstName = builder.firstName;
        this.lastName = builder.lastName;
        this.contactNumber = builder.contactNumber;
        this.gender = builder.gender;
        this.dateOfBirth = builder.dateOfBirth;
        this.idType = builder.idType;
        this.identificationNumber = builder.identificationNumber;
        this.agreedToTerms = builder.agreedToTerms;
        this.profilePhoto = builder.profilePhoto;
        this.department = builder.department;
        this.degree = builder.degree;
        this.school = builder.school;
        this.yearOfStudy = builder.yearOfStudy;
    }

    // Getters and setters for Student-specific fields

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getDegree() {
        return degree;
    }

    public void setDegree(String degree) {
        this.degree = degree;
    }

    public String getSchool() {
        return school;
    }

    public void setSchool(String school) {
        this.school = school;
    }

    public int getYearOfStudy() {
        return yearOfStudy;
    }

    public void setYearOfStudy(int yearOfStudy) {
        this.yearOfStudy = yearOfStudy;
    }

    // Builder class
    public static class Builder {
        private Long id;
        private String userId;
        private Role role;
        private String firstName;
        private String lastName;
        private String contactNumber;
        private char gender;
        private LocalDate dateOfBirth;
        private IDType idType;
        private String identificationNumber;
        private boolean agreedToTerms;
        private byte[] profilePhoto;

        private String department;
        private String degree;
        private String school;
        private int yearOfStudy;

        public Builder setId(Long id) {
            this.id = id;
            return this;
        }

        public Builder setUserId(String userId) {
            this.userId = userId;
            return this;
        }

        public Builder setRole(Role role) {
            this.role = role;
            return this;
        }

        public Builder setFirstName(String firstName) {
            this.firstName = firstName;
            return this;
        }

        public Builder setLastName(String lastName) {
            this.lastName = lastName;
            return this;
        }

        public Builder setContactNumber(String contactNumber) {
            this.contactNumber = contactNumber;
            return this;
        }

        public Builder setGender(char gender) {
            this.gender = gender;
            return this;
        }

        public Builder setDateOfBirth(LocalDate dateOfBirth) {
            this.dateOfBirth = dateOfBirth;
            return this;
        }

        public Builder setIdType(IDType idType) {
            this.idType = idType;
            return this;
        }

        public Builder setIdentificationNumber(String identificationNumber) {
            this.identificationNumber = identificationNumber;
            return this;
        }

        public Builder setAgreedToTerms(boolean agreedToTerms) {
            this.agreedToTerms = agreedToTerms;
            return this;
        }

        public Builder setProfilePhoto(byte[] profilePhoto) {
            this.profilePhoto = profilePhoto;
            return this;
        }

        public Builder setDepartment(String department) {
            this.department = department;
            return this;
        }

        public Builder setDegree(String degree) {
            this.degree = degree;
            return this;
        }

        public Builder setSchool(String school) {
            this.school = school;
            return this;
        }

        public Builder setYearOfStudy(int yearOfStudy) {
            this.yearOfStudy = yearOfStudy;
            return this;
        }

        public Builder copy(Student student) {
            this.id = student.getId();
            this.userId = student.getUserId();
            this.role = student.getRole();
            this.firstName = student.getFirstName();
            this.lastName = student.getLastName();
            this.contactNumber = student.getContactNumber();
            this.gender = student.getGender();
            this.dateOfBirth = student.getDateOfBirth();
            this.idType = student.getIdType();
            this.identificationNumber = student.getIdentificationNumber();
            this.agreedToTerms = student.isAgreedToTerms();
            this.profilePhoto = student.getProfilePhoto();
            this.department = student.getDepartment();
            this.degree = student.getDegree();
            this.school = student.getSchool();
            this.yearOfStudy = student.getYearOfStudy();
            return this;
        }

        public Student build() {
            return new Student(this);
        }
    }

    @Override
    public String toString() {
        return "Student{" +
                "id=" + id +
                ", userId='" + userId + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", department='" + department + '\'' +
                ", degree='" + degree + '\'' +
                ", school='" + school + '\'' +
                ", yearOfStudy=" + yearOfStudy +
                '}';
    }
}