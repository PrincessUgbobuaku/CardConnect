package com.cardconnect.backend.domain;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class UserAccount {

    @Id
    private String accountId; // ✅ Use String, not Long

    private String email;
    private String passwordHash;
    private LocalDateTime createdAt;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "userID")
    private User user;

    protected UserAccount() {
        // JPA requires no-arg constructor
    }

    private UserAccount(Builder builder) {
        this.accountId = builder.accountId;
        this.email = builder.email;
        this.passwordHash = builder.passwordHash;
        this.user = builder.user;
        this.createdAt = builder.createdAt != null ? builder.createdAt : LocalDateTime.now();
    }

    public String getAccountId() {
        return accountId;
    }

    public String getEmail() {
        return email;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public User getUser() {
        return user;
    }

    @Override
    public String toString() {
        return "UserAccount{" +
                "accountId='" + accountId + '\'' +
                ", email='" + email + '\'' +
                ", createdAt=" + createdAt +
                ", user=" + (user != null ? user.getUserID() : null) +
                '}';
    }

    // ✅ Builder Class
    public static class Builder {
        private String accountId;
        private String email;
        private String passwordHash;
        private LocalDateTime createdAt;
        private User user;

        public Builder setAccountId(String accountId) {
            this.accountId = accountId;
            return this;
        }

        public Builder setEmail(String email) {
            this.email = email;
            return this;
        }

        public Builder setPasswordHash(String passwordHash) {
            this.passwordHash = passwordHash;
            return this;
        }

        public Builder setCreatedAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public Builder setUser(User user) {
            this.user = user;
            return this;
        }

        public Builder copy(UserAccount userAccount) {
            this.accountId = userAccount.getAccountId();
            this.email = userAccount.getEmail();
            this.passwordHash = userAccount.getPasswordHash();
            this.createdAt = userAccount.getCreatedAt();
            this.user = userAccount.getUser();
            return this;
        }

        public UserAccount build() {
            return new UserAccount(this);
        }
    }
}