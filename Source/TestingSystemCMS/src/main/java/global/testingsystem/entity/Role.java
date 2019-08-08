package global.testingsystem.entity;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="role")
public class Role {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", columnDefinition = "int", nullable = false)
	private int id;
	@Column(name = "name", columnDefinition = "varchar(20)", nullable = false)
	private String name;
	@Column(name = "description", columnDefinition = "nvarchar(50)", nullable = false)
	private String description;
	@JsonIgnore
	@ManyToMany(fetch = FetchType.LAZY, cascade = { CascadeType.PERSIST, CascadeType.MERGE },mappedBy="role")
	private Set<Users> users;
	@JsonIgnore
	@ManyToMany(fetch = FetchType.LAZY, cascade = { CascadeType.PERSIST, CascadeType.MERGE })
	@JoinTable(name="role_permission", joinColumns=@JoinColumn(name="role_Id")
	, inverseJoinColumns = @JoinColumn(name="permission_Id"))
	private Set<Permission> permissions;
	@JsonIgnore
	@ManyToMany(fetch = FetchType.LAZY, cascade = { CascadeType.PERSIST, CascadeType.MERGE })
	@JoinTable(name="role_menu", joinColumns=@JoinColumn(name="role_Id")
	, inverseJoinColumns = @JoinColumn(name="menu_Id"))
	private Set<Menu> menus;
	public Set<Permission> getPermissions() {
		return permissions;
	}
	public void setPermissions(Set<Permission> permissions) {
		this.permissions = permissions;
	}
	public Set<Menu> getMenus() {
		return menus;
	}
	public void setMenus(Set<Menu> menus) {
		this.menus = menus;
	}
	public Set<Users> getUsers() {
		return users;
	}
	public void setUsers(Set<Users> users) {
		this.users = users;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	
	public void addUsers(Users users) {
		this.users.add(users);
	}
	/**
	 * 
	 */
	public Role() {
		super();
	}
	/**
	 * @param name
	 * @param description
	 */
	public Role(String name, String description) {
		super();
		this.name = name;
		this.description = description;
	}
	/**
	 * @param id
	 * @param name
	 * @param description
	 */
	public Role(int id, String name, String description) {
		super();
		this.id = id;
		this.name = name;
		this.description = description;
	}
	public void addPermission(Permission permission) {
		this.permissions.add(permission);
		permission.addRole(this);	
	}
	public void removePermission(Permission permission) {
		this.permissions.remove(permission);
		permission.getRole().remove(this);
	}
	public void addMenu(Menu menu) {
		this.menus.add(menu);
		menu.addRole(this);	
	}
	public void removeMenu(Menu menu) {
		this.menus.remove(menu);
		menu.getRole().remove(this);
	}
	
	
	
}
