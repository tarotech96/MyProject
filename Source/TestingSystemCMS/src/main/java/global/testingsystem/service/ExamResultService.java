package global.testingsystem.service;

import java.util.List;

import global.testingsystem.entity.Exam_Result;
import global.testingsystem.entity.Question;

public interface ExamResultService {
    List<Exam_Result> listExam_Result(int exam_id);
    boolean insert(Exam_Result exam_Result);
    Exam_Result findById(int id);
    
    Exam_Result findFirstByOrderByIdDesc();
    
    Exam_Result getUserResultByUserExam(int userId,int examId);
    
    void update(Exam_Result exam_Result);
    
    // MR DUC
    
    List<Exam_Result> getListExamResultByUserIDExamID(int user_id, int exam_id);
    List<Exam_Result> getListPracticeResultByUserIDPracticeID(int userID,int practiceID);
    List<Integer> getListQuestionInSubject(int idSubject,int numberQuestion);
    List<Question> getListQuestionInSubject2(int idSubject,int numberQuestion);
}
