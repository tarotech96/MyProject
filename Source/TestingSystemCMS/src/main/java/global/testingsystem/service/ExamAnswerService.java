package global.testingsystem.service;

import java.util.List;

import global.testingsystem.entity.Exam_Answer;

public interface ExamAnswerService {
	boolean insert(Exam_Answer exam_Answer);
	
	void deleteExamAnswer (int result_id, int question_id);
	
	void updateExamAnswer(String choose_answer, int result_id, int question_id);

	List<Object> getListQuestionByResultId(int resultId);
	
	List<Integer> getListAnswerCorrectQuestionId(int questionId);
	
	int countQuestionByExam(int resultId);
	
	int countQuestionByChapter(int question_id);
	
	int countQuestionByDomain(int question_id);
	
	String getChoose_answer(int result_id, int question_id);
	
}
