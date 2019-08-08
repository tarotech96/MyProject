/**
 * 
 */
package global.testingsystem.controller;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

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

import global.testingsystem.entity.CustomError;
import global.testingsystem.entity.Menu;
import global.testingsystem.entity.Permission;
import global.testingsystem.entity.Role;
import global.testingsystem.service.MenuService;
import global.testingsystem.service.PermisssionService;
import global.testingsystem.service.RoleService;
import global.testingsystem.util.ConstantPage;

/**
 * @author USER
 *
 */
@CrossOrigin(origins = "*")
@RestController
public class RoleController{
	
	public RoleController() {
		super();
		// TODO Auto-generated constructor stub
	}
	@Autowired
	private RoleService roleService;
	@Autowired
	private PermisssionService permissionService;
	@Autowired
	private MenuService menuService;
	/* ---------------- GET ALL ROLE hvn ------------------------ */
	 @GetMapping(value = ConstantPage.REST_API_GET_ALL_ROLE,
	    		produces = { MediaType.APPLICATION_PROBLEM_JSON_VALUE, })
	    public List<Role> list() {
	        List<Role> listRole = roleService.list();
	        return listRole;
	    }
	 /* ---------------- DELETE ROLE hvn ------------------------ */
	 @DeleteMapping(value = ConstantPage.REST_API_DELETE_ROLE_BY_ID,
	    		produces = { MediaType.APPLICATION_PROBLEM_JSON_VALUE, })
	    public boolean delete(@PathVariable int id) {
	        return roleService.delete(id);
	    }
	 /* ---------------- ADD ROLE ------------------------ */
	 @PostMapping(value = ConstantPage.REST_API_INSERT_ROLE)
	    public ResponseEntity<Object> insert( @RequestParam("role") String role) {
	        // parse JSONstring to JSONobject
	        JSONObject jsonObject = new JSONObject(role);
	        String name = jsonObject.getString("name");
	        Role checkRole=roleService.findByName(name);
	        if(checkRole!=null) throw new CustomError.GeneralError("Role đã tồn tại ^^!");
	        
	        else
	        {
	        String description = jsonObject.getString("description");
	       // init new users
	        Role roles = new Role(name, description);
	       // update an object of slidebar
	        boolean isSuccess = roleService.add(roles);
	        return new ResponseEntity<>(isSuccess, HttpStatus.OK);
	        }
	    }
	 /* ---------------- UPDATE USER ------------------------ */
	 @PostMapping(value = ConstantPage.REST_API_UPDATE_ROLE)
	    public ResponseEntity<Object> update( @RequestParam("role") String role) {
		 JSONObject jsonObject = new JSONObject(role);
	        int id = jsonObject.getInt("id");
	        String name = jsonObject.getString("name");
	         Role checkRole=roleService.findByName(name);
	        if(checkRole!=null)if(checkRole.getId()!=id) return new ResponseEntity<>("Role đã tồn tại!", HttpStatus.BAD_REQUEST);
	        String description = jsonObject.getString("description");
	       // init new users
	        Role editRole=roleService.findById(id);
	        editRole.setName(name);
	        editRole.setDescription(description);
	       // update an object of slidebar
	        boolean isSuccess = roleService.edit(editRole);
	        return new ResponseEntity<>(isSuccess, HttpStatus.OK);

	    }
	 @GetMapping(value = ConstantPage.REST_API_SORT_ROLE,
	    		produces = { MediaType.APPLICATION_PROBLEM_JSON_VALUE, })
	    public List<Role> getSortRole() {
	        List<Role> listRole = roleService.sortByName();
	        return listRole;
	    }
	 @PostMapping(value = ConstantPage.REST_API_SEARCH_KEY_ROLE,
	    		produces = { MediaType.APPLICATION_PROBLEM_JSON_VALUE, })
	    public List<Role> searchRole(@RequestParam("data") String data) {
		 JSONObject jsonObject = new JSONObject(data);
	        String key = jsonObject.getString("key");
	        List<Role> listRole = roleService.search(key);
	        return listRole;
	    }
	 
