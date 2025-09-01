package com.cardconnect.backend.domain;

import jakarta.persistence.Entity;
import java.time.LocalDate;

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
        this.userID = builder.userID;
        this.role = builder.role;

        this.firstName = builder.firstName;
        this.lastName = builder.lastName;
        // this.email = builder.email;
        // this.password = builder.password;
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

    public String getDepartment() {
        return department;
    }

    public String getDegree() {
        return degree;
    }

    public String getSchool() {
        return school;
    }

    public int getYearOfStudy() {
        return yearOfStudy;
    }


    @Override
    public String toString() {
        return "Student{" +
                "userID='" + userID + '\'' +
                ", role='" + role + '\'' + // ✅ Add this
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                // ", email='" + email + '\'' +
                ", contactNumber='" + contactNumber + '\'' +
                ", gender=" + gender +
                ", dateOfBirth=" + dateOfBirth +
                ", idType=" + idType +
                ", identificationNumber='" + identificationNumber + '\'' +
                ", department='" + department + '\'' +
                ", degree='" + degree + '\'' +
                ", school='" + school + '\'' +
                ", yearOfStudy=" + yearOfStudy +
                ", agreedToTerms=" + agreedToTerms +
                '}';
    }

    public static class Builder {
        private String userID;
        private Role role;
        private String firstName;
        private String lastName;
        // private String email;
        // private String password;
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

        public Builder setUserID(String userID) {
            this.userID = userID;
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

        // public Builder setEmail(String email) {
        // this.email = email;
        // return this;
        // }

        // public Builder setPassword(String password) {
        // this.password = password;
        // return this;
        // }

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
            this.userID = student.userID;
            this.role = student.role;
            this.firstName = student.firstName;
            this.lastName = student.lastName;
            // this.email = student.email;
            // this.password = student.password;
            this.contactNumber = student.contactNumber;
            this.gender = student.gender;
            this.dateOfBirth = student.dateOfBirth;
            this.idType = student.idType;
            this.identificationNumber = student.identificationNumber;
            this.agreedToTerms = student.agreedToTerms;
            this.profilePhoto = student.profilePhoto;

            this.department = student.department;
            this.degree = student.degree;
            this.school = student.school;
            this.yearOfStudy = student.yearOfStudy;
            return this;
        }

        public Student build() {
            return new Student(this);
        }
    }
}