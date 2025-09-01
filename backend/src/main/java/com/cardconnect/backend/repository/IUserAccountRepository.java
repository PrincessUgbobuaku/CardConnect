package com.cardconnect.backend.repository;

import com.cardconnect.backend.domain.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IUserAccountRepository extends JpaRepository<UserAccount, String> { // 🛠 Changed Long to String
    Optional<UserAccount> findByEmail(String email);

    Optional<UserAccount> findByUser_UserID(String userID);

}