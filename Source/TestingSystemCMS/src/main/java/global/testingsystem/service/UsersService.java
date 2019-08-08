/**
 * 
 */
package global.testingsystem.service;

import java.util.List;

import global.testingsystem.entity.Users;

/**
 * @author admin
 *
 */
public interface UsersService {

	List<Users> getListUser();
	
	List<Object> getlistExamOfUser(int userId,List<Integer> groupId);	
	
	List<Integer> getGroupOfUser(int userId);

	Users findById(int id);

	Users findByEmail(String email);

	boolean add(Users users);

	boolean addUser(Users user);

	boolean delete(int id);

	boolean edit(Users users);

	Users loadUserByUsername(String username);

	List<Object> searchUserByName(String fullname);
	
	List<Users> searchUser(String key);

	List<Users> sortUser(String key, String title);

	List<String> getListRoleOfUser(String userName);

	List<Object[]> getAllUserRole();
	
	void deleteUserRole(int usersId, int roleId);

	Users getUserByName(String usersName);

	Users saveUser(Users users);

	List<Users> findByStatus();

	List<Object> getListUserComplete(List<Integer> listUser,int examId);

	List<Users> getListUserInComplete(List<Integer> listUser,List<Integer> listComplete);
	
	List<Object> getListExamUserCompleted(int userId);
	
	List<Object>  getListExamOfUserASCBYEndDate(int userId);
	
	// MR DUC thêm ngày 5.1.2019 ********* START *********
	
	List<Object> getListPracticeUserCompleted(int userId);
	List<Object> getListPracticeOfUser(int Id);
	
	// MR DUC thêm ngày 5.1.2019 ********* END *********
	
}
