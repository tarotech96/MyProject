package global.testingsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import global.testingsystem.entity.Domain_Exam;
@Repository
public interface ExamDomainRepository extends JpaRepository<Domain_Exam, Integer> {

}
