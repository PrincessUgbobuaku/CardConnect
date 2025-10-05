// package com.cardconnect.backend.controller;

// import com.cardconnect.backend.domain.User;
// import com.cardconnect.backend.repository.IUserRepository;
// import com.cardconnect.backend.service.;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;

// @RestController
// @RequestMapping("/api/users")
// public class UserController {

//     private final UserService userService;

//     @Autowired
//     public UserController(UserService userService) {
//         this.userService = userService;
//     }

//     // ✅ Get all users
//     @GetMapping
//     public ResponseEntity<List<User>> getAllUsers() {
//         List<User> users = userService.getAll();
//         return ResponseEntity.ok(users);
//     }

//     // ✅ Get user by ID
//     @GetMapping("/{userID}")
//     public ResponseEntity<User> getUserById(@PathVariable String userID) {
//         User user = userService.read(userID);
//         return user != null ? ResponseEntity.ok(user) : ResponseEntity.notFound().build();
//     }

//     // ✅ Update user
//     @PutMapping("/{userID}")
//     public ResponseEntity<User> updateUser(@PathVariable String userID, @RequestBody User updatedUser) {
//         if (!userID.equals(updatedUser.getUserID())) {
//             return ResponseEntity.badRequest().build();
//         }

//         User result = userService.update(updatedUser);
//         return result != null ? ResponseEntity.ok(result) : ResponseEntity.notFound().build();
//     }

//     // ✅ Delete user
//     @DeleteMapping("/{userID}")
//     public ResponseEntity<Void> deleteUser(@PathVariable String userID) {
//         boolean deleted = userService.delete(userID);
//         return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
//     }
// }