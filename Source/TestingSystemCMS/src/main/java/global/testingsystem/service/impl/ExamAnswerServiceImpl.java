package global.testingsystem.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import global.testingsystem.entity.Exam_Answer;
import global.testingsystem.repository.ExamAnswerRepository;
import global.testingsystem.service.ExamAnswerService;

@Service
public class ExamAnswerServiceImpl implements ExamAnswerService {
	private ExamAnswerRepository examAnswerRepository;
	@Autowired
	public ExamAnswerServiceImpl(ExamAnswerRepository examAnswerRepository) {
		this.examAnswerRepository = examAnswerRepository;
	}

	@Override
	public boolean insert(Exam_Answer exam_Answer) {
		examAnswerRepository.save(exam_Answer);
		return true;
	}

	@Override
	@Transactional
	public void updateExamAnswer(String choose_answer, int result_id, int question_id) {
		examAnswerRepository.updateExamAnswer(choose_answer, result_id, question_id);
		
	}

	@Override
	@Transactional
	public void deleteExamAnswer(int result_id, int question_id) {
		examAnswerRepository.deleteExamAnswer(result_id, question_id);
	}
	@Override
	public List<Object> getListQuestionByResultId(int resultId) {
		return examAnswerRepository.getListQuestionByResultId(resultId);
	}

	@Override
	public List<Integer> getListAnswerCorrectQuestionId(int questionId) {
		return examAnswerRepository.getListAnswerCorrectQuestionId(questionId);
	}

	@Override
	public int countQuestionByExam(int resultId) {
		return examAnswerRepository.countQuestionByExam(resultId);
	}

	@Override
	public int countQuestionByChapter(int question_id) {
		return examAnswerRepository.countQuestionByChapter(question_id);
	}

	@Override
	public int countQuestionByDomain(int question_id) {
		return examAnswerRepository.countQuestionByDomain(question_id);
	}

	@Override
	public String getChoose_answer(int result_id, int question_id) {
		// TODO Auto-generated method stub
		return examAnswerRepository.getChoose_answer(result_id, question_id);
	}


}
