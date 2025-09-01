// package com.cardconnect.backend.dto;

// public class AuthResponse {
//     private String message;
//     private String token;

//     private String accountId;
//     private String email;
//     private String userID;
//     private String role;

//     // Constructors

//     public AuthResponse() {
//     }

//     public AuthResponse(String message) {
//         this.message = message;
//     }

//     public AuthResponse(String message, String token) {
//         this.message = message;
//         this.token = token;
//     }

//     public AuthResponse(String message, String token, String accountId, String email, String userID, String role) {
//         this.message = message;
//         this.token = token;
//         this.accountId = accountId;
//         this.email = email;
//         this.userID = userID;
//         this.role = role;
//     }

//     // Getters and Setters

//     public String getMessage() {
//         return message;
//     }

//     public void setMessage(String message) {
//         this.message = message;
//     }

//     public String getToken() {
//         return token;
//     }

//     public void setToken(String token) {
//         this.token = token;
//     }

//     public String getAccountId() {
//         return accountId;
//     }

//     public void setAccountId(String accountId) {
//         this.accountId = accountId;
//     }

//     public String getEmail() {
//         return email;
//     }

//     public void setEmail(String email) {
//         this.email = email;
//     }

//     public String getUserID() {
//         return userID;
//     }

//     public void setUserID(String userID) {
//         this.userID = userID;
//     }

//     public String getRole() {
//         return role;
//     }

//     public void setRole(String role) {
//         this.role = role;
//     }

//     // toString() method

//     @Override
//     public String toString() {
//         return "AuthResponse{" +
//                 "message='" + message + '\'' +
//                 ", token='" + token + '\'' +
//                 ", accountId='" + accountId + '\'' +
//                 ", email='" + email + '\'' +
//                 ", userID='" + userID + '\'' +
//                 ", role='" + role + '\'' +
//                 '}';
//     }

//     public static class Builder {
//         private String message;
//         private String token;
//         private String accountId;
//         private String email;
//         private String userID;
//         private String role;

//         public Builder setMessage(String message) {
//             this.message = message;
//             return this;
//         }

//         public Builder setToken(String token) {
//             this.token = token;
//             return this;
//         }

//         public Builder setAccountId(String accountId) {
//             this.accountId = accountId;
//             return this;
//         }

//         public Builder setEmail(String email) {
//             this.email = email;
//             return this;
//         }

//         public Builder setUserID(String userID) {
//             this.userID = userID;
//             return this;
//         }

//         public Builder setRole(String role) {
//             this.role = role;
//             return this;
//         }

//         public AuthResponse build() {
//             return new AuthResponse(message, token, accountId, email, userID, role);
//         }
//     }
// }