package global.testingsystem.service.impl;

import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import global.testingsystem.entity.Permission;
import global.testingsystem.entity.Role;
import global.testingsystem.repository.PermissionRepository;
import global.testingsystem.repository.RoleRepository;
import global.testingsystem.service.PermisssionService;
@Service
public class PermisssionServiceImpl implements PermisssionService {
	private PermissionRepository permissionRepository;
	private RoleRepository roleRepository;
	@Autowired
	public PermisssionServiceImpl(PermissionRepository permissionRepository, RoleRepository roleRepository) {
		this.permissionRepository = permissionRepository;
		this.roleRepository = roleRepository;
	}

	@Override
	public List<Permission> getListPermission() {
		List<Permission> permissions = permissionRepository.findAll();
		return permissions;
	}

	@Override
	public boolean addPermission(Permission permission) {
		permissionRepository.save(permission);
		return true;
	}

	@Override
	public boolean deletePermission(Integer permissionId) {
		permissionRepository.deleteById(permissionId);
		return true;
	}

	@Override
	public Optional<Permission> findById(Integer permissionId) {
		return permissionRepository.findById(permissionId);
	}

	@Override
	public boolean editPermission(Permission permission) {
		permissionRepository.save(permission);
		return true;
	}
	
	@Override
	public Permission findPermission(String controller, String action) {		
		return permissionRepository.findByControllerAndAction(controller, action);
	}
	
	@Override
	public Boolean checkRolePermission(String controller, String action) {
//		Authentication authentication = ((org.springframework.security
//		        .core.context.SecurityContextImpl)session()
//		        .getAttribute("SPRING_SECURITY_CONTEXT")).getAuthentication();
		List<Role> roleUser = roleRepository.findByUsers_Email("email@gmail.com");
		
		Permission permission = permissionRepository.findByControllerAndAction(controller, action);
		List<Role> rolePermission = roleRepository.findByPermissions_Id(permission.getId());
		
		if(roleUser == null && rolePermission == null ) {
			return false;
		}
		if(roleUser.equals(rolePermission)) {
			return true;
		}		
		return false;
	} 
	
	 public HttpSession session() {
		    ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder
		          .currentRequestAttributes();
		    return attr.getRequest().getSession(true); // true == allow create
		  }

	@Override
	public Permission getPermissionByName(String permissionName) {
		// TODO Auto-generated method stub
		try {
			return permissionRepository.getPermissionByName(permissionName);
		}catch (Exception e) {
			// TODO: handle exception
			return null;
		}
	}

	@Override
	public Permission findByControllerAndAction(String controller, String action) {
		return permissionRepository.findByControllerAndAction(controller, action);
	}

	@Override
	public List<Permission> search(String key) {
		// TODO Auto-generated method stub
		return permissionRepository.findByNameContainingOrControllerContainingOrActionContaining(key, key, key);
	}
}
