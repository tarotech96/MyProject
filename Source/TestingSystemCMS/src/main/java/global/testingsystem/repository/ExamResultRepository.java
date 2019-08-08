package global.testingsystem.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import global.testingsystem.entity.Exam_Result;
import global.testingsystem.entity.Question;
@Repository
public interface ExamResultRepository extends JpaRepository<Exam_Result, Integer> {
    @Query(value="select *from Exam_Result a where ( a.exam_id =:examId)",nativeQuery=true)
    public List<Exam_Result> listExamResult(@Param("examId") int examId);
    Exam_Result findFirstByOrderByIdDesc();
    @Query(value="select *from Exam_Result a where (a.exam_id=:examId and a.id=:id)",nativeQuery=true)
    Exam_Result getExamReSultByUserExam(@Param("examId") int examId,@Param("id") int id);
    // MR DUC
	@Query(value =
			"select * from exam_result where (completed = 1 and user_id=:userID and exam_id=:examID) order by created_at ASC;", nativeQuery = true)
	List<Exam_Result> getListExamResultByUserIDExamID(@Param("userID") int userID,@Param("examID") int examID);
	@Query(value =
			"select * from exam_result where (completed = 1 and user_id=:userID and exam_id=:practiceID) order by created_at ASC;", nativeQuery = true)
	List<Exam_Result> getListPracticeResultByUserIDPracticeID(@Param("userID") int userID,@Param("practiceID") int practiceID);
	
	
	@Query(value ="select id from questions where ( subject_id=:idSubject) ORDER BY RAND() LIMIT :size", nativeQuery = true)
	List<Integer> getListQuestionInSubject(@Param("idSubject") int userID,@Param("size") int size);
	
} 

