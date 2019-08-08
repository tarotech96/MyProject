/**
 * 
 */
package global.testingsystem.repository;

import java.util.List;

import javax.websocket.server.PathParam;

import org.hibernate.annotations.Parent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import global.testingsystem.entity.Role;

/**
 * @author USER
 *
 */
@Repository
public interface RoleRepository extends JpaRepository<Role, Integer>{
	Role findByName(String name);
	List<Role> findByPermissions_Id(int id);
	List<Role> findByUsers_Email(String email);
	List<Role> findAllByOrderByIdDesc();
	List<Role> findAllByOrderByNameAsc();
	List<Role> findByNameContainingOrderByNameAsc(String name);
	List<Role> findByNameContaining(String name);
	   @Query(value="select *from Role where name =:name",nativeQuery=true)
	   Role getRoleByName(@Param("name") String nameRole);
	   @Query(value="Select r.name as role_Name,p.name as permission_Name,p.action,p.controller from users_role ur inner join "
	   		+ "role r on r.id=ur.role_id inner join role_permission rp on rp.role_id=ur.role_id inner join"
	   		+ " permission p on p.id=rp.permission_id\r\n" + 
	   		"where ur.users_id = :userId group by r.name ,p.name ,p.action,p.controller",nativeQuery=true)
	   List<Object[]> getAllRolePermissionById(@Param("userId") int userId);
	   
	   @Query(value="select a.name as role_Name,b.name as permission_Name,b.action,b.controller " + 
  		        "from role a,permission b " + 
  		        " where a.id in (" + 
  		        " select role_Id from role_permission" + 
  		        " where role_id=a.id and permission_Id=b.id) "+" and b.id in ( select permission_Id from role_permission " + 
  		        " where role_id=a.id and permission_Id=b.id)",nativeQuery=true)
	   List<Object[]> getAllRolePermission();
	   @Query(value="select a.name as role_Name,b.name as menu_Name " + 
			        "from role a,menu b " + 
			        " where a.id in (" + 
			        " select role_Id from role_menu" + 
			        " where role_id=a.id and menu_Id=b.id) "+" and b.id in ( select menu_Id from role_menu " + 
			        " where role_id=a.id and menu_Id=b.id)",nativeQuery=true)
	   List<Object[]> getAllRoleMenu();
	   
	   @Query(value="delete from role_permission  where ( role_Id=:roleId and permission_Id=:permissionId)",nativeQuery=true)
	   void removeRolePermission(@Param("roleId") int roleId,@Param("permissionId")int permissionId);
	   ///lâm

		@Query(value = "select p.name,p.id from permission as p where p.name LIKE CONCAT('%',:name,'%')",nativeQuery = true)
		List<Object> searchRolePermission(@Param("name") String name);
		
	   /////
	   
}