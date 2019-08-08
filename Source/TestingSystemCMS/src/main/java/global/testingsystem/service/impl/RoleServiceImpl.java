/**
 * 
 */
package global.testingsystem.service.impl;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import global.testingsystem.entity.Role;
import global.testingsystem.repository.RoleRepository;
import global.testingsystem.service.RoleService;

/**
 * @author USER
 *
 */
@Service
public class RoleServiceImpl implements RoleService {

	private static Logger log = Logger.getLogger(RoleServiceImpl.class);
	@Autowired
	private RoleRepository roleRepository;
	/*
	 * (non-Javadoc)
	 * 
	 * @see global.testingsystem.service.RoleService#list()
	 */

	@Override
	public List<Role> list() {
		return roleRepository.findAllByOrderByIdDesc();
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see global.testingsystem.service.RoleService#findById(int)
	 */
	@Override
	public Role findById(int id) {
		for (Role role : roleRepository.findAll()) {
			if (role.getId() == id) {
				return role;
			}
		}
		return null;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * global.testingsystem.service.RoleService#add(global.testingsystem.entity.
	 * Role)
	 */
	@Override
	public boolean add(Role role) {
		boolean isSuccess = false;
		Role addRole = roleRepository.save(role);
		if (addRole != null) {
			isSuccess = true;
		} else {
			isSuccess = false;
			log.error("insert fall ");
		}
		return isSuccess;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see global.testingsystem.service.RoleService#delete(int)
	 */
	@Override
	public boolean delete(int id) {
		boolean isSuccess = false;
		Role role = roleRepository.getOne(id);
		try {
			roleRepository.delete(role);
			isSuccess = true;
		} catch (Exception e) {
			log.error("delete failed" + e.getMessage());
			isSuccess = false;
		}
		return isSuccess;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * global.testingsystem.service.RoleService#edit(global.testingsystem.entity.
	 * Role)
	 */
	@Override
	public boolean edit(Role role) {
		boolean isSuccess = false;
		Role aditRole = roleRepository.save(role);
		if (aditRole != null) {
			isSuccess = true;
		} else {
			isSuccess = false;
			log.error("insert fall ");
		}
		return isSuccess;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see global.testingsystem.service.RoleService#findByName(java.lang.String)
	 */
	@Override
	public Role findByName(String name) {
		// TODO Auto-generated method stub
		return roleRepository.findByName(name);
	}

	@Override
	public List<Role> getByUser(String email) {
		return roleRepository.findByUsers_Email(email);
	}

	@Override
	public List<Role> getByPermission(int id) {
		return roleRepository.findByPermissions_Id(id);
	}

	@Override
	public List<Role> sortByName() {
		return roleRepository.findAllByOrderByNameAsc();
	}

	@Override
	public List<Role> sortByNameSearch(String name) {
		return roleRepository.findByNameContainingOrderByNameAsc(name);
	}

	public List<Role> search(String name) {
		return roleRepository.findByNameContaining(name);

	}

	public Role getRoleByName(String nameRole) {
		try {
			return roleRepository.getRoleByName(nameRole);
		} catch (Exception e) {
			return null;
		}
	}

	@Override
	public Role saveRole(Role role) {
		// TODO Auto-generated method stub
		try {
			roleRepository.save(role);
			return role;
		} catch (Exception e) {
			// TODO: handle exception
			return null;
		}
	}

	@Override
	public List<Object[]> getAllRolePermission() {
		// TODO Auto-generated method stub
		try {
			return roleRepository.getAllRolePermission();
		} catch (Exception e) {
			e.printStackTrace();
			// TODO: handle exception
			return null;
		}
	}

	@Override
	public void deleteRolePermission(int roleId, int permissionId) {
		// TODO Auto-generated method stub
		try {
			roleRepository.removeRolePermission(roleId, permissionId);
		} catch (Exception e) {
			// TODO: handle exception
		}
	}

	@Override
	public List<Object[]> getAllRoleMenu() {
		try {
			return roleRepository.getAllRoleMenu();
		} catch (Exception e) {
			e.printStackTrace();
			// TODO: handle exception
			return null;
		}
	}

	@Override
	public String getAllMenuAndPermission(int userId) {
		// TODO Auto-generated method stub
		String result = "";
		try {
			List<Object[]> listPermission = roleRepository.getAllRolePermissionById(userId);
			int length = listPermission.size();
			length = listPermission.size();
			for (int index = 0; index < length; index++) {
				Object[] list = listPermission.get(index);
				result +=  list[0] + "," + list[1]+","+list[2]+","+list[3];
				if (index != length - 1) {
					result += ",";
				}
			}

			return result;
		} catch (Exception e) {
			e.printStackTrace();
			// TODO: handle exception
			return null;
		}
	}
	///////lâm

	@Override
	public List<Object> searchRolePermission(String name) {
		// TODO Auto-generated method stub
		return roleRepository.searchRolePermission(name) ;
	}
	
	////////
}
