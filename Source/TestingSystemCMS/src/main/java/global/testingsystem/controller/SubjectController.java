/**
 * 
 */
package global.testingsystem.controller;

import java.util.Date;
import java.util.List;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import global.testingsystem.entity.Subject;
import global.testingsystem.service.ChapterService;
import global.testingsystem.service.DomainService;
import global.testingsystem.service.SubjectService;
import global.testingsystem.util.ConstantPage;

/**
 * @author admin
 *
 */
@CrossOrigin(origins = "*")
@RestController
public class SubjectController {

	@Autowired
	private SubjectService subjectService;
	
	@Autowired
	private ChapterService chapterService;
	
	@Autowired
	private DomainService domainService;
	// MR DUC
	@GetMapping(value = ConstantPage.REST_API_GET_SUBJECT_BY_ID, produces = {
			MediaType.APPLICATION_PROBLEM_JSON_VALUE })
	public Subject getSubjectById(@RequestParam int id) {
		return subjectService.getSubjectById(id);
	}

	@GetMapping(value = ConstantPage.REST_API_GET_ALL_SUBJECT, produces = { MediaType.APPLICATION_PROBLEM_JSON_VALUE })
	public List<Subject> getListSubject() {
		return subjectService.getListSubject();
	}

	@DeleteMapping(value = ConstantPage.REST_API_DELETE_SUBJECT_BY_ID, produces = {
			MediaType.APPLICATION_PROBLEM_JSON_VALUE })
	public boolean delete(@PathVariable int id) {
		List<Integer> listChapter = chapterService.getListChapterIdBySubjectId(id);
		if(listChapter != null) {
			for (int i = 0; i < listChapter.size(); i++) {
				chapterService.deleteChapter(listChapter.get(i));
			}
		}
		List<Integer> listDomain = domainService.getListDomainIdBySubjectId(id);
		if(listDomain != null) {
			for (int i = 0; i < listDomain.size(); i++) {
				domainService.deleteDomain(listDomain.get(i));
			}
		}
		return subjectService.deleteSubject(id);
	}

	@PostMapping(value = ConstantPage.REST_API_UPDATE_SUBJECT, produces = { MediaType.APPLICATION_PROBLEM_JSON_VALUE })
	public ResponseEntity<Object> update(@RequestParam("subject") String subject) {
		JSONObject jsonObject = new JSONObject(subject);
		int id = jsonObject.getInt("id");
		String name = jsonObject.getString("name");
		Subject checkSubject = subjectService.findSubjectByName(name);
		if (checkSubject != null)
			if (checkSubject.getId() != id) {
				return new ResponseEntity<>("ERROR!", HttpStatus.BAD_REQUEST);
			}	
		Subject subjectUpdate = subjectService.findSubjectById(id);
		subjectUpdate.setName(name);
		subjectUpdate.setCreated_at(subjectUpdate.getCreated_at());
		Date date = new Date();
		java.sql.Date sqlDate = new java.sql.Date(date.getTime());
		subjectUpdate.setUpdated_at(sqlDate);
		boolean isSuccess = subjectService.editSubject(subjectUpdate);
		return new ResponseEntity<Object>(isSuccess, HttpStatus.OK);
	}

	@PostMapping(value = ConstantPage.REST_API_INSERT_SUBJECT, produces = { MediaType.APPLICATION_PROBLEM_JSON_VALUE })
	public ResponseEntity<Object> insert(@RequestParam("subject") String subject) {
		JSONObject jsonObject = new JSONObject(subject);
		String name = jsonObject.getString("name");
		Subject subject2 = subjectService.findSubjectByName(name);
		if (subject2 != null) {
			return new ResponseEntity<>("Không được trùng", HttpStatus.BAD_REQUEST);
		}
		Subject subjectInsert = new Subject();
		subjectInsert.setName(jsonObject.getString("name"));
		Date date = new Date();
		java.sql.Date sqlDate = new java.sql.Date(date.getTime());
		subjectInsert.setCreated_at(sqlDate);
		boolean isSuccsess = subjectService.addSubject(subjectInsert);
		return new ResponseEntity<Object>(isSuccsess, HttpStatus.OK);
	}

	@GetMapping(value = ConstantPage.REST_API_SEARCH_SUBJECT, produces = { MediaType.APPLICATION_PROBLEM_JSON_VALUE })
	public List<Subject> search(@RequestParam String key) {
		return subjectService.searchByName(key);
	}

	@GetMapping(value = ConstantPage.REST_API_SORT_SUBJECT_BY_NAME, produces = {
			MediaType.APPLICATION_PROBLEM_JSON_VALUE })
	public List<Subject> sortSubjectByName(@RequestParam String name) {
		return subjectService.sortSubjectByName(name);
	}
}
