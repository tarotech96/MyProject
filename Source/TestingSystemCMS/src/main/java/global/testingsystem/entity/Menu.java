package global.testingsystem.entity;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="menu")
public class Menu {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", columnDefinition = "int", nullable = false)
	private int id;
	@Column(name = "name", columnDefinition = "varchar(50)", nullable = false)
	private String name;
	@Column(name = "icon ", columnDefinition = "varchar(50)", nullable = true)
	private String icon ;
	@Column(name = "link ", columnDefinition = "varchar(256)", nullable = false)
	private String link ;
	@Column(name = "parent_id", columnDefinition = "int default '0' ", nullable = false)
	private int parentId;
	@Column(name = "order_num", columnDefinition = "int default '0' ", nullable = false)
	private int orderNum;
	@JsonIgnore
	@ManyToMany(mappedBy="menus")
	private Set<Role> role;
	public Set<Role> getRole() {
		return role;
	}
	public void setRole(Set<Role> role) {
		this.role = role;
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
	public int getParent_id() {
		return parentId;
	}
	public void setParent_id(int parent_id) {
		this.parentId = parent_id;
	}
	public void addRole(Role role) {
		this.role.add(role);
	}
	public String getIcon() {
		return icon;
	}
	public void setIcon(String icon) {
		this.icon = icon;
	}
	public String getLink() {
		return link;
	}
	public void setLink(String link) {
		this.link = link;
	}
	public int getOrder_num() {
		return orderNum;
	}
	public void setOrder_num(int order_num) {
		this.orderNum = order_num;
	}
	
}
