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

    @Override
    public boolean accountExistsForUserId(String userId) {
        return userAccountRepository.findByUser_UserId(userId).isPresent();
    }

    @Override
    public UserAccount completeSignup(String userId, String password) {
        if (!Helper.isValidPassword(password)) {
            throw new RuntimeException("Weak password");
        }

        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (accountExistsForUserId(userId)) {
            throw new RuntimeException("Account already exists for this student");
        }

        String email = user.getInstitutionalEmail();
        String hashedPassword = passwordEncoder.encode(password);

        UserAccount account = new UserAccount.Builder()
                .setEmail(email)
                .setPasswordHash(hashedPassword)
                .setUser(user)
                .build();

        return userAccountRepository.save(account);
    }

    @Override
    public UserAccount login(String email, String rawPassword) {
        UserAccount account = userAccountRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Email or password is incorrect"));

        if (!passwordEncoder.matches(rawPassword, account.getPasswordHash())) {
            throw new RuntimeException("Email or password is incorrect");
        }

        return account;
    }

    @Override
    public UserAccount changePassword(String email, String oldPassword, String newPassword) {
        UserAccount account = userAccountRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Account not found"));

        if (!passwordEncoder.matches(oldPassword, account.getPasswordHash())) {
            throw new RuntimeException("Old password is incorrect");
        }

        if (!Helper.isValidPassword(newPassword)) {
            throw new RuntimeException("New password does not meet complexity requirements");
        }

        String hashedNewPassword = passwordEncoder.encode(newPassword);

        UserAccount updatedAccount = new UserAccount.Builder()
                .copy(account)
                .setPasswordHash(hashedNewPassword)
                .build();

        return userAccountRepository.save(updatedAccount);
    }

    @Override
    public UserAccount create(UserAccount userAccount) {
        return userAccountRepository.save(userAccount);
    }

    @Override
    public UserAccount read(Long accountId) {
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
    public boolean delete(Long accountId) {
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



// package com.cardconnect.backend.service;

// import com.cardconnect.backend.domain.User;
// import com.cardconnect.backend.domain.UserAccount;
// import com.cardconnect.backend.repository.IUserAccountRepository;
// import com.cardconnect.backend.repository.IUserRepository;
// import com.cardconnect.backend.util.Helper;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.core.context.SecurityContextHolder;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.stereotype.Service;

// import java.util.List;

// @Service
// public class UserAccountService implements IUserAccountService {

//     private final IUserAccountRepository userAccountRepository;
//     private final IUserRepository userRepository;
//     private final PasswordEncoder passwordEncoder;

//     @Autowired
//     public UserAccountService(IUserAccountRepository userAccountRepository,
//             IUserRepository userRepository,
//             PasswordEncoder passwordEncoder) {
//         this.userAccountRepository = userAccountRepository;
//         this.userRepository = userRepository;
//         this.passwordEncoder = passwordEncoder;
//     }

//     /**
//      * STEP 1: Verify that a student with matching studentNumber (userID) and
//      * idNumber exists, and does not already have an account.
//      * Returns the userID on success.
//      */
//     public String verifyStudent(String studentNumber, String idNumber) {
//         // Use custom finder by userId (String)
//         User user = userRepository.findByUserId(studentNumber)
//                 .orElseThrow(() -> new RuntimeException("No student found with that student number."));

//         // Check if the ID number matches
//         if (!user.getIdentificationNumber().equals(idNumber)) {
//             throw new RuntimeException("ID number does not match student record.");
//         }

//         // Check if user already has an account
//         if (userAccountRepository.findByUser_UserId(studentNumber).isPresent()) {
//             throw new RuntimeException("An account already exists for this student.");
//         }

//         return user.getUserId(); // Return userId (e.g., STU000003)
//     }

//     /**
//      * STEP 2: Complete signup by creating account with password.
//      * Requires userId verified from previous step.
//      */
//     public UserAccount completeSignup(String userId, String password) {
//         if (!Helper.isValidPassword(password)) {
//             throw new RuntimeException("Weak password");
//         }

//         User user = userRepository.findByUserId(userId)
//                 .orElseThrow(() -> new RuntimeException("User not found"));

//         if (userAccountRepository.findByUser_UserId(userId).isPresent()) {
//             throw new RuntimeException("Account already exists for this student");
//         }

//         String email = user.getInstitutionalEmail(); // e.g., STU000003@mycput.ac.za
//         String hashedPassword = passwordEncoder.encode(password);

//         UserAccount account = new UserAccount.Builder()
//                 .setEmail(email)
//                 .setPasswordHash(hashedPassword)
//                 .setUser(user)
//                 .build(); // accountId is generated automatically

//         return userAccountRepository.save(account);
//     }

//     /**
//      * LOGIN: Authenticate user by email and password
//      */
//     public UserAccount login(String email, String rawPassword) {
//         UserAccount account = userAccountRepository.findByEmail(email)
//                 .orElseThrow(() -> new RuntimeException("Email or password is incorrect"));

//         if (!passwordEncoder.matches(rawPassword, account.getPasswordHash())) {
//             throw new RuntimeException("Email or password is incorrect");
//         }

//         return account;
//     }

//     /**
//      * Change password for a given account.
//      * Validates old password, checks new password strength,
//      * then updates the password hash.
//      */
//     public UserAccount changePassword(String email, String oldPassword, String newPassword) {
//         UserAccount account = userAccountRepository.findByEmail(email)
//                 .orElseThrow(() -> new RuntimeException("Account not found"));

//         if (!passwordEncoder.matches(oldPassword, account.getPasswordHash())) {
//             throw new RuntimeException("Old password is incorrect");
//         }

//         if (!Helper.isValidPassword(newPassword)) {
//             throw new RuntimeException("New password does not meet complexity requirements");
//         }

//         String hashedNewPassword = passwordEncoder.encode(newPassword);

//         UserAccount updatedAccount = new UserAccount.Builder()
//                 .copy(account)
//                 .setPasswordHash(hashedNewPassword)
//                 .build();

//         return userAccountRepository.save(updatedAccount);
//     }

//     // CRUD methods
//     @Override
//     public UserAccount create(UserAccount userAccount) {
//         return userAccountRepository.save(userAccount);
//     }

//     @Override
//     public UserAccount read(Long accountId) {
//         return userAccountRepository.findById(accountId).orElse(null);
//     }

//     @Override
//     public UserAccount update(UserAccount userAccount) {
//         if (userAccount == null || !userAccountRepository.existsById(userAccount.getAccountId())) {
//             return null;
//         }
//         return userAccountRepository.save(userAccount);
//     }

//     @Override
//     public boolean delete(Long accountId) {
//         if (userAccountRepository.existsById(accountId)) {
//             userAccountRepository.deleteById(accountId);
//             return true;
//         }
//         return false;
//     }

//     @Override
//     public List<UserAccount> getAllUserAccounts() {
//         return userAccountRepository.findAll();
//     }
// }