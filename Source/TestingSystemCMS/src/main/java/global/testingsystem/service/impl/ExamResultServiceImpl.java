package global.testingsystem.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import global.testingsystem.entity.Exam_Result;
import global.testingsystem.entity.Question;
import global.testingsystem.repository.ExamResultRepository;
import global.testingsystem.repository.QuestionReposioty;
import global.testingsystem.service.ExamResultService;

@Service
public class ExamResultServiceImpl implements ExamResultService {
	@Autowired
	private ExamResultRepository examResultRepo;

	@Autowired
	private QuestionReposioty questionRepo;
	@Override
	public List<Exam_Result> listExam_Result(int exam_id) {
		// TODO Auto-generated method stub
		return examResultRepo.listExamResult(exam_id);
	}

	@Override
	public boolean insert(Exam_Result exam_Result) {

		examResultRepo.save(exam_Result);
		return true;
		// TODO Auto-generated method stub
	}

	@Override
	public Exam_Result findById(int id) {

		return examResultRepo.findById(id).get();
	}

	@Override
	public Exam_Result findFirstByOrderByIdDesc() {

		return examResultRepo.findFirstByOrderByIdDesc();
	}

	@Override
	public Exam_Result getUserResultByUserExam(int userId, int examId) {
		// TODO Auto-generated method stub
		return examResultRepo.getExamReSultByUserExam(examId, userId);

	}
	@Override
	public void update(Exam_Result exam_Result) {
		examResultRepo.save(exam_Result);
		
	}
	@Override
	public List<Exam_Result> getListExamResultByUserIDExamID(int user_id, int exam_id) {
		return examResultRepo.getListExamResultByUserIDExamID(user_id, exam_id);
	}

	@Override
	public List<Exam_Result> getListPracticeResultByUserIDPracticeID(int userID, int practiceID) {
			return examResultRepo.getListPracticeResultByUserIDPracticeID(userID, practiceID);
	}

	@Override
	public List<Integer> getListQuestionInSubject(int idSubject, int numberQuestion) {
		// TODO Auto-generated method stub
		return examResultRepo.getListQuestionInSubject(idSubject, numberQuestion);
	}

	@Override
	public List<Question> getListQuestionInSubject2(int idSubject, int numberQuestion) {
		// TODO Auto-generated method stub
		return questionRepo.getListQuestionInSubject2(idSubject, numberQuestion);
	}
}
