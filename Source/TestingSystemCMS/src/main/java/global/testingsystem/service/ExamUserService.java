/**
 * 
 */
package global.testingsystem.service;

import java.util.List;

import global.testingsystem.entity.Users;

/**
 * @author USER
 *
 */
public interface ExamUserService {
	void saveExamUser(int exam, int user);
	List <Users> getListById(int id);
	void deleteExamUser(int examId, int userId);
}
