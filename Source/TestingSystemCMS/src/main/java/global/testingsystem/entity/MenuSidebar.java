package global.testingsystem.entity;

import java.util.ArrayList;
import java.util.List;

public class MenuSidebar {
  private Menu parent;
  private List<Menu> childs = new ArrayList<Menu>();
public Menu getParent() {
	return parent;
}
public void setParent(Menu parent) {
	this.parent = parent;
}
public List<Menu> getChilds() {
	return childs;
}
public void setChilds(List<Menu> childs) {
	this.childs = childs;
}
public void addMenu(Menu m) {
	this.childs.add(m);
  }
}
