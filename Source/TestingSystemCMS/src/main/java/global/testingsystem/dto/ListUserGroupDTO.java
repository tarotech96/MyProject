package global.testingsystem.dto;

import java.util.List;

public class ListUserGroupDTO {
  private int idGroup;
  private String nameGroup;
  private List<UserDTO> listUser;
  private List<UserDTO> listUserRest;
public ListUserGroupDTO(int idGroup, String nameGroup, List<UserDTO> listUser, List<UserDTO> listUserRest) {
	super();
	this.idGroup = idGroup;
	this.nameGroup = nameGroup;
	this.listUser = listUser;
	this.listUserRest=listUserRest;
}
public List<UserDTO> getListUserRest() {
	return listUserRest;
}
public void setListUserRest(List<UserDTO> listUserRest) {
	this.listUserRest = listUserRest;
}
public ListUserGroupDTO() {
	
}
public int getIdGroup() {
	return idGroup;
}
public void setIdGroup(int idGroup) {
	this.idGroup = idGroup;
}
public String getNameGroup() {
	return nameGroup;
}
public void setNameGroup(String nameGroup) {
	this.nameGroup = nameGroup;
}
public List<UserDTO> getListUser() {
	return listUser;
}
public void setListUser(List<UserDTO> listUser) {
	this.listUser = listUser;
}
}
