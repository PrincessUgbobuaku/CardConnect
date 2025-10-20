package com.cardconnect.backend.service;


import com.cardconnect.backend.domain.Admin;
import com.cardconnect.backend.dto.AdminSignupRequest;
import com.cardconnect.backend.factory.AdminFactory;
import com.cardconnect.backend.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Admin signup(AdminSignupRequest request) {
        if (adminRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        String encodedPassword = passwordEncoder.encode(request.getPassword());
        Admin admin = AdminFactory.create(request, encodedPassword);
        return adminRepository.save(admin);
    }
}
