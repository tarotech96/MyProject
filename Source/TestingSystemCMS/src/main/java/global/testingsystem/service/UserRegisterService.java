/**
 * author: USER
 */
package global.testingsystem.service;

import global.testingsystem.entity.Users;

/**
 * Create by: tcnam
 * Create date: Dec 12, 2018
 * Modifier: tcnam
 * Modified date: Dec 12, 2018
 * Description:
 * Version 1.0
 */
public interface UserRegisterService {
	
	public boolean createUserRegister(Users user);
	boolean addUser(Users user);
	public Users findByEmail(String email);
	

}
