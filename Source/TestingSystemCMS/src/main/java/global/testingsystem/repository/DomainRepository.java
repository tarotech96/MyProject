
/**
 * 
 */
package global.testingsystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import global.testingsystem.entity.Domain;

/**
 * @author USER
 *
 */
@Repository
public interface DomainRepository extends JpaRepository<Domain, Integer>{
    Domain findDomainByName(String name);
    @Query(value = " select a.id as domain_id,a.name as domain_name,a.created_at,a.updated_at,b.id as subject_id,b.name as subject_name from domains a join subjects b on a.subject_id = b.id ORDER BY a.id DESC", nativeQuery = true)
	List<Object> findAllDomain();
    
    @Query(value = " select a.id as domain_id,a.name as domain_name,a.created_at,a.updated_at,b.id as subject_id,b.name as subject_name from domains a join subjects b on a.subject_id = b.id where a.name LIKE CONCAT('%',:name,'%')", nativeQuery = true)
    List<Object> searchDomainByName(@Param("name") String name);
    
    @Query(value="select *from domains where subject_id =:idSubject",nativeQuery=true)
    List<Domain> getDomainBySubject(@Param("idSubject") int idSubject);
    
    @Query(value="select *from domains where name=:name",nativeQuery=true)
    List<Domain> getListDomainByName(@Param("name") String name);
    
    @Query(value="select id from domains where subject_id=:subjectId", nativeQuery = true)
    List<Integer> getListDomainIdBySubjectId(@Param("subjectId") int subjectId);
}
