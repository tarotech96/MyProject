package global.testingsystem.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import global.testingsystem.entity.Tag;
import global.testingsystem.service.TagService;
import global.testingsystem.util.ConstantPage;

@CrossOrigin(origins = "*")
@RestController
public class TagController  {
	
	public TagController() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Autowired
	TagService tagServiceImpl;

	/** 
	 * @author tgnghia 
	 * @created date Nov 15, 2018 
	 * @modified date Nov 15, 2018 
	 * @version 1.0 
	 * @description 
	 * @return
	 */
	@GetMapping(value = ConstantPage.REST_API_GET_ALL_TAG, produces = "application/json")
	public List<Tag> Apitag(){
		return tagServiceImpl.getAllTags();
	}

}
