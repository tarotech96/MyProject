package global.testingsystem.controller;

import java.util.ArrayList;
import java.util.List;

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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import global.testingsystem.entity.Menu;
import global.testingsystem.entity.MenuSidebar;
import global.testingsystem.service.MenuService;
import global.testingsystem.service.UsersService;
import global.testingsystem.util.ConstantPage;

@CrossOrigin(origins = "*")
@RestController
public class MenuController  {
	@Autowired
	private MenuService menuService;
	@Autowired
	private UsersService userServive;
	public MenuController() {
		super();
	}
	@GetMapping( value = ConstantPage.REST_API_GET_ALL_MENU, produces = { MediaType.APPLICATION_PROBLEM_JSON_VALUE})
	public List<Object> list() {
		List<Object> menus = menuService.list();
		return menus;
	}
	
	@GetMapping(value = ConstantPage.REST_API_GET_PARENT_NAME, produces = { MediaType.APPLICATION_PROBLEM_JSON_VALUE})
	public List<Menu> listParentName() {
		List<Menu> menus = menuService.getParentName();
		return menus;
	}
	@DeleteMapping(value = ConstantPage.REST_API_DELETE_MENU_BY_ID, produces = { MediaType.APPLICATION_JSON_VALUE })
	@ResponseBody
	public boolean delete(@PathVariable int id) {
		return menuService.deleteMenu(id);
	}
	
	@PostMapping(value= ConstantPage.REST_API_UPDATE_MENU ,produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<Object> update(@RequestParam("menu") String menu){
		JSONObject jsonObject = new JSONObject(menu);
		int id = jsonObject.getInt("id");
		int order_num = jsonObject.getInt("order_num");
		int parent_id = jsonObject.getInt("parent_name");
		List<Integer> listOrderNumByParentId = menuService.getOderNumByParentId(parent_id);
		int ordernumById = menuService.getOderNumById(id);
		if(listOrderNumByParentId.contains(order_num) && ordernumById != order_num) {
			return new ResponseEntity<>("Error", HttpStatus.BAD_REQUEST);
		}
		Menu m= menuService.findById(id);
		m.setName(jsonObject.getString("name").trim());
		m.setIcon(jsonObject.getString("icon").trim());
		m.setLink(jsonObject.getString("link").trim());
		m.setParent_id(parent_id);
		m.setOrder_num(order_num);
		m.setRole(null);
		boolean isSuccess= menuService.editMenu(m);
		return new ResponseEntity<>(isSuccess, HttpStatus.OK);	
	}
	
	@PostMapping(value= ConstantPage.REST_API_INSERT_MENU, produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<Object> insert(@RequestParam("menu") String menu){
		JSONObject jsonObject = new JSONObject(menu);
		String nameMenu = jsonObject.getString("name").trim();
		int parent_id = jsonObject.getInt("parent_name");
		int Order_Num = menuService.getOrderNumByParentId(parent_id);
		List<String> listNameByParentId = menuService.getNameByParentId(parent_id);
		if(listNameByParentId.contains(nameMenu)) {
			return new ResponseEntity<>("Error", HttpStatus.BAD_REQUEST);
		}
		Menu m=new Menu();
		m.setName(nameMenu);
		m.setIcon(jsonObject.getString("icon").trim());
		m.setLink(jsonObject.getString("link").trim());
		m.setParent_id(parent_id);
		m.setOrder_num(Order_Num + 1);
		m.setRole(null);
		boolean isSuccess= menuService.addMenu(m);
		return new ResponseEntity<>(isSuccess, HttpStatus.OK);		
	}
	@GetMapping(value= ConstantPage.REST_API_LIST_MENU_TREE, produces = { MediaType.APPLICATION_JSON_VALUE })
	public List<Menu> listMenuTree(){
		List<Menu> listAll= new ArrayList<Menu>();
		List<Menu> menuParent = menuService.getListMenuByParentId(0);
		if(menuParent!=null) {
		for(Menu m : menuParent) {
			List<Menu> menuChild=menuService.getListMenuByParentId(m.getId());
			listAll.add(m);
			if(menuChild!=null) listAll.addAll(menuChild);
		 }
		}
		return listAll;
	}
	@PostMapping(value= ConstantPage.REST_API_LIST_MENU_USER, produces = { MediaType.APPLICATION_JSON_VALUE })
	public List<MenuSidebar> listMenuUser(@RequestParam("data") String data){
		JSONObject jsonObject = new JSONObject(data);
		String email=jsonObject.getString("email");
		List<String> listRole=userServive.getListRoleOfUser(email);
		List<MenuSidebar> listMenuUser = new ArrayList<MenuSidebar>();
		List<Menu> listParent = menuService.listMenuParentOfUser(listRole);
		if(listParent!=null)
		for(Menu p : listParent) {
		    MenuSidebar menu = new MenuSidebar();
		    menu.setParent(p);
		    List<Menu> children = menuService.listMenuChildByParentOfUser(p.getId(), listRole);
		    if(children!=null) menu.setChilds(children);
		    listMenuUser.add(menu);
		}
			
		
		return listMenuUser;
	 }
	
	@GetMapping(value= ConstantPage.REST_API_SEARCH_MENU_BY_NAME, produces = { MediaType.APPLICATION_JSON_VALUE })
	public List<Object> searchMenuByName(@RequestParam String name){
		List<Object> menus = menuService.SearchMenuByName(name);
		return menus;
	}
}
