// package com.cardconnect.backend.dto;

// import java.time.LocalDate;

// public class StudentDTO {
//     private String userID;
//     private String firstName;
//     private String lastName;
//     private String contactNumber;
//     private char gender;
//     private LocalDate dateOfBirth;
//     private String idType; // SA_ID or PASSPORT as String
//     private String identificationNumber;
//     private boolean agreedToTerms;

//     private String department;
//     private String degree;
//     private String school;
//     private int yearOfStudy;

//     // No-arg constructor
//     public StudentDTO() {}

//     // All-args constructor
//     public StudentDTO(String userID, String firstName, String lastName, String contactNumber, char gender,
//                       LocalDate dateOfBirth, String idType, String identificationNumber, boolean agreedToTerms,
//                       String department, String degree, String school, int yearOfStudy) {
//         this.userID = userID;
//         this.firstName = firstName;
//         this.lastName = lastName;
//         this.contactNumber = contactNumber;
//         this.gender = gender;
//         this.dateOfBirth = dateOfBirth;
//         this.idType = idType;
//         this.identificationNumber = identificationNumber;
//         this.agreedToTerms = agreedToTerms;
//         this.department = department;
//         this.degree = degree;
//         this.school = school;
//         this.yearOfStudy = yearOfStudy;
//     }

//     // Getters and setters
//     public String getUserID() {
//         return userID;
//     }

//     public void setUserID(String userID) {
//         this.userID = userID;
//     }

//     public String getFirstName() {
//         return firstName;
//     }

//     public void setFirstName(String firstName) {
//         this.firstName = firstName;
//     }

//     public String getLastName() {
//         return lastName;
//     }

//     public void setLastName(String lastName) {
//         this.lastName = lastName;
//     }

//     public String getContactNumber() {
//         return contactNumber;
//     }

//     public void setContactNumber(String contactNumber) {
//         this.contactNumber = contactNumber;
//     }

//     public char getGender() {
//         return gender;
//     }

//     public void setGender(char gender) {
//         this.gender = gender;
//     }

//     public LocalDate getDateOfBirth() {
//         return dateOfBirth;
//     }

//     public void setDateOfBirth(LocalDate dateOfBirth) {
//         this.dateOfBirth = dateOfBirth;
//     }

//     public String getIdType() {
//         return idType;
//     }

//     public void setIdType(String idType) {
//         this.idType = idType;
//     }

//     public String getIdentificationNumber() {
//         return identificationNumber;
//     }

//     public void setIdentificationNumber(String identificationNumber) {
//         this.identificationNumber = identificationNumber;
//     }

//     public boolean isAgreedToTerms() {
//         return agreedToTerms;
//     }

//     public void setAgreedToTerms(boolean agreedToTerms) {
//         this.agreedToTerms = agreedToTerms;
//     }

//     public String getDepartment() {
//         return department;
//     }

//     public void setDepartment(String department) {
//         this.department = department;
//     }

//     public String getDegree() {
//         return degree;
//     }

//     public void setDegree(String degree) {
//         this.degree = degree;
//     }

//     public String getSchool() {
//         return school;
//     }

//     public void setSchool(String school) {
//         this.school = school;
//     }

//     public int getYearOfStudy() {
//         return yearOfStudy;
//     }

//     public void setYearOfStudy(int yearOfStudy) {
//         this.yearOfStudy = yearOfStudy;
//     }

//     @Override
//     public String toString() {
//         return "StudentDTO{" +
//                 "userID='" + userID + '\'' +
//                 ", firstName='" + firstName + '\'' +
//                 ", lastName='" + lastName + '\'' +
//                 ", contactNumber='" + contactNumber + '\'' +
//                 ", gender=" + gender +
//                 ", dateOfBirth=" + dateOfBirth +
//                 ", idType='" + idType + '\'' +
//                 ", identificationNumber='" + identificationNumber + '\'' +
//                 ", agreedToTerms=" + agreedToTerms +
//                 ", department='" + department + '\'' +
//                 ", degree='" + degree + '\'' +
//                 ", school='" + school + '\'' +
//                 ", yearOfStudy=" + yearOfStudy +
//                 '}';
//     }
// }