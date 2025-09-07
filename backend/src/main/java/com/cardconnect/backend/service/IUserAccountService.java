package com.cardconnect.backend.service;

import com.cardconnect.backend.domain.UserAccount;
import java.util.List;

public interface IUserAccountService extends IService<UserAccount, Long> {
    List<UserAccount> getAllUserAccounts();

    UserAccount completeSignup(String userId, String password);
    UserAccount login(String email, String rawPassword);
    UserAccount changePassword(String email, String oldPassword, String newPassword);

    boolean accountExistsForUserId(String userId);
}


// package com.cardconnect.backend.service;

// import com.cardconnect.backend.domain.UserAccount;
// import java.util.List;

// public interface IUserAccountService extends IService<UserAccount, Long> { // 🛠 Changed Long to String
//     List<UserAccount> getAllUserAccounts();

    

//     String verifyStudent(String studentNumber, String idNumber);
//     UserAccount completeSignup(String userId, String password);
//     UserAccount login(String email, String rawPassword);
//     UserAccount changePassword(String email, String oldPassword, String newPassword);


// }