	 @GetMapping(value = ConstantPage.REST_API_SORT_ROLE_KEY,
	    		produces = { MediaType.APPLICATION_PROBLEM_JSON_VALUE, })
	    public List<Role> getSortRole(@PathVariable String  key) {
		    	return roleService.sortByNameSearch(key);
	        
	    }	
	/*                     Matrix RolePermission and RoleMenu                     */
	
	 
	 @PostMapping(value = ConstantPage.REST_API_ROLE_PERMISSION)
	public Role addRolePermission(@RequestParam String nameRole, @RequestParam String namePermission) {
		try {
			Role role = roleService.getRoleByName(nameRole);
			Permission permission = permissionService.getPermissionByName(namePermission);
			role.addPermission(permission);
			roleService.saveRole(role);
			return role;
		} catch (Exception e) {
			// TODO: handle exception
			return null;
		}
	}
	@GetMapping(value = "role/getAllRolePermission", produces = "application/json")
	public Map<String, String> getAllRolePermission() {
		try {
			Map<String, String> result = new HashMap<>();
			String value = "";
			List<Object[]> listRolePermission = roleService.getAllRolePermission();
			int length = listRolePermission.size();
			for (int index = 0; index < length; index++) {
				Object[] list = listRolePermission.get(index);
				value += list[0] + "," + list[1];
				if (index != length - 1) {
					value += ",";
				}
			}
			result.put("response", value);
			return result;
		} catch (Exception e) {
			return null;
		}
	}
	@GetMapping(value="role/getAllRoleMenu",produces = "application/json")
	public Map<String, String> getAllRoleMenu() {
		try {
			Map<String, String> result = new HashMap<>();
			String value = "";
			List<Object[]> listRoleMenu = roleService.getAllRoleMenu();
			int length = listRoleMenu.size();
			for (int index = 0; index < length; index++) {
				Object[] list = listRoleMenu.get(index);
				value += list[0] + "," + list[1];
				if (index != length - 1) {
					value += ",";
				}
			}
			result.put("response", value);
			return result;
		} catch (Exception e) {
			return null;
		}
	}
	@PostMapping(value = "role/addRoleMenu")
	public Role addRoleMenu(@RequestParam String nameRole, @RequestParam String nameMenu) {
		try {
			Role role = roleService.getRoleByName(nameRole);
			Menu menu = menuService.getMenuByName(nameMenu);
			role.addMenu(menu);
			if(menu.getParent_id()!=0) {
				Menu menuParent = menuService.getMenuById(menu.getParent_id());
				role.addMenu(menuParent);
			}
			roleService.saveRole(role);
			return role;
		} catch (Exception e) {
			// TODO: handle exception
			return null;
		}
	}
	@PostMapping(value="role/removeRoleMenu", produces = "application/json")
	public Role removeRoleMenu(@RequestParam String nameRole, @RequestParam String nameMenu) {
		try {
			Role role = roleService.getRoleByName(nameRole);
			Menu menu = menuService.getMenuByName(nameMenu);
			role.removeMenu(menu);
			if(menu.getParent_id()==0) {
				Set<Menu> setMenu= role.getMenus();
				 Iterator<Menu> iterator = null;
				 iterator=setMenu.iterator();
				 while (iterator.hasNext()) {
				       Menu tem=iterator.next();
				       if(tem.getParent_id()==menu.getId())
				       { iterator.remove();
				    	  role.removeMenu(tem);
				         
				       }
				    }
			}
			roleService.saveRole(role);
			return role;
		}catch (Exception e) {
			// TODO: handle exception
			return null;
		}
	}
	@PostMapping(value="role/removeRolePermission", produces = "application/json")
	public Role removeRolePermission(@RequestParam String nameRole, @RequestParam String namePermission) {
		try {
			Role role = roleService.getRoleByName(nameRole);
			Permission permission = permissionService.getPermissionByName(namePermission);
			role.removePermission(permission);
			roleService.saveRole(role);
			return role;
		}catch (Exception e) {
			// TODO: handle exception
			return null;
		}
	}
	///lâm
	@GetMapping(value = ConstantPage.REST_API_SEARCH_ROLE_PERMISSION, produces = { MediaType.APPLICATION_PROBLEM_JSON_VALUE })
	public List<Object> searchRolePermission(@RequestParam("name") String name) {
		return roleService.searchRolePermission(name);
	}
	////

	
	

}
