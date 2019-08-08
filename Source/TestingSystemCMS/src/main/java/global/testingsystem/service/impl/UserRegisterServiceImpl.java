/**
 * author: USER
 */
package global.testingsystem.service.impl;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import global.testingsystem.entity.Users;
import global.testingsystem.repository.UsersRepository;
import global.testingsystem.service.UserRegisterService;

/**
 * Create by: tcnam
 * Create date: Dec 12, 2018
 * Modifier: tcnam
 * Modified date: Dec 12, 2018
 * Description:
 * Version 1.0
 */
@Service
public class UserRegisterServiceImpl implements UserRegisterService {
	@Autowired
	private UsersRepository usersRepository;

	@Override
	public boolean createUserRegister(Users user) {
		// TODO Auto-generated method stub
		if(usersRepository.save(user)!=null) {
			return true;
		}else {
			return false;
		}
	}
	
	@Override
	public Users findByEmail(String email) {
		// TODO Auto-generated method stub
		return usersRepository.findByEmail(email);
	}

	@Override
	public boolean addUser(Users user) {
		// TODO Auto-generated method stub
		try {
			usersRepository.save(user);
			return true;
		}catch (Exception e) {
			// TODO: handle exception
			return false;
		}
		
	}
	
	
	

}
