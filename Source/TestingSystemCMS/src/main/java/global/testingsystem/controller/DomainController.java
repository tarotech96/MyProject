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

import global.testingsystem.entity.Domain;
import global.testingsystem.entity.Subject;
import global.testingsystem.service.DomainService;
import global.testingsystem.service.SubjectService;
import global.testingsystem.util.ConstantPage;

/**
 * @author USER
 *
 */
@CrossOrigin(origins = "*")
@RestController
public class DomainController {

        @Autowired
        private DomainService domainService;

        @Autowired
        private SubjectService subjectService;
        @GetMapping(value = ConstantPage.REST_API_GET_ALL_DOMAIN, produces = {
                        MediaType.APPLICATION_PROBLEM_JSON_VALUE })
        public List<Object> getListDomain() {
                return domainService.getListDomain();
        }

        @DeleteMapping(value = ConstantPage.REST_API_DELETE_DOMAIN_BY_ID, produces = {
                        MediaType.APPLICATION_PROBLEM_JSON_VALUE })
        public boolean delete(@PathVariable int id) {
                return domainService.deleteDomain(id);
        }

        @PostMapping(value = ConstantPage.REST_API_UPDATE_DOMAIN, produces = {
                        MediaType.APPLICATION_PROBLEM_JSON_VALUE })
        public ResponseEntity<Object> update(@RequestParam("domain") String domain) {
                JSONObject jsonObject = new JSONObject(domain);
                int id = jsonObject.getInt("id");
                String name = jsonObject.getString("name");
                int subject_id = jsonObject.getInt("subject_name");
                Subject subject = subjectService.findSubjectById(subject_id);
                List<Domain> domains = domainService.getListDomainByName(name);
                if(domains != null) {
                	for (int i = 0; i < domains.size(); i++) {
    					if(domains.get(i) != null && domains.get(i).getSubject().equals(subject) && domains.get(i).getId() != id) {
    						 return new ResponseEntity<>("Error", HttpStatus.BAD_REQUEST);
    					}
    				}
                }
                        Domain domainUpdate =domainService.finDomainById(id); 
                        domainUpdate.setName(name);
                        Date date = new Date();
                        java.sql.Date sqlDate = new java.sql.Date(date.getTime());
                        domainUpdate.setCreated_at(domainUpdate.getCreated_at());
                        domainUpdate.setUpdated_at(sqlDate);
                        domainUpdate.setSubject(subject);
                        boolean isSuccess = domainService.editDomain(domainUpdate);
                        System.out.println("OK");
                        return new ResponseEntity<Object>(isSuccess, HttpStatus.OK);
                
        }

        @PostMapping(value = ConstantPage.REST_API_INSERT_DOMAIN, produces = {
                        MediaType.APPLICATION_PROBLEM_JSON_VALUE })
        public ResponseEntity<Object> insert(@RequestParam("domain") String domain) {
                JSONObject jsonObject = new JSONObject(domain);
                String name = jsonObject.getString("name");  
                int subject_id = jsonObject.getInt("subject_name");
                Subject subject = subjectService.findSubjectById(subject_id);
                List<Domain> domains = domainService.getListDomainByName(name);
                if(domains != null) {
                	for (int i = 0; i < domains.size(); i++) {
    					if(domains.get(i) != null && domains.get(i).getSubject().equals(subject)) {
    						 return new ResponseEntity<>("Error", HttpStatus.BAD_REQUEST);
    					}
    				}
                }
                	Domain domainInsert = new Domain();
                    domainInsert.setName(name);
                    Date date = new Date();
                    java.sql.Date sqlDate = new java.sql.Date(date.getTime());
                    domainInsert.setCreated_at(sqlDate);
                    domainInsert.setSubject(subject);
                    boolean isSuccsess = domainService.addDomain(domainInsert);
                    return new ResponseEntity<Object>(isSuccsess, HttpStatus.OK);
                             
        }

        @GetMapping(value = ConstantPage.REST_API_SEARCH_DOMAIN, produces = {
                        MediaType.APPLICATION_PROBLEM_JSON_VALUE })
        public List<Object> search(@RequestParam String key) {
                return domainService.searchDomainByName(key);
        }

        @GetMapping(value = ConstantPage.REST_API_SORT_DOMAIN, produces = { MediaType.APPLICATION_PROBLEM_JSON_VALUE })
        public List<Domain> sortDomainByName(@RequestParam String name) {
                return domainService.sortDomainByName(name);
        }
        @GetMapping(value=ConstantPage.REST_API_GETDOMAINBYSUBJECT,produces= {MediaType.APPLICATION_PROBLEM_JSON_VALUE})
        public List<Domain> getListDomainBySubject(@PathVariable int idSubject){
        	return domainService.getListDomainBySubject(idSubject);
        }

}
