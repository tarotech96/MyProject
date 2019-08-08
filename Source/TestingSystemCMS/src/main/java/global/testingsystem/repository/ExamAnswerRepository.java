package global.testingsystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import global.testingsystem.entity.Exam_Answer;


@Repository
public interface ExamAnswerRepository extends JpaRepository<Exam_Answer, Integer>{
	@Modifying(clearAutomatically = true)
	@Query(value = "DELETE FROM exam_answer WHERE result_id =:result_id AND question_id =:question_id", nativeQuery =true)
	void deleteExamAnswer(@Param("result_id") int result_id,@Param("question_id") int question_id);
	
	@Modifying(clearAutomatically = true)
	@Query(value = "update exam_answer set choose_answer =:choose_answer where result_id=:result_id and question_id=:question_id", nativeQuery =true)
	void updateExamAnswer(@Param("choose_answer") String choose_answer, @Param("result_id") int result_id,@Param("question_id") int question_id );
	
	@Query(value = "select a.id from Answer_Options a where a.correct = 1 and a.question_id=:questionId", nativeQuery=true)
	List<Integer> getListAnswerCorrectQuestionId(@Param("questionId") int questionId);
	
	@Query(value ="select count(q.id) from exam_answer ea join exam_result er on ea.result_id = er.id\r\n" + 
			"							 join exams e on er.exam_id = e.id\r\n" + 
			"                             join exam_questions eq on e.id = eq.exam_id\r\n" + 
			"                             join questions q on eq.question_id = q.id where ea.result_id=:resultId", nativeQuery = true)
	int countQuestionByExam(@Param("resultId") int resultId);
	
	@Query(value="select q.chapter_id from exam_answer ea join questions q on ea.question_id = q.id where q.id=:questionId", nativeQuery = true)
	int countQuestionByChapter(@Param("questionId") int questionId);
	
	@Query(value="select q.domain_id from exam_answer ea join questions q on ea.question_id = q.id where q.id=:questionId", nativeQuery = true)
	int countQuestionByDomain(@Param("questionId") int questionId);
	
	@Query(value = "select  ea.question_id,ea.choose_answer from Exam_Answer ea where result_id=:resultId", nativeQuery=true)
	List<Object> getListQuestionByResultId(@Param("resultId") int resultId);
	
	@Query(value ="select choose_answer from exam_answer where (result_id=:result_id and question_id=:question_id )", nativeQuery =true)
	String getChoose_answer(@Param("result_id") int result_id,@Param("question_id") int question_id);
}
