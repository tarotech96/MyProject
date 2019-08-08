package global.testingsystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import global.testingsystem.entity.Question;

@Repository
public interface QuestionReposioty extends JpaRepository<Question, Integer> {
	List<Question> findAllByOrderByIdDesc();
	@Query(value = "select *from questions where ( subject_id=:idSubject and id not in (:listSelected))", nativeQuery = true)
	List<Question> getListQuestionOfSubject(@Param("idSubject") int idSubject,@Param("listSelected") List<Integer> listSelected);

	@Query(value = "select *from questions where ( chapter_id=:idChapter and subject_id=:idSubject)", nativeQuery = true)
	List<Question> getListQuestionOfChapter(@Param("idChapter") int idChapter,@Param("idSubject") int subjectId);

	@Query(value = "select *from questions where (domain_id=:idDomain  and subject_id=:idSubject)", nativeQuery = true)
	List<Question> getListQuestionOfDomain(@Param("idDomain") int idDomain,@Param("idSubject") int subjectId);

	@Query(value = "select *from questions where ( chapter_id=:idChapter and subject_id=:idSubject and domain_id=:idDomain and "
			+ " id NOT IN (:listSelect) and content like %:key% )", nativeQuery = true)
	List<Question> getListRestQuestion(@Param("idChapter") int idChaper, @Param("idDomain") int idDomain,
			@Param("listSelect") List<Integer> listSelected, @Param("key") String key,@Param("idSubject") int subjectId);

	@Query(value = "select *from questions where ( chapter_id=:idChapter and subject_id=:idSubject and "
			+ " id NOT IN (:listSelect))", nativeQuery = true)
	List<Question> getListRestQuestionByChapter(@Param("idChapter") int idChaper,
			@Param("listSelect") List<Integer> listSelected,@Param("idSubject") int subjectId);

	@Query(value = "select *from questions where ( domain_id=:idDomain and subject_id=:idSubject and "
			+ " id NOT IN (:listSelect) )", nativeQuery = true)
	List<Question> getListRestQuestionByDomain(@Param("idDomain") int idDomain,
			@Param("listSelect") List<Integer> listSelected,@Param("idSubject") int subjectId);

	@Query(value = "select *from questions where ( id NOT IN (:listSelect) and subject_id=:idSubject and content like %:key% )", nativeQuery = true)
	List<Question> getListRestQuestionByKey(@Param("listSelect") List<Integer> listSelected, @Param("key") String key,@Param("idSubject") int subjectId);

	@Query(value = "select *from questions where ( chapter_id=:idChapter and subject_id=:idSubject and domain_id=:idDomain and "
			+ " id NOT IN (:listSelect))", nativeQuery = true)
	List<Question> getListRestQuestionByChapterDomain(@Param("idChapter") int idChaper, @Param("idDomain") int idDomain,
			@Param("listSelect") List<Integer> listSelected,@Param("idSubject") int subjectId);

	@Query(value = "select *from questions where ( chapter_id=:idChapter and subject_id=:idSubject and "
			+ " id NOT IN (:listSelect) and content like %:key% )", nativeQuery = true)
	List<Question> getListRestQuestionByChapterKey(@Param("idChapter") int idChaper,
			@Param("listSelect") List<Integer> listSelected, @Param("key") String key,@Param("idSubject") int subjectId);

	@Query(value = "select *from questions where ( domain_id=:idDomain and subject_id=:idSubject and "
			+ " id NOT IN (:listSelect) and content like %:key% )", nativeQuery = true)
	List<Question> getListRestQuestionByDomainKey(@Param("idDomain") int idDomain,
			@Param("listSelect") List<Integer> listSelected, @Param("key") String key,@Param("idSubject") int subjectId);

	@Query(value = "select *from questions where subject_id=:idSubject and (" + " id NOT IN (:listSelect))", nativeQuery = true)
	List<Question> getListRestQuestionByListSelect(@Param("listSelect") List<Integer> listSelected,@Param("idSubject") int subjectId);

