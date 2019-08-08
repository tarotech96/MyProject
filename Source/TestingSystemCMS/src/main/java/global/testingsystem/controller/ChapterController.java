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

import global.testingsystem.entity.Chapter;
import global.testingsystem.entity.Subject;
import global.testingsystem.service.ChapterService;
import global.testingsystem.service.SubjectService;
import global.testingsystem.util.ConstantPage;

/**
 * @author USER
 *
 */
@CrossOrigin(origins = "*")
@RestController
public class ChapterController {

        @Autowired
        private ChapterService chapterService;
        @Autowired
        private SubjectService subjectService;

        @GetMapping(value = ConstantPage.REST_API_GET_ALL_CHAPTER, produces = {
                        MediaType.APPLICATION_PROBLEM_JSON_VALUE })
        public List<Object> getListChapter() {
                return chapterService.getListChapter();
        }
        
        @GetMapping(value = "/listchapter",  produces = {
                        MediaType.APPLICATION_PROBLEM_JSON_VALUE })
        public List<Chapter> listChapter(){
        	return chapterService.listChapter();
        }

        @DeleteMapping(value = ConstantPage.REST_API_DELETE_CHAPTER_BY_ID, produces = {
                        MediaType.APPLICATION_PROBLEM_JSON_VALUE })
        public boolean delete(@PathVariable int id) {
        	List<Integer> chapters = chapterService.getAllSubId(id);
        	if(chapters != null) {
        		for (int i = 0; i < chapters.size(); i++) {
					chapterService.deleteChapter(chapters.get(i));
				}
        	}
                return chapterService.deleteChapter(id);
        }

        @PostMapping(value = ConstantPage.REST_API_UPDATE_CHAPTER, produces = {
                        MediaType.APPLICATION_PROBLEM_JSON_VALUE })
        public ResponseEntity<Object> update(@RequestParam("chapter") String chapter) {
                JSONObject jsonObject = new JSONObject(chapter);
                int id = jsonObject.getInt("id");
                String name = jsonObject.getString("name");
                int parent_id = jsonObject.getInt("parent_name");
                int subject_id = jsonObject.getInt("subject_name");
                Subject subject = subjectService.findSubjectById(subject_id);
                List<Chapter> chapters = chapterService.getListChapterByName(name);
                if(chapters != null) {
                	for (int i = 0; i < chapters.size(); i++) {
						if(chapters.get(i).getSubject().equals(subject) && chapters.get(i).getId() != id) {
							return new ResponseEntity<>("Error", HttpStatus.BAD_REQUEST);
						}
					}
                }
                Chapter chapterUpdate = chapterService.findChapterById(id);
                chapterUpdate.setSubject(subject);
                chapterUpdate.setName(name);
                chapterUpdate.setParent_id(parent_id);
                chapterUpdate.setCreated_at(chapterUpdate.getCreated_at());
                Date date = new Date();
                java.sql.Date sqlDate = new java.sql.Date(date.getTime());
                chapterUpdate.setUpdated_at(sqlDate);
                boolean isSuccess = chapterService.editChapter(chapterUpdate);
                return new ResponseEntity<Object>(isSuccess, HttpStatus.OK);
        }

        @PostMapping(value = ConstantPage.REST_API_INSERT_CHAPTER, produces = {
                        MediaType.APPLICATION_PROBLEM_JSON_VALUE })
        public ResponseEntity<Object> insert(@RequestParam("chapter") String chapter) {
                JSONObject jsonObject = new JSONObject(chapter);
                String name = jsonObject.getString("name");
                int parent_id = jsonObject.getInt("parent_name");
                int subject_id = jsonObject.getInt("subject_name");
                Subject subject = subjectService.findSubjectById(subject_id);
                List<Chapter> chapters = chapterService.getListChapterByName(name);
                if(chapters != null) {
                	for (int i = 0; i < chapters.size(); i++) {
						if(chapters.get(i).getSubject().equals(subject)) {
							return new ResponseEntity<>("Error", HttpStatus.BAD_REQUEST);
						}
					}
                }
 
                Chapter chapterInsert = new Chapter();                
                chapterInsert.setName(jsonObject.getString("name"));
                chapterInsert.setSubject(subject);
                chapterInsert.setParent_id(parent_id);
                Date date = new Date();
                java.sql.Date sqlDate = new java.sql.Date(date.getTime());
                chapterInsert.setCreated_at(sqlDate);
                boolean isSuccsess = chapterService.addChapter(chapterInsert);
                return new ResponseEntity<Object>(isSuccsess, HttpStatus.OK);
        }

        @GetMapping(value = ConstantPage.REST_API_SEARCH_CHAPTER, produces = {
                        MediaType.APPLICATION_PROBLEM_JSON_VALUE })
        public List<Object> searchChapterbyName(@RequestParam String key) {
        	List<Object> chapters = chapterService.searchChapterByName(key);
                return chapters;
        }

        @GetMapping(value = ConstantPage.REST_API_SORT_CHAPTER, produces = { MediaType.APPLICATION_PROBLEM_JSON_VALUE })
        public List<Chapter> sortChapterByName(@RequestParam String name) {
                return chapterService.sortChapterByName(name);
        }
        
        @GetMapping(value = ConstantPage.REST_API_GETCHAPTERBYSUBJECT,produces= {MediaType.APPLICATION_JSON_VALUE})
        public List<Chapter> getChapterBySubject(@PathVariable("idSubject") int idSubject){
        	return chapterService.getListChapterBySubject(idSubject);
        }

        @GetMapping(value = ConstantPage.REST_API_GETCHAPTERBYSUBJECT_AND_PARENT,produces= {MediaType.APPLICATION_JSON_VALUE})
        public List<Chapter> getChapterBySubjectAndParent(@PathVariable("idSubject") int idSubject){
        	return chapterService.getListChapterBySubjectAndParent(idSubject);
        }

}
