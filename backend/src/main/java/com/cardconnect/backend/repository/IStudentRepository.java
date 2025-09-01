package com.cardconnect.backend.repository;

import com.cardconnect.backend.domain.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IStudentRepository extends JpaRepository<Student, String> {
    // You can add custom query methods here if needed later.
}