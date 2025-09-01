package com.cardconnect.backend.service;

import com.cardconnect.backend.domain.UserAccount;
import java.util.List;

public interface IUserAccountService extends IService<UserAccount, String> { // 🛠 Changed Long to String
    List<UserAccount> getAllUserAccounts();

}