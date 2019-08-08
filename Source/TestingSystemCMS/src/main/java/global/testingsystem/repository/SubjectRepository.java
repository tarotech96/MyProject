/**
 * 
 */
package global.testingsystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import global.testingsystem.entity.Subject;

/**
 * @author USER
 *
 */
@Repository
public interface SubjectRepository extends JpaRepository<Subject, Integer>{
        
	@Query(value="select s.id, s.name, s.created_at, s.updated_at from subjects s order by s.id desc ", nativeQuery= true)
	List<Subject> list();
	
    Subject findSubjectByName(String name);    

}
