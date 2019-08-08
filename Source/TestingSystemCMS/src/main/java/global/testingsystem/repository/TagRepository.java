/**
 * 
 */
package global.testingsystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import global.testingsystem.entity.Tag;

/**
 * @author User
 *
 */
@Repository
public interface TagRepository extends JpaRepository<Tag, Integer> {
	
	/** 
	 * @author tgnghia 
	 * @created date Nov 15, 2018 
	 * @modified date Nov 15, 2018 
	 * @version 1.0 
	 * @description 
	 * @param tagName
	 * @return
	 */
	public List<Tag> findByTagName(String tagName);

}
