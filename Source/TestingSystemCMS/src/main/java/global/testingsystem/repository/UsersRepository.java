/**
 * 
 */
package global.testingsystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import global.testingsystem.entity.Users;

/**
 * @author admin
 *
 */
@Repository
public interface UsersRepository extends JpaRepository<Users, Integer> {


	List<Users> findByStatus(int status);
	
	Users findByEmail(@Param("email") String email);

	List<Users> findByEmailContainingOrFullnameContaining(String email, String fullname);

	List<Users> findAllByOrderByEmailAsc();

	List<Users> findAllByOrderByFullnameAsc();

	List<Users> findByEmailContainsOrFullnameContainsAllIgnoreCaseOrderByEmailAsc(String s, String s1);

	List<Users> findByEmailContainsOrFullnameContainsAllIgnoreCaseOrderByFullnameAsc(String s, String s1);

	// COONGGGGGGGGGGGGGGGGGGGGGG
	
	
	@Query(value = "select a.fullname,a.email from users as a \r\n" + 
			"			 where  a.fullname LIKE CONCAT('%',:fullname,'%');", nativeQuery = true)
	List<Object> searchUserByName(@Param("fullname") String fullname);
	
	@Query(value = "select * from (select ex.id as id, ex.name as name,ex.question_num as question_num , ex.end_date as end_date, ex.type as type,  ex.start_date as start_date from exams as ex\r\n" + 
			"inner join exam_user as eu on eu.exam_id = ex.id\r\n" + 
			"inner join users as u on u.id = eu.user_id where (u.id =:Id and ex.type = 0 and ex.status =1 )\r\n"
			+ "union\r\n" + 
			"select ex.id as id, ex.name as name,ex.question_num as question_num, ex.end_date as end_date, ex.type as type ,ex.start_date as start_date from exams as ex\r\n" + 
			"inner join exam_group as eg on eg.exam_id = ex.id\r\n" + 
			"inner join user_group as ug on ug.group_id = eg.group_id where (ug.user_id =:Id and ex.type = 0 and ex.status =1 )) as sumExam\r\n"+
			"where sumExam.id not in (select exam_id from exam_result as er where er.user_id=:Id) and sumExam.start_date >now() order by sumExam.end_date ASC;", nativeQuery = true)
	List<Object> getListExamOfUserASCBYEndDate(@Param("Id") int Id);
	
	@Query(value = "select ex.id, ex.name, ex.title,ex.question_num, ex.time, ex.percent_passing,ex.max_attempt, ex.type, ex.end_date, ex.start_date " + 
			"\r\n from exams as ex\r\n" + 
			"\r\n where ex.type =0 and ex.status=1 and ex.start_date <= now() \r\n" + 
			"\r\n and (ex.id in ( select exam_id from exam_group where group_id in (:group_id) or ex.id in ( select exam_id from exam_user where user_id =:Id)))", nativeQuery = true)
	List<Object> getListExamOfUser(@Param("Id") int Id,@Param("group_id") List<Integer> groupId);
	
	// MR DUC thêm ngày 5.1.2019 ********* START *********
	
	@Query(value = "select ex.id, ex.name, ex.title,ex.question_num, ex.time, ex.percent_passing,ex.max_attempt, ex.type, ex.status,ex.start_date,ex.subject_id from exams  as ex inner join exam_user as eu on eu.exam_id = ex.id inner join users as u on u.id = eu.user_id where (u.id=:Id and ex.type =1 and ex.status =1);", nativeQuery = true)
	List<Object> getListPracticeOfUser(@Param("Id") int Id);
	
	// MR DUC thêm ngày 5.1.2019 ********* END *********
	
	@Query(value = "select c.name from "
			+ "(role c inner join users_role b on c.id=b.role_id) inner join users a on a.id=b.users_id"
			+ "   where a.email=:userName",nativeQuery=true)
	List<String> getListRoleOfUser(@Param("userName") String userName);
	
	@Query(value="select *from users where fullname =:name",nativeQuery=true)
	Users getuserByName(@Param("name") String usersName);
	
	@Query(value="select a.email as email,b.name as role_Name " + 
                    "from users a,role b " + 
                    " where a.id in (" + 
                    " select users_Id from users_role" + 
                    " where users_id=a.id and role_Id=b.id) "+" and b.id in ( "
                                    + "select role_Id from users_role " + 
                    " where users_id=a.id and role_Id=b.id)",nativeQuery=true)                
	List<Object[]> getAllUserRole();
	
	@Query(value = "delete from users_role where users_Id=:usersId and role_Id=:roleId)",nativeQuery=true)
	void removeUserRole(@Param("usersId") int usersId,@Param("roleId") int roleId);

	@Query(value = "SELECT * \r\n" + 
			"   FROM users us \r\n" + 
			"   WHERE ( us.id IN (SELECT eu.user_id \r\n" + 
			"         FROM Exam_User eu \r\n" + 
			"         WHERE eu.exam_id = :exam_id))\r\n"
			+ " OR (us.id IN (SELECT user_id from user_group where group_id IN (SELECT group_id from exam_group WHERE exam_id = :exam_id)))" + 
			"",nativeQuery=true)
	List<Users> findByExamId(@Param("exam_id") int exam_id);
	
	@Query(value="select *from users a where (a.id NOT IN (:listUser) and a.id in (:listComplete) )",nativeQuery=true)
	public List<Users> getListUserInCompleted(@Param("listUser") List<Integer> listUser,@Param("listComplete") List<Integer> listComplete);
	
	@Query(value="select *from Exam_Result where ( user_id IN (:listUser) and completed=1 and exam_id=:examId)",nativeQuery=true)
	public List<Object> getListUserCompleted(@Param("listUser") List<Integer> listUser,@Param("examId") int examId);
	
	
	@Query(value="select * from Exams where type=0 and id IN ( select b.exam_id from exam_result b where b.completed=1 and b.user_id =:userId) order by created_at ASC;",nativeQuery=true)
	List<Object> getListExamUserCompleted(@Param("userId") int userId);
	@Query(value="select * from Exams where type=1 and id IN ( select b.exam_id from exam_result b where b.completed=1 and b.user_id =:userId) order by created_at ASC;",nativeQuery=true)
	List<Object> getListPracticeUserCompleted(@Param("userId") int userId);
	
	@Query(value="select group_id from user_group where user_id =:userId",nativeQuery=true)
	List<Integer> getGroupOfUser(@Param("userId") int userId);
}
