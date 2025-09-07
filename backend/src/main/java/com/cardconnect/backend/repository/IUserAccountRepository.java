package com.cardconnect.backend.repository;

import com.cardconnect.backend.domain.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.cardconnect.backend.domain.User;

import java.util.Optional;

@Repository
public interface IUserAccountRepository extends JpaRepository<UserAccount, Long> {
    Optional<UserAccount> findByEmail(String email);

    Optional<UserAccount> findByUser_UserId(String userId); // This is great for quick lookup

    Optional<UserAccount> findByUser(User user);

}