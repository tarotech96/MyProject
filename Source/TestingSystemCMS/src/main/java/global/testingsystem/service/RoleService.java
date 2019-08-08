/**
 * 
 */
package global.testingsystem.service;

import java.util.List;

import global.testingsystem.entity.Role;

/**
 * @author USER
 *
 */
public interface RoleService {
	List<Role> list();

	Role findById(int id);

	Role findByName(String name);

	boolean add(Role role);

	boolean delete(int id);

	boolean edit(Role role);

	List<Role> getByPermission(int id);

	List<Role> getByUser(String email);
	
	List<Role> sortByName();
	
	List<Role> sortByNameSearch(String name);
	
	List<Role> search(String key);

	Role getRoleByName(String nameRole);

	Role saveRole(Role role);

	List<Object[]> getAllRolePermission();

	List<Object[]> getAllRoleMenu();

	void deleteRolePermission(int roleId, int permissionId);
	
	String getAllMenuAndPermission(int userId);
	/////////////lâm
	List<Object> searchRolePermission(String name);
	
	/////////////
}
