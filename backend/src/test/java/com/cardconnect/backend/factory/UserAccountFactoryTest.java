package com.cardconnect.backend.factory;

import com.cardconnect.backend.domain.Student;
import com.cardconnect.backend.domain.User;
import com.cardconnect.backend.domain.UserAccount;
import com.cardconnect.backend.domain.User.IDType;
import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

class UserAccountFactoryTest {

    // 🔧 Helper method to create a mock Student (User)
    private User createMockUser() {
        return new Student.Builder()
                .setUserId("STU123456")
                .setFirstName("Test")
                .setLastName("User")
                .setContactNumber("0123456789")
                .setGender('M')
                .setDateOfBirth(LocalDate.of(2003, 1, 1))
                .setIdType(IDType.SA_ID)
                .setIdentificationNumber("9001015009087")
                .setAgreedToTerms(true)
                .setDepartment("Engineering")
                .setDegree("BSc")
                .setSchool("UCT")
                .setYearOfStudy(3)
                .build();
    }

    // 🔐 Mock PasswordEncoder
    private final PasswordEncoder mockEncoder = new PasswordEncoder() {
        @Override
        public String encode(CharSequence rawPassword) {
            return "hashed_" + rawPassword;
        }

        @Override
        public boolean matches(CharSequence rawPassword, String encodedPassword) {
            return ("hashed_" + rawPassword).equals(encodedPassword);
        }
    };

    @Test
    void createUserAccount_WithValidInput_ShouldCreateAccount() {
        System.out.println("🧪 Running createUserAccount_WithValidInput_ShouldCreateAccount");

        User user = createMockUser();
        System.out.println("✅ Created mock user: " + user.getUserId());

        String hashedPassword = mockEncoder.encode("SecurePass123");
        System.out.println("🔐 Hashed password: " + hashedPassword);

        UserAccount account = UserAccountFactory.createUserAccount(
                "student123@mycput.ac.za",
                hashedPassword,
                user);

        System.out.println("🧾 Created account: " + account);

        assertNotNull(account);
        assertEquals("student123@mycput.ac.za", account.getEmail());
        assertEquals("hashed_SecurePass123", account.getPasswordHash());
        assertEquals(user, account.getUser());
        assertNotNull(account.getCreatedAt());

        System.out.println("✅ Test passed.\n");
    }

    @Test
    void createUserAccount_WithInvalidEmail_ShouldReturnNull() {
        System.out.println("🧪 Running createUserAccount_WithInvalidEmail_ShouldReturnNull");

        User user = createMockUser();
        String hashedPassword = mockEncoder.encode("SecurePass123");

        UserAccount account = UserAccountFactory.createUserAccount(
                "invalid-email", // invalid
                hashedPassword,
                user);

        System.out.println("🧾 Created account: " + account);
        assertNull(account, "Account should be null due to invalid email");

        System.out.println("✅ Test passed.\n");
    }

    @Test
    void createUserAccount_WithEmptyPasswordHash_ShouldReturnNull() {
        System.out.println("🧪 Running createUserAccount_WithEmptyPasswordHash_ShouldReturnNull");

        User user = createMockUser();

        UserAccount account = UserAccountFactory.createUserAccount(
                "student123@mycput.ac.za",
                "", // empty password hash
                user);

        System.out.println("🧾 Created account: " + account);
        assertNull(account, "Account should be null due to empty password hash");

        System.out.println("✅ Test passed.\n");
    }

    @Test
    void createUserAccount_WithNullUser_ShouldReturnNull() {
        System.out.println("🧪 Running createUserAccount_WithNullUser_ShouldReturnNull");

        String hashedPassword = mockEncoder.encode("SecurePass123");

        UserAccount account = UserAccountFactory.createUserAccount(
                "student123@mycput.ac.za",
                hashedPassword,
                null // null user
        );

        System.out.println("🧾 Created account: " + account);
        assertNull(account, "Account should be null due to null user");

        System.out.println("✅ Test passed.\n");
    }
}