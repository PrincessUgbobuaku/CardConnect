package com.cardconnect.backend.service;

import com.cardconnect.backend.domain.User;
import com.cardconnect.backend.domain.UserAccount;
import com.cardconnect.backend.repository.IUserAccountRepository;
import com.cardconnect.backend.repository.IUserRepository;
import com.cardconnect.backend.util.Helper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserAccountService implements IUserAccountService {

    private final IUserAccountRepository userAccountRepository;
    private final IUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserAccountService(IUserAccountRepository userAccountRepository,
            IUserRepository userRepository,
            PasswordEncoder passwordEncoder) {
        this.userAccountRepository = userAccountRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * STEP 1: Verify that a student with matching studentNumber (userID) and
     * idNumber exists,
     * and does not already have an account.
     * Returns the userID on success.
     */
    public String verifyStudent(String studentNumber, String idNumber) {
        // Fetch user by studentNumber (userID)
        User user = userRepository.findById(studentNumber)
                .orElseThrow(() -> new RuntimeException("No student found with that student number."));

        // Check if the ID number matches
        if (!user.getIdentificationNumber().equals(idNumber)) {
            throw new RuntimeException("ID number does not match student record.");
        }

        // Check if user already has an account
        if (userAccountRepository.findByUser_UserID(studentNumber).isPresent()) {
            throw new RuntimeException("An account already exists for this student.");
        }

        return user.getUserID(); // Return userID for client to use in signup
    }

    /**
     * STEP 2: Complete signup by creating account with password.
     * Requires userID verified from previous step.
     */
    public UserAccount completeSignup(String userID, String password) {
        if (!Helper.isValidPassword(password)) {
            throw new RuntimeException("Weak password");
        }

        User user = userRepository.findById(userID)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (userAccountRepository.findByUser_UserID(userID).isPresent()) {
            throw new RuntimeException("Account already exists for this student");
        }

        String email = user.getInstitutionalEmail(); // get email from user record
        String hashedPassword = passwordEncoder.encode(password);

        UserAccount account = new UserAccount.Builder()
                .setAccountId(Helper.generateID())
                .setEmail(email)
                .setPasswordHash(hashedPassword)
                .setUser(user)
                .build();

        return userAccountRepository.save(account);
    }

    /**
     * LOGIN: Authenticate user by email and password
     */
    public UserAccount login(String email, String rawPassword) {
        UserAccount account = userAccountRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Email or password is incorrect"));

        if (!passwordEncoder.matches(rawPassword, account.getPasswordHash())) {
            throw new RuntimeException("Email or password is incorrect");
        }

        return account;
    }

    // CRUD methods
    @Override
    public UserAccount create(UserAccount userAccount) {
        return userAccountRepository.save(userAccount);
    }

    @Override
    public UserAccount read(String accountId) {
        return userAccountRepository.findById(accountId).orElse(null);
    }

    @Override
    public UserAccount update(UserAccount userAccount) {
        if (userAccount == null || !userAccountRepository.existsById(userAccount.getAccountId())) {
            return null;
        }
        return userAccountRepository.save(userAccount);
    }

    @Override
    public boolean delete(String accountId) {
        if (userAccountRepository.existsById(accountId)) {
            userAccountRepository.deleteById(accountId);
            return true;
        }
        return false;
    }

    @Override
    public List<UserAccount> getAllUserAccounts() {
        return userAccountRepository.findAll();
    }
}