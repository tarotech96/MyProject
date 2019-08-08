/**
 * 
 */
package global.testingsystem.repository;




import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import global.testingsystem.entity.Exam_Group;

/**
 * @author USER
 *
 */
@Repository
public interface ExamGroupRepository extends JpaRepository<Exam_Group, Integer> {
	@Modifying(clearAutomatically = true)
	@Query(value="delete from exam_group where (exam_id =:exam_id and group_id =:group_id)", nativeQuery = true)
    void deleteExamGroup(@Param("exam_id") int exam_id,@Param("group_id") int group_id);
}
