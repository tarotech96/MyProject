/**
 * 
 */
package global.testingsystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import global.testingsystem.entity.Chapter;

/**
 * @author USER
 *
 */
@Repository
public interface ChapterRepository extends JpaRepository<Chapter, Integer>{
    Chapter findChapterByName(String name);
    
    @Query(value = "select c.id as id1, c.name as chapter_name, c.created_at, c.updated_at,s.id as id2, s.name as subject_name, d.id as id3, d.name as chapter_name2 \r\n" +
      		"from chapters c inner join subjects s on c.subject_id = s.id left join chapters d on c.parent_id = d.id  where c.name LIKE CONCAT('%',:name,'%')", nativeQuery = true)
    List<Object> searchChapterByName(@Param("name") String name);

    @Query(value="select *from chapters where subject_id =:idSubject",nativeQuery=true)
    public List<Chapter> getChapterBySubject(@Param("idSubject") int idSubject);

    
    @Query(value="select c.id as id1, c.name as chapter_name, c.created_at, c.updated_at,s.id as id2, s.name as subject_name, d.id as id3, d.name as chapter_name2 \r\n" + 
    		"from chapters c inner join subjects s on c.subject_id = s.id left join chapters d on c.parent_id = d.id ORDER BY c.id DESC", nativeQuery = true)
    List<Object> list();
    
    
    @Query(value="select *from chapters where ( subject_id =:idSubject and parent_id=0 )",nativeQuery=true)
    public List<Chapter> getChapterBySubjectAndParent(@Param("idSubject") int idSubject);
    
    @Query(value="select *from chapters where parent_id = 0 ",nativeQuery=true)
    List<Chapter> getParentName();
    
    @Query(value="select *from chapters where name=:name",nativeQuery=true)
    List<Chapter> getListChapterByName(@Param("name") String name);
    
    @Query(value="select id from chapters where parent_id=:parentId", nativeQuery = true)
	List<Integer> getAllSubId(@Param("parentId")int parentId);
    
    @Query(value="select id from chapters where subject_id=:subjectId", nativeQuery = true)
    List<Integer> getListChapterIdBySubjectId(@Param("subjectId") int subjectId);
}
