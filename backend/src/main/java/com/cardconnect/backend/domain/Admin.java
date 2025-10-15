package com.cardconnect.backend.domain;




import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "admin_user")
public class Admin extends User {

    private String email;
    private String password;

    public Admin() {
        this.role = Role.ROLE_ADMIN;
    }

    public Admin(String userId, String firstName, String lastName, String contactNumber,
                 char gender, java.time.LocalDate dateOfBirth, IDType idType, String identificationNumber,
                 boolean agreedToTerms, String email, String password) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.contactNumber = contactNumber;
        this.gender = gender;
        this.dateOfBirth = dateOfBirth;
        this.idType = idType;
        this.identificationNumber = identificationNumber;
        this.agreedToTerms = agreedToTerms;
        this.email = email;
        this.password = password;
        this.role = Role.ROLE_ADMIN;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "Admin{" +
                "id=" + id +
                ", userId='" + userId + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}
