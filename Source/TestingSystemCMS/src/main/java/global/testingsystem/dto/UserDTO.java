package global.testingsystem.dto;

public class UserDTO {
int id;
private String fullName;
public UserDTO(int id, String fullName, String email) {
	super();
	this.id = id;
	this.fullName = fullName;
	this.email = email;
}
public UserDTO() {
	
}
public int getId() {
	return id;
}
public void setId(int id) {
	this.id = id;
}
public String getFullName() {
	return fullName;
}
public void setFullName(String fullName) {
	this.fullName = fullName;
}
public String getEmail() {
	return email;
}
public void setEmail(String email) {
	this.email = email;
}
private String email;
}
