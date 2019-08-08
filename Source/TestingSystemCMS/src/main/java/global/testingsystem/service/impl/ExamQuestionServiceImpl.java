package global.testingsystem.service.impl;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import global.testingsystem.entity.Exam_Question;
import global.testingsystem.repository.ExamQuestionRepository;
import global.testingsystem.service.ExamQuestionService;
@Service
public class ExamQuestionServiceImpl implements ExamQuestionService {
	    @Autowired
	    private ExamQuestionRepository examQuestionRepo;
		@Override
		public void saveExamQuestion(Exam_Question exam_Question) {
			// TODO Auto-generated method stub\\
			examQuestionRepo.save(exam_Question);
			
		}
		
		@Override
		@Transactional
		public void updateExamQuestion(int oldId, int newId,int examId) {
			// TODO Auto-generated method stub
			examQuestionRepo.updateQuestionExam(newId, oldId, examId);
		} 
        @Transactional
		@Override
		public void deleteExamQuestion(int oldId, int examId) {
			// TODO Auto-generated method stub
        	examQuestionRepo.deleteQuestionExam(oldId, examId);
			
		}

}
