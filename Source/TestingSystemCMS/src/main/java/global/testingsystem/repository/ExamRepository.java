

package global.testingsystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import global.testingsystem.entity.Exam;

@Repository
public interface ExamRepository extends JpaRepository<Exam, Integer> {
	@Query(value = " select e.id"
			+ ",e.name"
			+ ",s.name as subject_name"
			+ ", e.start_date"
			+ ", e.end_date,"
			+ " e.question_num, "
			+ "e.percent_passing,"
			+ "e.max_attempt,"
			+ " e.status,"
			+ "e.code,"
			+ " e.time, "
			+ "e.decription,"
			+ "e.title"
			+ ",e.media"
			+ ",e.creator_id" + 
			",e.type,"
			+ "e.create_type, "
			+ " e.subject_id " +
			"from exams e left outer join subjects s on e.subject_id = s.id left outer join users u on e.creator_id =u.id\r\n"
			+ "where (e.name like %:keySearch% or e.title like %:keySearch% or s.name like %:keySearch%) and e.type REGEXP :type\r\n"
			+ "order by e.id desc", nativeQuery = true)
			List<Object> list(@Param("keySearch") String keySearch,@Param("type") String type);

    //	Linh Gia
	@Query(value =
			"select e.id as domain_id, e.name as domain_name, s.name as subject_name, e.question_num, e.created_at, e.max_attempt " +
			"from exams e join subjects s on e.subject_id = s.id where e.creator_id =:creator_id and e.type = 1;", nativeQuery = true)
	List<Object> getListPractice(@Param("creator_id") int creator_id);

	// Mr Duc
	@Query(value = "select a.id,a.name,a.question_num,a.time,b.id as subject_id,b.name as subject_name from exams a join subjects b on a.subject_id = b.id where a.type = 1 ORDER BY RAND() LIMIT 20;", nativeQuery = true)
			List<Object> listPracticeHomepage();
	@Query(value = " select e.id"
			+ ",e.name"
			+ ",s.name as subject_name"
			+ ", e.start_date"
			+ ", e.end_date,"
			+ " e.question_num, "
			+ "e.percent_passing,"
			+ "e.max_attempt,"
			+ " e.status,"
			+ "e.code,"
			+ " e.time, "
			+ "e.decription,"
			+ "e.title"
			+ ",e.media"
			+ ",e.creator_id" + 
			",e.type,"
			+ "e.create_type, "
			+ " e.subject_id " +
			"from exams e left outer join subjects s on e.subject_id = s.id where e.status = 1 and e.id =:exam_id", nativeQuery = true)
	Object getExamByIDS(@Param("exam_id") int exam_id);
	// Mr Duc
	
	Exam findFirstByOrderByIdDesc();
	
	Exam findById(int id);
	
	@Query(value="select eq.question_id from exam_questions eq where eq.exam_id = :exam_id",nativeQuery=true)
	List<Integer> getListQuestion(@Param("exam_id") int exam_id);
	@Query(value="select e from exams e",nativeQuery=true)
	Object getExam(@Param("exam_id") int exam_id);
	
	@Query(value= "select *from exams where code =:code",nativeQuery=true)
	Object getExamByCode(@Param("code") String code);
	
	@Query(value = " select e.id"
			+ ",e.name"
			+ ",s.name as subject_name"
			+ ", e.start_date"
			+ ", e.end_date,"
			+ " e.question_num, "
			+ "e.percent_passing,"
			+ "e.max_attempt,"
			+ " e.status,"
			+ "e.code,"
			+ " e.time, "
			+ "e.decription,"
			+ "e.title"
			+ ",e.media"
			+ ",e.creator_id" + 
			",e.type,"
			+ "e.create_type, "
			+ " e.subject_id " +
			"from exams e left outer join subjects s on e.subject_id = s.id left outer join users u on e.creator_id =u.id "
			+ "where e.name like concat('%',:key,'%') "
			+ "or s.name like concat('%',:key,'%') "
			+ "or e.question_num like concat('%',:key,'%') "
			+ "or e.status like concat('%',:key,'%') "
			+ "or e.code like concat('%',:key,'%') "
			+ "order by e.id desc", nativeQuery = true)
	List<Object> search(@Param("key") String key);
	@Query(value = " select e.id"
			+ ",e.name"
			+ ",s.name as subject_name"
			+ ", e.start_date"
			+ ", e.end_date,"
			+ " e.question_num, "
			+ "e.percent_passing,"
			+ "e.max_attempt,"
			+ " e.status,"
			+ "e.code,"
			+ " e.time, "
			+ "e.decription,"
			+ "e.title"
			+ ",e.media"
			+ ",e.creator_id" + 
			",e.type,"
			+ "e.create_type, "
			+ " e.subject_id " +
			"from exams e left outer join subjects s on e.subject_id = s.id left outer join users u on e.creator_id =u.id "
			+ "where e.type like concat('%',:key,'%') "
			+ "order by e.id desc", nativeQuery = true)
	List<Object> filterByType(@Param("key") String key);
	@Query(value="select count(*) from exam_result where exam_id=:idExam",nativeQuery=true)
	Integer sumUserTest(@Param("idExam") int idExam);
} 