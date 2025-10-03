package com.cardconnect.backend.util;

import java.time.LocalDate;
import java.time.Period;
import java.util.UUID;
import java.util.regex.Pattern;
import java.util.Random;

import com.cardconnect.backend.domain.User.IDType;

public class Helper {


    private static final Random RANDOM = new Random();

    // Generates a random unique ID, you can customize format if needed
    public static String generateID() {
        return UUID.randomUUID().toString().replace("-", "").substring(0, 9).toUpperCase();
    }

    public static String generateUserID(LocalDate dob) {
        String year = String.valueOf(dob.getYear()).substring(2); // last 2 digits of year
        String month = String.format("%02d", dob.getMonthValue());
        String day = String.format("%02d", dob.getDayOfMonth());

        // Random 3-digit number (000-999)
        int randNum = RANDOM.nextInt(1000);
        String randomDigits = String.format("%03d", randNum);

        return year + month + day + randomDigits;
    }

    public static boolean isValidString(String name) {
        if (name == null || name.trim().isEmpty()) {
            return false;
        }

        // Regex: only letters, spaces, or hyphens.
        return name.matches("^[A-Za-z\\s'-]{2,50}$");
    }

    private static final Pattern EMAIL_PATTERN = Pattern.compile(
            "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$");

    // Basic email validation
    public static boolean isValidEmail(String email) {
        return email != null && EMAIL_PATTERN.matcher(email).matches();
    }

    public static boolean isInstitutionEmail(String email) {
        return isValidEmail(email) && email.toLowerCase().endsWith("@mycput.ac.za");
    }

    // Check if a string is non-null and non-empty
    public static boolean isNotEmpty(String value) {
        return value != null && !value.trim().isEmpty();
    }

    // Validate User ID length (e.g. 9 characters)
    public static boolean isValidUserID(String userID) {
        return userID != null && userID.length() == 9;
    }

    // Add more validation methods as needed...

    public static boolean isValidPassword(String password) {
        if (password == null || password.trim().isEmpty()) {
            return false;
        }

        // At least 8 characters, 1 lowercase, 1 uppercase, 1 digit
        String pattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$";
        return password.matches(pattern);
    }

    public static boolean isValidContactNumber(String contactNumber) {
        if (contactNumber == null || contactNumber.trim().isEmpty()) {
            return false;
        }

        // Must be exactly 10 digits, starting with 0
        return contactNumber.matches("^0\\d{9}$");
    }

    public static boolean isValidDateOfBirth(LocalDate dateOfBirth) {
        if (dateOfBirth == null) {
            return false;
        }

        LocalDate today = LocalDate.now();

        // 1. Must not be in the future
        if (dateOfBirth.isAfter(today)) {
            return false;
        }

        // 2. Must be at least 16 years old (you can adjust this)
        int minimumAge = 17;
        int age = Period.between(dateOfBirth, today).getYears();

        return age >= minimumAge;
    }

    public static boolean isValidIdType(IDType idType) {
        if (idType == null) {
            return false;
        }

        // Check if idType is one of the allowed values
        return idType == IDType.PASSPORT || idType == IDType.SA_ID;
    }
}