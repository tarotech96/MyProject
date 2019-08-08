package global.testingsystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import global.testingsystem.entity.Permission;

public interface PermissionRepository extends JpaRepository<Permission, Integer> {
	Permission findByControllerAndAction(String controller, String action);

	@Query(value = "select *from Permission where name =:name", nativeQuery = true)
	Permission getPermissionByName(@Param("name") String namePermission);

	List<Permission> findByNameContainingOrControllerContainingOrActionContaining(String name, String controller,
			String action);
	@Query(value = "select count(*) from permission where action=:action and controller=:controller ", nativeQuery = true)
    Integer checkExistPermissionSystem(@Param("controller") String controller,@Param("action") String action);
	@Query(value = "select count(*) from users_role ur inner join role_permission rp on  ur.role_id=rp.role_id inner join permission p on p.id=rp.permission_id  "
			+ "where action=:action and controller=:controller and ur.users_id=:userId group by p.id ", nativeQuery = true)
	Integer checkPermissionOfUser(@Param("userId")int idUser,@Param("controller") String controller,@Param("action") String action);
}
