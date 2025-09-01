package com.cardconnect.backend.service;

import com.cardconnect.backend.domain.Student;
import com.cardconnect.backend.repository.IStudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService implements IStudentService {

    private final IStudentRepository studentRepository;

    @Autowired
    public StudentService(IStudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @Override
    public Student create(Student student) {
        if (student == null) {
            throw new IllegalArgumentException("Student cannot be null");
        }
        return studentRepository.save(student);
    }

    @Override
    public Student read(String id) {
        return studentRepository.findById(id).orElse(null);
    }

    @Override
    public Student update(Student student) {
        if (student == null || !studentRepository.existsById(student.getUserID())) {
            return null;
        }
        return studentRepository.save(student);
    }

    @Override
    public boolean delete(String id) {
        if (studentRepository.existsById(id)) {
            studentRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }
}