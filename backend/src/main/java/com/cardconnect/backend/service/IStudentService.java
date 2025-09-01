package com.cardconnect.backend.service;

import com.cardconnect.backend.domain.Student;
import java.util.List;

public interface IStudentService extends IService<Student, String> {
        List<Student> getAllStudents();
}
