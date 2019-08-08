/**
 * 
 */
package global.testingsystem.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import global.testingsystem.entity.Tag;
import global.testingsystem.repository.TagRepository;
import global.testingsystem.service.TagService;

/**
 * @author User
 *
 */
@Service
public class TagServiceImpl implements TagService {

	@Autowired
	private TagRepository tagRepo;

	/* (non-Javadoc)
	 * @see com.cmcglobal.rrcexample.service.TagService#findTagByName()
	 */
	@Override
	public Tag findByTagName(String tagName) {
		return tagRepo.findByTagName(tagName).get(0);
	}
	

	@Override
	public List<Tag> getAllTags() {
		return tagRepo.findAll();
	}

}
