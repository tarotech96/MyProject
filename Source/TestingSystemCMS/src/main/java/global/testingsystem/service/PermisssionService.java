package global.testingsystem.service;

import java.util.List;
import java.util.Optional;

import global.testingsystem.entity.Permission;

public interface PermisssionService {
	/**
	 * @description: Get list permission
	 * @create_date: Dec 3, 2018
	 * @author: pnthanh@cmc.com.vn
	 * @modify_date: Dec 3, 2018
	 * @modifier: Pham Ngoc Thanh
	 * @return List Permission
	 */
	List<Permission> getListPermission();

	/**
	 * @description: Add permission
	 * @create_date: Dec 3, 2018
	 * @author: pnthanh@cmc.com.vn
	 * @modify_date: Dec 3, 2018
	 * @modifier: Pham Ngoc Thanh
	 * @param permission
	 * @return if add User success return true / if add User false return false
	 */
	boolean addPermission(Permission permission);

	/**
	 * @description: Delete Permission
	 * @create_date: Dec 3, 2018
	 * @author: pnthanh@cmc.com.vn
	 * @modify_date: Dec 3, 2018
	 * @modifier: Pham Ngoc Thanh
	 * @param permissionId
	 * @return if delete User success return true / if delete User false return false
	 */
	boolean deletePermission(Integer permissionId);

	/**
	 * @description: Find permission by permissionId
	 * @create_date: Dec 3, 2018
	 * @author: pnthanh@cmc.com.vn
	 * @modify_date: Dec 3, 2018
	 * @modifier: Pham Ngoc Thanh
	 * @param permissionId
	 * @return	delete 1 instance permission
	 */
	Optional<Permission> findById(Integer permissionId);
	
	/**
	 * @description: Edit Permission
	 * @create_date: Dec 4, 2018
	 * @author: pnthanh@cmc.com.vn
	 * @modify_date: Dec 4, 2018
	 * @modifier: Pham Ngoc Thanh
	 * @param permission
	 * @return 1 instance permission
	 */
	boolean editPermission(Permission permission);
	
	Permission findPermission(String controller, String action);
	
	Boolean checkRolePermission(String controller, String action);
	
	Permission getPermissionByName(String permissionName);
	 
	 Permission findByControllerAndAction(String controller, String action);
	 
	 List<Permission> search(String key);
}
