package com.cardconnect.backend.controller;

import com.cardconnect.backend.domain.Notification;
import com.cardconnect.backend.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    @Autowired
    private NotificationRepository notificationRepository;

    @GetMapping
    public List<Notification> getUserNotifications(Authentication authentication) {
        String userId = (String) authentication.getPrincipal();
        return notificationRepository.findByUserId(userId);
    }

    // Optional: endpoint to add notifications for testing
    @PostMapping
    public Notification createNotification(@RequestBody Notification notification) {
        return notificationRepository.save(notification);
    }
}
