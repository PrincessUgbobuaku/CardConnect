package com.cardconnect.backend.repository;

import com.cardconnect.backend.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IUserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUserId(String userId);

    Optional<User> findByUserIdAndIdentificationNumber(String userId, String identificationNumber);
}