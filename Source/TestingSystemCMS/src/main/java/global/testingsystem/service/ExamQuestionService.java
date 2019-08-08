package global.testingsystem.service;

import global.testingsystem.entity.Exam_Question;

public interface ExamQuestionService {
	void saveExamQuestion(Exam_Question exam_Question);
	void updateExamQuestion(int oldId,int newId,int examId);
	void deleteExamQuestion(int oldId,int examId);
}