	@Query(value = "select a.id from questions as a where (subject_id=:idSubject and a.chapter_id =:chapterId and id NOT IN (:listSelected)) Order By RAND() LIMIT :numberOfChaper", nativeQuery = true)
	List<Object> getListQuestionMinimumChapter(@Param("chapterId") int idChapter,
			@Param("numberOfChaper") int numberOfChapter, @Param("listSelected") List<Integer> listSelected,@Param("idSubject") int subjectId);

	@Query(value = "select a.id from questions as a where (subject_id=:idSubject and a.domain_id =:domainId and id NOT IN (:listSelected)) Order By RAND() LIMIT :numberOfDomain", nativeQuery = true)
	List<Object> getListQuestionMinimumDoamin(@Param("domainId") int idDomain,
			@Param("numberOfDomain") int numberOfDomain, @Param("listSelected") List<Integer> listSelected,@Param("idSubject") int subjectId);

	@Query(value = "select *from questions where ( id NOT IN (:listSelected) and subject_id=:idSubject) ORDER BY RAND() LIMIT :numberRestQuestion", nativeQuery = true)
	List<Question> getListQuestionRestRandom(@Param("numberRestQuestion") int numberRestQuestion,
			@Param("listSelected") List<Integer> listSelected,@Param("idSubject") int subjectId);

	@Query(value = "select *from questions as a where a.id in (select question_id from exam_questions where exam_id =:idExam)", nativeQuery = true)
	List<Question> getQuestionExamDetail(@Param("idExam") int examId);

	@Query(value ="select *from questions where ( subject_id=:idSubject) ORDER BY RAND() LIMIT :size", nativeQuery = true)
	List<Question> getListQuestionInSubject2(@Param("idSubject") int userID, @Param("size") int size);
	
	@Query(value = "select *from questions as a where a.id not in (select question_id from exam_questions where exam_id =:idExam)", nativeQuery = true)
	List<Question> getQuestionRestExamDetail(@Param("idExam") int examId);

	@Query(value = "select question_id from Exam_Questions  where exam_id =:exam_id", nativeQuery = true)
	List<Integer> getListQuestionByExamId(@Param("exam_id") int exam_id);

	@Query(value = "select *from questions as a where a.id in (select question_id from exam_questions  where exam_id =:examId)", nativeQuery = true)
	List<Question> getQuestionByExamId(@Param("examId") int examId);
	
	@Query(value="select a.id,a.code,a.content,a.created_at,a.media,a.status,a.title,a.updated_at,a.time from ((questions a inner join chapters b on a.chapter_id=b.id ) inner join domains c on a.domain_id = c.id) where ( a.subject_id =:subjectId and c.id=:domainName and b.id=:chapterName ) order by RAND() LIMIT :numberQuestion",nativeQuery=true)
	List<Object> getListQuestionRandomByChapTerAndDomain(@Param("subjectId") int subjectId,@Param("domainName") int domainName,@Param("chapterName") int chapterName,@Param("numberQuestion") int numberQuestion);
	
	@Query(value ="select count(a.id) as slcauhoi,b.id as namechapter,c.id as namedomain from ((questions a inner join chapters b on a.chapter_id=b.id ) inner join domains c on a.domain_id = c.id) where ( a.subject_id =:subjectId) group by b.id,c.id",nativeQuery=true)
	List<Object> getNumberQuestionOfChapterAndDomain(@Param("subjectId") int subjectId);
	
	@Query(value = "select *from questions where subject_id=:idSubject", nativeQuery = true)
	List<Question> getListQuestionBySubjectId(@Param("idSubject") int idSubject);
	
	@Query(value = " select q.id "
			+ "from questions q left outer join subjects s on q.subject_id = s.id left outer join domains d on q.domain_id =d.id left outer join chapters c on q.chapter_id=c.id "
			+ "where q.code like concat('%',:key,'%') "
			+ "or s.name like concat('%',:key,'%') "
			+ "or d.name like concat('%',:key,'%') "
			+ "or c.name like concat('%',:key,'%') "
			+ "or q.time like concat('%',:key,'%') "
			+ "or q.title like concat('%',:key,'%') "
			+ "order by q.id desc", nativeQuery = true)
    List<Integer> search(@Param("key") String key);
	
	@Modifying
	@Query(value = "delete from exam_questions where question_id=:idQuestion", nativeQuery = true)
	void deleteQuestionInExam(@Param("idQuestion") int idQuestion);
	
}