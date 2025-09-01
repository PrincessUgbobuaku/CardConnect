package com.cardconnect.backend.service;

import com.cardconnect.backend.domain.Student;
import com.cardconnect.backend.domain.User;
import com.cardconnect.backend.domain.UserAccount;
import com.cardconnect.backend.repository.IUserAccountRepository;
import com.cardconnect.backend.repository.IUserRepository;

import jakarta.transaction.Transactional;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.annotation.Rollback;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class UserAccountServiceTest {

    @Autowired
    private UserAccountService userAccountService;

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private IUserAccountRepository userAccountRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private static UserAccount userAccount;
    private static Student existingStudent;

    @BeforeAll
    static void setup(@Autowired IUserRepository userRepository,
                      @Autowired IUserAccountRepository userAccountRepository,
                      @Autowired PasswordEncoder passwordEncoder) {

        String studentNumber = "STU000005";
        String idNumber = "9001015000001";

        if (!userRepository.existsById(studentNumber)) {
            existingStudent = new Student.Builder()
                    .setUserID(studentNumber)
                    .setFirstName("Keagon")
                    .setLastName("Acton")
                    .setRole(User.Role.ROLE_STUDENT)
                    .setContactNumber("0823456777")
                    .setGender('F')
                    .setDateOfBirth(LocalDate.of(2003, 11, 29))
                    .setIdType(User.IDType.SA_ID)
                    .setIdentificationNumber(idNumber)
                    .setAgreedToTerms(true)
                    .setDepartment("Engineering")
                    .setDegree("BSc Electrical")
                    .setSchool("Science & Tech")
                    .setYearOfStudy(2)
                    .build();

            userRepository.save(existingStudent);
        } else {
            existingStudent = (Student) userRepository.findById(studentNumber).orElseThrow();
        }

        if (userAccountRepository.findAll().isEmpty()) {
            userAccount = new UserAccount.Builder()
                    .setAccountId("ACC000011")
                    .setEmail("jane.smith@example.com")
                    .setPasswordHash(passwordEncoder.encode("DogHorse123///"))
                    .setUser(existingStudent)
                    .build();

            userAccountRepository.save(userAccount);
        } else {
            userAccount = userAccountRepository.findAll().get(0);
        }
    }

    @Test
    @Order(1)
    @Rollback(false)
    void testCreate() {
        UserAccount created = userAccountService.create(userAccount);
        assertNotNull(created);
        assertEquals(userAccount.getEmail(), created.getEmail());
    }

    @Test
    @Order(2)
    void testRead() {
        List<UserAccount> allAccounts = userAccountService.getAllUserAccounts();
        assertFalse(allAccounts.isEmpty());

        String accountId = allAccounts.get(0).getAccountId();
        UserAccount read = userAccountService.read(accountId);

        assertNotNull(read);
        assertEquals(read.getEmail(), read.getEmail());
    }

    @Test
    @Order(3)
    void testUpdate() {
        List<UserAccount> all = userAccountService.getAllUserAccounts();
        UserAccount toUpdate = all.get(0);

        UserAccount updated = new UserAccount.Builder()
                .setAccountId(toUpdate.getAccountId())
                .setEmail("updated1.email@example.com")
                .setPasswordHash(toUpdate.getPasswordHash())
                .setUser(toUpdate.getUser())
                .setCreatedAt(toUpdate.getCreatedAt())
                .build();

        UserAccount result = userAccountService.update(updated);
        assertNotNull(result);
        assertEquals("updated1.email@example.com", result.getEmail());
    }

    @Test
    @Order(4)
    void testGetAll() {
        List<UserAccount> all = userAccountService.getAllUserAccounts();
        assertFalse(all.isEmpty());
    }

    @Test
    @Order(5)
    @Rollback(false)
    void testSignupFlow() {
        String studentNumber = "STU000006";
        String idNumber = "9901015009222";
        String password = "Default1111/";

        // Step 1: Seed student if not exists
        if (!userRepository.existsById(studentNumber)) {
            Student newStudent = new Student.Builder()
                    .setUserID(studentNumber)
                    .setFirstName("Brian")
                    .setLastName("Nono")
                    .setRole(User.Role.ROLE_STUDENT)
                    .setContactNumber("0834567333")
                    .setGender('M')
                    .setDateOfBirth(LocalDate.of(2001, 2, 2))
                    .setIdType(User.IDType.SA_ID)
                    .setIdentificationNumber(idNumber)
                    .setAgreedToTerms(true)
                    .setDepartment("Business")
                    .setDegree("BBA")
                    .setSchool("Commerce")
                    .setYearOfStudy(1)
                    .build();

            userRepository.save(newStudent);
        }

        // Step 2: verify student
        String userId = userAccountService.verifyStudent(studentNumber, idNumber);
        assertEquals(studentNumber, userId);

        // Step 3: complete signup with userId and password
        UserAccount createdAccount = userAccountService.completeSignup(userId, password);
        assertNotNull(createdAccount);

        // Email is generated from userId inside completeSignup
        String expectedEmail = userId + "@mycput.ac.za";
        assertEquals(expectedEmail, createdAccount.getEmail());
    }

    @Test
    @Order(6)
    void testLogin() {
        String email = "STU000006@mycput.ac.za";
        String password = "Default1111/";

        UserAccount loggedInAccount = userAccountService.login(email, password);
        assertNotNull(loggedInAccount);
        assertEquals(email, loggedInAccount.getEmail());
    }
}