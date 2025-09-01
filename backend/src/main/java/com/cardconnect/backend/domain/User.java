package com.cardconnect.backend.domain;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "app_user") // Or something like "users"
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class User {

    @Id
    @Column(length = 9)
    /** studentNumber e.g. "218099999" */
    protected String userID;

    @Enumerated(EnumType.STRING)
    protected Role role;

    protected String firstName;
    protected String lastName;
    // protected String email;
    // protected String password;
    protected String contactNumber;
    protected char gender;
    protected LocalDate dateOfBirth;

    @Enumerated(EnumType.STRING)
    protected IDType idType;

    protected String identificationNumber;
    protected boolean agreedToTerms;

    @Lob
    protected byte[] profilePhoto;

    public enum IDType {
        SA_ID,
        PASSPORT
    }

    public enum Role {
        ROLE_STUDENT,
        ROLE_ADMIN
    }

    protected User() {
        // JPA
    }

    public String getUserID() {
        return userID;
    }

    public Role getRole() {
        return role;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    // public String getEmail() {
    // return email;
    // }

    // public String getPassword() {
    // return password;
    // }

    public String getContactNumber() {
        return contactNumber;
    }

    public char getGender() {
        return gender;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public IDType getIdType() {
        return idType;
    }

    public String getIdentificationNumber() {
        return identificationNumber;
    }

    public boolean isAgreedToTerms() {
        return agreedToTerms;
    }

    public byte[] getProfilePhoto() {
        return profilePhoto;
    }

    public String getInstitutionalEmail() {
        return this.userID + "@mycput.ac.za";
    }

    @Override
    public abstract String toString();

    public void setUserId(String userID) {
        this.userID = userID;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public void setGender(char gender) {
        this.gender = gender;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public void setIdType(IDType idType) {
        this.idType = idType;
    }

    public void setIdentificationNumber(String identificationNumber) {
        this.identificationNumber = identificationNumber;
    }

    public void setAgreedToTerms(boolean agreedToTerms) {
        this.agreedToTerms = agreedToTerms;
    }

    public void setProfilePhoto(byte[] profilePhoto) {
        this.profilePhoto = profilePhoto;
    }
}
