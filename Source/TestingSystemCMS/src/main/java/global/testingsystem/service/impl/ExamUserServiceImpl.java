/**
 * 
 */
package global.testingsystem.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import global.testingsystem.entity.Exam_User;
import global.testingsystem.entity.Users;
import global.testingsystem.repository.ExamUserRepository;
import global.testingsystem.repository.UsersRepository;
import global.testingsystem.service.ExamUserService;

@Service
public class ExamUserServiceImpl implements ExamUserService {

	@Autowired
	private ExamUserRepository examUserRepo;
	@Autowired
	private UsersRepository userRepository;
	@Override
	public void saveExamUser(int exam, int user) {
		Exam_User eu=new Exam_User();
		eu.setExam_id(exam);
		eu.setUser_id(user);
		examUserRepo.save(eu);
	}
	@Override
	public List<Users> getListById(int id) {
		return userRepository.findByExamId(id);
	}
	@Override
	@Transactional
	public void deleteExamUser(int examId, int userId) {
		
	examUserRepo.deleteExamUser(examId, userId);
	}
	
}
