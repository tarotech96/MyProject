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

import global.testingsystem.dto.ListUserGroupDTO;
import global.testingsystem.entity.Group;
import global.testingsystem.service.GroupService;
import global.testingsystem.util.ConstantPage;

@RestController
@CrossOrigin(origins = "*")
public class GroupController {
        private GroupService groupService;

        @Autowired
        public GroupController(GroupService groupService) {
                this.groupService = groupService;
        }

        @GetMapping(value = ConstantPage.REST_API_GET_GROUP_BY_ID, produces = {
                        MediaType.APPLICATION_PROBLEM_JSON_VALUE })
        public Group findGroupById(@PathVariable int id) {
                return groupService.findById(id);
        }

        @GetMapping(value = ConstantPage.REST_API_GET_ALL_GROUP, produces = {
                        MediaType.APPLICATION_PROBLEM_JSON_VALUE })
        public List<Group> list() {
                List<Group> groups = groupService.list();
                return groups;
        }

        @GetMapping(value = ConstantPage.REST_API_GET_ALL2_GROUP, produces = {
                        MediaType.APPLICATION_PROBLEM_JSON_VALUE })
        public List<Object> getListGroup() {
                return groupService.getlistGroup();
        }

        @DeleteMapping(value = ConstantPage.REST_API_DELETE_GROUP_BY_ID, produces = {
                        MediaType.APPLICATION_PROBLEM_JSON_VALUE })
        public Boolean delete(@PathVariable int id) {    
        	List<Integer> groups = groupService.getAllSubId(id);
        	if(groups != null) {
        		for (int i = 0; i < groups.size(); i++) {
        			groupService.delete(groups.get(i));
    			}
        	}       		        	
	        	return groupService.delete(id);
        }

        @PostMapping(value = ConstantPage.REST_API_UPDATE_GROUP, produces = { MediaType.APPLICATION_JSON_VALUE })
        public ResponseEntity<Object> update(@RequestParam("group") String group) {
                JSONObject jsonObject = new JSONObject(group);
                int id = jsonObject.getInt("id");
                String name = jsonObject.getString("name");
//                int parent_id = jsonObject.getInt("parent_name");
//                String type = jsonObject.getString("type");
                Group checkGroup = groupService.findGroupByName(name);
                if (checkGroup != null) {
                        if (checkGroup.getId() != id)
                                return new ResponseEntity<>("ERROR!", HttpStatus.BAD_REQUEST);
                }
                Group groupUpdate = groupService.findById(id);
                groupUpdate.setName(name);
//                groupUpdate.setParent_id(parent_id);
//                groupUpdate.setType(type);
                groupUpdate.setCreated_at(groupUpdate.getCreated_at());
                Date date = new Date();
                java.sql.Date sqlDate = new java.sql.Date(date.getTime());
                groupUpdate.setUpdated_at(sqlDate);
                boolean isSuccess = groupService.update(groupUpdate);
                return new ResponseEntity<Object>(isSuccess, HttpStatus.OK);
        }

        @PostMapping(value = ConstantPage.REST_API_INSERT_GROUP, produces = { MediaType.APPLICATION_JSON_VALUE })
        public ResponseEntity<Object> insert(@RequestParam("group") String group) {
                JSONObject jsonObject = new JSONObject(group);
                String name = jsonObject.getString("name");
//                int parent_id = jsonObject.getInt("parent_name");
                Group checkGroup = groupService.findGroupByName(name);
                if (checkGroup != null) {
                        return new ResponseEntity<>("Error", HttpStatus.BAD_REQUEST);
                }
                Group groupInsert = new Group();
                groupInsert.setName(name);
                Date date = new Date();
                java.sql.Date sqlDate = new java.sql.Date(date.getTime());
                groupInsert.setCreated_at(sqlDate);
                groupInsert.setParent_id(0);
                groupInsert.setType("");
                boolean isSuccsess = groupService.insert(groupInsert);
                return new ResponseEntity<Object>(isSuccsess, HttpStatus.OK);

        }

        @GetMapping(value = ConstantPage.REST_API_SEARCH_GROUP, produces = { MediaType.APPLICATION_JSON_VALUE })
        public List<Object> searchGroupByName(@RequestParam String key) {
                return groupService.searchGroupByName(key);
        }

        @GetMapping(value = ConstantPage.REST_API_SORT_GROUP, produces = { MediaType.APPLICATION_JSON_VALUE })
        public List<Group> sortGroupByName(@RequestParam String name) {
                return groupService.sortGroupByName(name);
        }
        
        @GetMapping(value = ConstantPage.REST_API_LIST_USER_GROUP, produces = { MediaType.APPLICATION_JSON_VALUE })
        public ListUserGroupDTO listUser(@PathVariable int id,@RequestParam("searchKey") String searchKey) {
                return groupService.listUser(id,searchKey);
        }
    	@GetMapping(value = ConstantPage.REST_API_ADD_USER_GROUP, produces = { MediaType.APPLICATION_PROBLEM_JSON_VALUE })
    	public ListUserGroupDTO addUserGroup(@RequestParam("groupId") String groupId,@RequestParam("listUser") String listUser,@RequestParam("searchKey") String searchKey ) {
    		ListUserGroupDTO result = groupService.addUserGroup(Integer.parseInt(groupId), listUser,searchKey);
    		return result;
    	}
    	@GetMapping(value = ConstantPage.REST_API_REMOVE_USER_GROUP, produces = { MediaType.APPLICATION_PROBLEM_JSON_VALUE })
    	public ListUserGroupDTO removeUserGroup(@RequestParam("groupId") String groupId,@RequestParam("userId") String userId,@RequestParam("searchKey") String searchKey  ) {
    		ListUserGroupDTO result = groupService.removeUserGroup(Integer.parseInt(groupId), Integer.parseInt(userId),searchKey);
    		return result;
    	}
}