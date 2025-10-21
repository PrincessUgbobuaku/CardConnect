package com.cardconnect.backend.factory;

import com.cardconnect.backend.domain.Admin;
import com.cardconnect.backend.dto.AdminSignupRequest;

import java.util.UUID;

public class AdminFactory {

    public static Admin create(AdminSignupRequest request, String encodedPassword) {
        // Generate userId automatically (e.g. ADM-<random 6 chars>)
        String generatedUserId = "ADM-" + UUID.randomUUID().toString().substring(0, 6).toUpperCase();

        return new Admin(
                generatedUserId,
                request.getFirstName(),
                request.getLastName(),
                request.getContactNumber(),
                request.getGender(),
                request.getDateOfBirth(),
                request.getIdType(),
                request.getIdentificationNumber(),
                request.isAgreedToTerms(),
                request.getEmail(),
                encodedPassword
        );
    }
}
