package global.testingsystem.service;

import java.util.List;

import global.testingsystem.entity.Menu;

public interface MenuService {
	List<Object> list();
	Boolean addMenu(Menu menu);
	Boolean editMenu(Menu menu);
	Boolean deleteMenu(Integer id);
	Menu getMenuByName(String menuName);
	List<Menu> getListMenuByParentId(int id);
	Menu getMenuById(int id);
	List<Menu> listMenuParentOfUser(List<String> listRole);
	List<Menu> listMenuChildByParentOfUser(int parentId,List<String> listRole);

	int getOrderNumByParentId(int parentId);
	List<Menu> getParentName();
	int getOderNumById(int menuId);
	List<Integer> getOderNumByParentId(int parentId);
	Menu findById(int id);
	List<String> getNameByParentId(int parentId);
	List<Object> SearchMenuByName(String name);
}
