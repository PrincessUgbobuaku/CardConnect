package com.cardconnect.backend.repository;

import com.cardconnect.backend.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IUserRepository extends JpaRepository<User, String> {
        List<User> findByIdentificationNumber(String identificationNumber);

        List<User> findByUserIDAndIdentificationNumber(String userID, String identificationNumber);

}
