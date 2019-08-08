/**
 * 
 */
package global.testingsystem.service;

import java.util.List;

import global.testingsystem.entity.Tag;

/**
 * @author User
 *
 */
public interface TagService {
	/** 
	 * @author tgnghia 
	 * @created date Nov 15, 2018 
	 * @modified date Nov 15, 2018 
	 * @version 1.0 
	 * @description 
	 * @param tagName
	 * @return
	 */
	public Tag findByTagName(String tagName);
	/** 
	 * @author tgnghia 
	 * @created date Nov 15, 2018 
	 * @modified date Nov 15, 2018 
	 * @version 1.0 
	 * @description 
	 * @return
	 */
	public List<Tag> getAllTags();

}
