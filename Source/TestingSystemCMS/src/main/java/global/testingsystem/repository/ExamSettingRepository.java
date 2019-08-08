package global.testingsystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import global.testingsystem.entity.Exam_Setting;
@Repository
public interface ExamSettingRepository extends JpaRepository<Exam_Setting, Integer> {
    @Query(value ="select a.chapter_id,b.name as chapter_name,a.domain_id,c.name as domain_name,a.question_num from  ((Exam_Setting a inner join chapters b on a.chapter_id = b.id) inner join domains c on a.domain_id=c.id) where a.exam_id=:examId",nativeQuery=true)
    public List<Object> getListExamSetting(@Param("examId") int examId);
    @Modifying(clearAutomatically = true)
    @Query(value="delete from Exam_Setting where exam_id =:examId",nativeQuery=true)
    public void deleteExamSetting(@Param("examId") int examId);
    
}