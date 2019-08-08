package global.testingsystem.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import global.testingsystem.entity.Permission;
import global.testingsystem.service.PermisssionService;
import global.testingsystem.util.ConstantPage;
import global.testingsystem.util.Utils;

@CrossOrigin(origins = "*")
@RestController
public class PermissionController  {
	public PermissionController() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Autowired
	private PermisssionService permisssionService;
	Map<String, String> mapController = new HashMap<>();
	@Autowired
	private HttpServletResponse response;
	@Autowired
	private HttpServletRequest request;
	@GetMapping(value = ConstantPage.REST_API_GET_ALL_PERMISSION, produces = { MediaType.APPLICATION_PROBLEM_JSON_VALUE })
	public List<Permission> list() {
		List<Permission> permissions = permisssionService.getListPermission();
		return permissions;
	}

	@GetMapping(value = ConstantPage.REST_API_GET_ALL_CONTROLLER_PERMISSION, produces = { MediaType.APPLICATION_PROBLEM_JSON_VALUE })
	public List<String> getListController() {
		List<String> result = new ArrayList<>();
		List<Class<?>> classes = Utils.find("global.testingsystem.controller");
		for (Class<?> class1 : classes) {
			String endIndex = class1.getName();
			String[] amfnasjk = endIndex.split("\\.");
			int length = amfnasjk[3].length();
			String newName = amfnasjk[3].substring(0, length - 10).toLowerCase();
			result.add(newName);
		}
		return result;
	}

	@GetMapping(value = ConstantPage.REST_API_GET_ALL_ACTION_PERMISSION, produces = { MediaType.APPLICATION_PROBLEM_JSON_VALUE })
	public List<String> getListMethodByControllerName(@RequestParam("nameController") String nameController) {
		List<String> result = new ArrayList<>();
		List<Class<?>> classes = Utils.find("global.testingsystem.controller");
		for (Class<?> class1 : classes) {
			String endIndex = class1.getName();
			String[] controllerName = endIndex.split("\\.");
			int length = controllerName[3].length();
			String oldName = controllerName[3].substring(0, length - 10);
			String newName = controllerName[3].substring(0, length - 10).toLowerCase();
			mapController.put(newName, oldName);
		}
		String oldName = mapController.get(nameController);
		result = Utils.getMethod(oldName);
		return result;
	}

	@DeleteMapping(value = ConstantPage.REST_API_DELETE_PERMISSION_BY_ID, produces = { MediaType.APPLICATION_JSON_VALUE })
	@ResponseBody
	public boolean delete(@PathVariable int id) {
		return permisssionService.deletePermission(id);
	}

	@PostMapping(value = ConstantPage.REST_API_UPDATE_PERMISSION, produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<Object> update(@RequestParam("permission") String permission) {
		JSONObject jsonObject = new JSONObject(permission);
		int id = jsonObject.getInt("id");
		String controller = jsonObject.getString("controller");
		String action = jsonObject.getString("action");
		Permission checkPermission = permisssionService.findByControllerAndAction(controller, action);
		if(checkPermission != null) {
			if(checkPermission.getId() != id)
			return new ResponseEntity<>("Không được trùng", HttpStatus.BAD_REQUEST);
		}
		Permission p = new Permission();
		p.setId(id);
		p.setName(jsonObject.getString("name"));
		p.setDescription(jsonObject.getString("description"));
		p.setController(controller);
		p.setAction(action);
		p.setRole(null);
		boolean isSuccess = permisssionService.editPermission(p);
		return new ResponseEntity<>(isSuccess, HttpStatus.OK);
	}

	@PostMapping(value = ConstantPage.REST_API_INSERT_PERMISSION, produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<Object> insert(@RequestParam("permission") String permission) {
		JSONObject jsonObject = new JSONObject(permission);
		String action = jsonObject.getString("action");
		String controller = jsonObject.getString("controller");
		if(permisssionService.findByControllerAndAction(controller, action) != null) {
			return new ResponseEntity<>("Không được trùng", HttpStatus.BAD_REQUEST);
		}
		Permission p = new Permission();
		p.setName(jsonObject.getString("name"));
		String description = jsonObject.getString("description");
		p.setDescription(jsonObject.getString("description"));
		p.setController(controller);
		p.setAction(action);
		p.setRole(null);
		boolean isSuccess = permisssionService.addPermission(p);
		return new ResponseEntity<>(isSuccess, HttpStatus.OK);
	}
	
	@PostMapping(value= ConstantPage.REST_API_SEARCH_PERMISSION)
	public List<Permission> search(@RequestParam("data") String data){
		JSONObject jsonObject = new JSONObject(data);
		String key = jsonObject.getString("key");
		List<Permission> list = permisssionService.search(key);
		return list;
	}
}
