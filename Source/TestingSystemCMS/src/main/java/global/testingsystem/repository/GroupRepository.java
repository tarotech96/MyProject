/**
 * 
 */
package global.testingsystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import global.testingsystem.entity.Group;

/**
 * @author USER
 *
 */
@Repository
public interface GroupRepository extends JpaRepository<Group, Integer> {
	@Query(value = "SELECT * FROM datn.groups g WHERE g.name=:name", nativeQuery = true)
	Group findGroupByName(@Param("name") String name);

	@Query(value = "SELECT a.id as id1, a.name as name, a.parent_id, a.type,a.created_at, a.updated_at, b.id as id2, b.name as name2 \r\n"
			+ "			 FROM datn.groups as a \r\n" + "			 left join datn.groups as b \r\n"
			+ "			 on a.parent_id = b.id where a.name LIKE CONCAT('%',:name,'%') ", nativeQuery = true)
	List<Object> searchGroupByName(@Param("name") String name);

	@Query(value = "SELECT a.id as id1, a.name as name, a.parent_id, a.type,a.created_at, a.updated_at, b.id as id2, b.name as name2 "
			+ " FROM datn.groups as a " + " left join datn.groups as b "
			+ " on a.parent_id = b.id  order by a.id desc", nativeQuery = true)
	List<Object> getListGroup();

	@Query(value = "SELECT * \r\n" + "   FROM datn.groups gr \r\n" + "   WHERE gr.id IN (SELECT eg.group_id \r\n"
			+ "         FROM Exam_Group eg \r\n" + "         WHERE eg.exam_id = :exam_id) ;\r\n"
			+ "", nativeQuery = true)
	List<Group> findByExamId(@Param("exam_id") int exam_id);

	@Query(value = "select * from datn.groups g where g.parent_id = 0", nativeQuery = true)
	List<Group> getAll();

	@Query(value = "select parent_id from datn.groups where parent_id != 0", nativeQuery = true)
	List<Integer> getAllParentId();

	@Query(value = "select g.id from datn.groups g where g.parent_id=:parentId", nativeQuery = true)
	List<Integer> getAllSubId(@Param("parentId") int parentId);

	@Query(value = "select u.id,u.fullname,u.email from users u inner join user_group ug on ug.user_id=u.id where (u.fullname like %:keySearch% or u.email like %:keySearch%) and ug.group_id=:groupId group by u.id,u.fullname,u.email", nativeQuery = true)
	List<Object> listMember(@Param("groupId") int groupId, @Param("keySearch") String keySearch);

	@Query(value = "select u.id,u.fullname,u.email from users u where u.id not in (select user_id from user_group where group_id=:groupId)", nativeQuery = true)
	List<Object> listNotMember(@Param("groupId") int groupId);
}
