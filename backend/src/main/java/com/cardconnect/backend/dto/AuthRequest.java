// package com.cardconnect.backend.dto;

// public class AuthRequest {
//     private String studentNumber;
//     private String idNumber;
//     private String password;

//     // No-arg constructor
//     public AuthRequest() {}

//     // All-args constructor
//     public AuthRequest(String studentNumber, String idNumber, String password) {
//         this.studentNumber = studentNumber;
//         this.idNumber = idNumber;
//         this.password = password;
//     }

//     // Getters and setters
//     public String getStudentNumber() {
//         return studentNumber;
//     }

//     public void setStudentNumber(String studentNumber) {
//         this.studentNumber = studentNumber;
//     }

//     public String getIdNumber() {
//         return idNumber;
//     }

//     public void setIdNumber(String idNumber) {
//         this.idNumber = idNumber;
//     }

//     public String getPassword() {
//         return password;
//     }

//     public void setPassword(String password) {
//         this.password = password;
//     }

//     // toString
//     @Override
//     public String toString() {
//         return "AuthRequest{" +
//                 "studentNumber='" + studentNumber + '\'' +
//                 ", idNumber='" + idNumber + '\'' +
//                 ", password='[PROTECTED]'" +
//                 '}';
//     }

//     // ✅ Builder Class
//     public static class Builder {
//         private String studentNumber;
//         private String idNumber;
//         private String password;

//         public Builder setStudentNumber(String studentNumber) {
//             this.studentNumber = studentNumber;
//             return this;
//         }

//         public Builder setIdNumber(String idNumber) {
//             this.idNumber = idNumber;
//             return this;
//         }

//         public Builder setPassword(String password) {
//             this.password = password;
//             return this;
//         }

//         public AuthRequest build() {
//             return new AuthRequest(studentNumber, idNumber, password);
//         }
//     }
// }