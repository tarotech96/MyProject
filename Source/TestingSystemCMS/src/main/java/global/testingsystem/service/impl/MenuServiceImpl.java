package global.testingsystem.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import global.testingsystem.entity.Menu;
import global.testingsystem.repository.MenuRepository;
import global.testingsystem.service.MenuService;
@Service
public class MenuServiceImpl implements MenuService{
	private MenuRepository menuRepository;
	@Autowired
	public MenuServiceImpl(MenuRepository menuRepository) {
		this.menuRepository = menuRepository;
	}

	@Override
	public List<Object> list() {
		List<Object> menus = menuRepository.list();
		return menus;
	}

	@Override
	public Boolean addMenu(Menu menu) {
		menuRepository.save(menu);
		return true;
	}

	@Override
	public Boolean editMenu(Menu menu) {
		menuRepository.save(menu);
		return true;
	}

	@Override
	public Boolean deleteMenu(Integer id) {
		menuRepository.deleteById(id);
		return true;
	}

	@Override
	public Menu getMenuByName(String menuName) {
		// TODO Auto-generated method stub
		return menuRepository.getMenuByName(menuName);
	}

	@Override
	public List<Menu> getListMenuByParentId(int id) {
		return menuRepository.findByParentId(id);
	}

	@Override
	public Menu getMenuById(int id) {
		return menuRepository.findById(id);
	}

	@Override
	public List<Menu> listMenuParentOfUser(List<String> listRole) {
		return menuRepository.listMenuParentOfUser(listRole);
	}

	@Override
	public List<Menu> listMenuChildByParentOfUser(int parentId, List<String> listRole) {
		return menuRepository.listMenuChildByParentOfUser(parentId,listRole);
	}

	public int getOrderNumByParentId(int parentId) {
		return menuRepository.getOrderNumByParentId(parentId);
	}

	@Override
	public List<Menu> getParentName() {
		return menuRepository.getParentName();
	}

	@Override
	public List<Integer> getOderNumByParentId(int parentId) {
		return menuRepository.getOderNumByParentId(parentId);
	}
	
	@Override
	public Menu findById(int id) {
		return menuRepository.findById(id);	
	}

	@Override
	public int getOderNumById(int menuId) {
		return menuRepository.getOderNumById(menuId);
	}

	@Override
	public List<String> getNameByParentId(int parentId) {
		return menuRepository.getNameByParentId(parentId);
	}

	@Override
	public List<Object> SearchMenuByName(String name) {
		return menuRepository.SearchMenuByName(name);
	}

}
