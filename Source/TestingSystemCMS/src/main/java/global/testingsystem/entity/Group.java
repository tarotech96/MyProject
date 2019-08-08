package global.testingsystem.entity;

import java.util.Date;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="groups")
public class Group{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", columnDefinition = "int", nullable = false)
	private int id;
	@Column(name = "name", columnDefinition = "varchar(50)", nullable = false)
	private String name;
	@Column(name = "parent_id", columnDefinition = "int", nullable = true)
	private int parent_id;
	@Column(name = "type", columnDefinition = "nvarchar(20)")
	private String type;
	@Column(name="created_at", columnDefinition="DateTime")
	private Date created_at;
	@Column(name="updated_at", columnDefinition="DateTime")
	private Date updated_at;
	@JsonIgnore
	@OneToMany( mappedBy="group")
	private Set<User_Group> user_Groups;
	@JsonIgnore
	@OneToMany(targetEntity= Exam_Group.class,mappedBy="group_id")
	private Set<Exam_Group> exam_Groups;
	
	public Set<Exam_Group> getExam_Groups() {
		return exam_Groups;
	}
	public void setExam_Groups(Set<Exam_Group> exam_Groups) {
		this.exam_Groups = exam_Groups;
	}
	public Set<User_Group> getUser_Groups() {
		return user_Groups;
	}
	public void setUser_Groups(Set<User_Group> user_Groups) {
		this.user_Groups = user_Groups;
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
		return parent_id;
	}
	public void setParent_id(int parent_id) {
		this.parent_id = parent_id;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public Date getCreated_at() {
		return created_at;
	}
	public void setCreated_at(Date created_at) {
		this.created_at = created_at;
	}
	public Date getUpdated_at() {
		return updated_at;
	}
	public void setUpdated_at(Date updated_at) {
		this.updated_at = updated_at;
	}
	
}