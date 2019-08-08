/**
 * 
 */
package global.testingsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import global.testingsystem.entity.Exam_User;

/**
 * @author USER
 *
 */
@Repository
public interface ExamUserRepository extends JpaRepository<Exam_User, Integer> {
	@Modifying(clearAutomatically = true)
	@Query(value="delete from exam_user where (exam_id=:exam_id and user_id=:user_id)", nativeQuery = true)
 void deleteExamUser(@Param("exam_id") int exam_id,@Param("user_id") int user_id);
}
