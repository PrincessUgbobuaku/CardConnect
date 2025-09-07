package com.cardconnect.backend.repository;

import com.cardconnect.backend.domain.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IStudentRepository extends JpaRepository<Student, Long> {

    Optional<Student> findByUserId(String userId);

    Optional<Student> findByUserIdAndIdentificationNumber(String userId, String identificationNumber);

    boolean existsByUserId(String userId);

    

}