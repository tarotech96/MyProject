package global.testingsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import global.testingsystem.entity.Chapter_Exam;
@Repository
public interface ExamChapterRepository extends JpaRepository<Chapter_Exam, Integer> {

}
