package com.cardconnect.backend.service;

import com.cardconnect.backend.domain.Student;
import java.util.List;
import java.util.Optional;

public interface IStudentService extends IService<Student, Long> {
    List<Student> getAllStudents();

    Optional<Student> verifyStudentIdentity(String studentNumber, String identificationNumber);

    Optional<Student> findByUserId(String userId);

    Optional<Student> getByUserId(String userId);  // <- Added for clarity


}

// package com.cardconnect.backend.service;

// import com.cardconnect.backend.domain.Student;
// import java.util.List;

// public interface IStudentService extends IService<Student, Long> {
//         List<Student> getAllStudents();
// }
