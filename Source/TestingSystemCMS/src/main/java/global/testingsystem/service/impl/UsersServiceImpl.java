/**
 * 
 */
package global.testingsystem.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import global.testingsystem.entity.Users;
import global.testingsystem.repository.UsersRepository;
import global.testingsystem.service.UsersService;

/**
 * @author admin
 *
 */
@Service
public class UsersServiceImpl implements UsersService {
	private static Logger log = Logger.getLogger(UsersServiceImpl.class);

	@Autowired
	private UsersRepository usersRepository;

	@Override
	public Users findById(int id) {
		return usersRepository.findById(id).get();
	}

	@Override
	public Users loadUserByUsername(String username) {
		// TODO Auto-generated method stub
		for (Users users : usersRepository.findAll()) {
			if (users.getFullname().equals(username)) {
				return users;
			}
		}
		return null;
	}

	@Override
	public List<Object> getlistExamOfUser(int userId,List<Integer> groupId) {
		return usersRepository.getListExamOfUser(userId,groupId);
	}

	@Override
	public boolean add(Users users) {
		usersRepository.save(users);
		return true;
	}

	@Override
	public boolean delete(int id) {
		boolean isSuccess = false;
		Users users = usersRepository.getOne(id);
		try {
			usersRepository.delete(users);
			isSuccess = true;
		} catch (Exception e) {
			log.error("delete failed" + e.getMessage());
			isSuccess = false;
		}
		return isSuccess;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * global.testingsystem.service.UsersService#edit(global.testingsystem.entity.
	 * Users)
	 */
	@Override
	public boolean edit(Users users) {
		boolean isSuccess = false;
		Users updateUsers = usersRepository.save(users);
		if (updateUsers != null) {
			isSuccess = true;
		} else {
			isSuccess = false;
			log.error("insert fall ");
		}
		return isSuccess;
	}

	@Override
	public List<Users> findByStatus() {
		return usersRepository.findByStatus(1);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see global.testingsystem.service.UsersService#findByEmail(java.lang.String)
	 */
	@Override
	public Users findByEmail(String email) {
		// TODO Auto-generated method stub
		Users user=null;
		try {
		user=usersRepository.findByEmail(email);
		}catch(Exception e) {
			e.printStackTrace();
		}
		return user;
	}

	@Override
	public boolean addUser(Users user) {
		// TODO Auto-generated method stub
		try {
			usersRepository.save(user);
			return true;
		} catch (Exception e) {
			// TODO: handle exception
			return false;
		}

	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see global.testingsystem.service.UsersService#SearchUser(java.lang.String)
	 */
	@Override
	public List<Users> searchUser(String key) {

		return usersRepository.findByEmailContainingOrFullnameContaining(key, key);
	}

	@Override
	public List<Users> sortUser(String key, String title) {
		if (key == "") {
			if (title == "fullname")
				return usersRepository.findAllByOrderByFullnameAsc();
			else
				return usersRepository.findAllByOrderByEmailAsc();
		} else {
			if (title == "fullname")
				return usersRepository.findByEmailContainsOrFullnameContainsAllIgnoreCaseOrderByFullnameAsc(key, key);
			else
				return usersRepository.findByEmailContainsOrFullnameContainsAllIgnoreCaseOrderByEmailAsc(key, key);
		}
	}

	@Override
	public List<String> getListRoleOfUser(String userName) {
		// TODO Auto-generated method stub
		try {
			List<String> listRoleOfUser = new ArrayList<String>();
			listRoleOfUser = usersRepository.getListRoleOfUser(userName);
			return listRoleOfUser;
		} catch (Exception e) {
			// TODO: handle exception
			return null;
		}
	}

	// COONGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG

	@Override
	public List<Object[]> getAllUserRole() {
		// TODO Auto-generated method stub
		try {
			return usersRepository.getAllUserRole();
		} catch (Exception e) {
			// TODO: handle exception
			return null;
		}
	}

	@Override
	public List<Object> getListUserComplete(List<Integer> listUser,int examId) {
		// TODO Auto-generated method stub
		return usersRepository.getListUserCompleted(listUser,examId);
	}

	@Override
	public Users saveUser(Users users) {
		// TODO Auto-generated method stub
		try {
			return usersRepository.save(users);
		} catch (Exception e) {
			// TODO: handle exception
			return null;
		}
	}

	@Override
	public void deleteUserRole(int usersId, int roleId) {
		// TODO Auto-generated method stub
		try {
			usersRepository.removeUserRole(usersId, roleId);
		} catch (Exception e) {
			// TODO: handle exception
		}
	}

	@Override
	public Users getUserByName(String usersName) {
		// TODO Auto-generated method stub
		try {
			return usersRepository.getuserByName(usersName);
		} catch (Exception e) {
			// TODO: handle exception
			return null;
		}
	}

	@Override
	public List<Object> getListExamUserCompleted(int userId) {
		// TODO Auto-generated method stub
		return usersRepository.getListExamUserCompleted(userId);
	}

	@Override
	public List<Object> getListExamOfUserASCBYEndDate(int userId) {
		return usersRepository.getListExamOfUserASCBYEndDate(userId);
	}

	@Override
	public List<Users> getListUserInComplete(List<Integer> listUser,List<Integer> listComplete) {
		// TODO Auto-generated method stub
		return usersRepository.getListUserInCompleted(listUser,listComplete);
	}

	@Override
	public List<Users> getListUser() {
		System.out.println("---getListUser---");
		return usersRepository.findAll();
	}

	// MR DUC thêm ngày 5.1.2019 ********* START *********
	
	@Override
	public List<Object> getListPracticeUserCompleted(int userId) {
		return usersRepository.getListPracticeUserCompleted(userId);
	}

	@Override
	public List<Object> getListPracticeOfUser(int Id) {
		return usersRepository.getListPracticeOfUser(Id);
	}

	@Override
	public List<Object> searchUserByName(String fullname) {
		// TODO Auto-generated method stub
		return usersRepository.searchUserByName(fullname);
	}

	@Override
	public List<Integer> getGroupOfUser(int userId) {
		// TODO Auto-generated method stub
		return usersRepository.getGroupOfUser(userId);
	}

	// MR DUC thêm ngày 5.1.2019 ********* END *********

}
