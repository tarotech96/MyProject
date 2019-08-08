package global.testingsystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import global.testingsystem.entity.Menu;

public interface MenuRepository extends JpaRepository<Menu, Integer> {
	 @Query(value="select *from Menu where name =:name",nativeQuery=true)
	 Menu getMenuByName(@Param("name") String nameMenu);
     
     @Query(value=" select m.id,m.link,m.icon,m.parent_id,m.name,m.order_num from role_menu rm inner join role r on r.id=rm.role_id "
     		+ "inner join menu m on m.id=rm.menu_id "
     		+ "where m.parent_id=0 and r.name in (:listRole) group by m.id order by m.order_num asc",nativeQuery=true)
     List<Menu> listMenuParentOfUser(@Param("listRole") List<String> listRole);
     
     @Query(value=" select m.id,m.link,m.icon,m.parent_id,m.name,m.order_num from role_menu rm inner join role r on r.id=rm.role_id "
      		+ "inner join menu m on m.id=rm.menu_id "
      		+ "where m.parent_id=:parent_id and r.name in (:listRole) group by m.id order by m.order_num asc",nativeQuery=true)
      List<Menu> listMenuChildByParentOfUser(@Param("parent_id") int parent_id,@Param("listRole") List<String> listRole);
	  List<Menu> findByParentId(int id);
//	 Menu findByControllerAndAction(String controller, String action);
	  
	  @Query(value="SELECT a.id as id1, a.name as name, a.icon,a.link, a.order_num, b.name as parent_name, b.id as id2\r\n" + 
	  		"			FROM menu as a\r\n" + 
	  		"			left join menu as b\r\n" + 
	  		"			on a.parent_id = b.id order by a.id desc", nativeQuery = true)

	  List<Object> list();
	  
	  @Query(value="select max(order_num) from menu where parent_id=:parentId", nativeQuery= true)
	  int getOrderNumByParentId(@Param("parentId") int parentId);
	  
	  @Query(value="select * from menu where parent_id = 0", nativeQuery = true)
	  List<Menu> getParentName();
	  
	  @Query(value = "select order_num from menu where id=:menuId", nativeQuery = true)
	  int getOderNumById(@Param("menuId") int menuId);
	  
	  @Query(value = "select order_num from menu where parent_id=:parentId", nativeQuery = true)
	  List<Integer> getOderNumByParentId(@Param("parentId") int parentId);
	  
	  @Query(value= "select name from menu where parent_id=:parentId", nativeQuery = true)
	  List<String> getNameByParentId(@Param("parentId") int parentId);
	  
	  Menu findById(int id);
	  
	  @Query(value="SELECT a.id as id1, a.name as name, a.icon,a.link, a.order_num, b.name as parent_name, b.id as id2\r\n" + 
	  		"	  				FROM menu as a \r\n" + 
	  		"	  					left join menu as b\r\n" + 
	  		"	  					on a.parent_id = b.id where a.name LIKE CONCAT('%',:name,'%')", nativeQuery = true)
	  List<Object> SearchMenuByName(@Param("name") String name);
}
