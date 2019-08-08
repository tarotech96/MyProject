package global.testingsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import global.testingsystem.entity.Exam_Question;
@Repository
public interface ExamQuestionRepository extends JpaRepository<Exam_Question, Integer> {
	@Modifying(clearAutomatically = true)
	@Query(value="update Exam_Questions set question_id =:newId where ( question_id =:oldId and exam_id =:exam_id )",nativeQuery=true)
    public void updateQuestionExam(@Param("newId") int newId, @Param("oldId") int oldId, @Param("exam_id") int examId);
     
     @Modifying(clearAutomatically = true)
 	 @Query(value="delete from Exam_Questions where( question_id =:oldId and exam_id =:exam_id )",nativeQuery=true)
     public void deleteQuestionExam(@Param("oldId") int oldId,@Param("exam_id") int examId);
}
