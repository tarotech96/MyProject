package global.testingsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import global.testingsystem.entity.Answer_Option;
@Repository
public interface AnswerRepository extends JpaRepository<Answer_Option, Integer> {
   @Query(value="delete from Answer_Option where question_id=:id",nativeQuery=true)
   void deleteAnswerOfQuestion(@Param("id") int idQuestion);
}
