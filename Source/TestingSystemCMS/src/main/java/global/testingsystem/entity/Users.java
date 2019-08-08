	package global.testingsystem.entity;

import java.util.ArrayList;
import java.util.List;
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
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="users")
public class Users  {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", columnDefinition = "int", nullable = false)
	private int id;
	
	@Column(name = "fullname", columnDefinition = "nvarchar(50)", nullable = false)
	private String fullname;
	
	@Column(name = "email", columnDefinition = "varchar(50)", nullable = false, unique = true)
	private String email;
	
	@Column(name = "password", columnDefinition = "varchar(100)", nullable = false)
	private String password;
	
	// them 4 truong user 
	@Column(name = "status", columnDefinition = "int", nullable = false)
	private int status;	
	@Column(name ="img",columnDefinition = "varchar(100)", nullable = false)
	private String img;	
	@Column(name ="birthday",columnDefinition = "varchar(10)", nullable = false)
	private String birthday;
	@Column(name =  "isTest", nullable = false,columnDefinition = "int default 0")
	private boolean isTest;
	@Column(name = "loggingTime", nullable = true)
	private java.util.Date loggingTime;

	@Column(name ="address",columnDefinition = "varchar(100)", nullable = false)
	private String address;
	@Column(name ="phone",columnDefinition = "varchar(50)", nullable = false)
	private String phone;

	@JsonIgnore
	@OneToMany(mappedBy="users", cascade = CascadeType.ALL)
	private Set<User_Group> user_Groups;
	@JsonIgnore
	@OneToMany(mappedBy="user_id" , cascade = CascadeType.ALL)
	private Set<Exam_User> exam_Users;
	@JsonIgnore
	@OneToMany(mappedBy = "users", cascade = CascadeType.ALL)
	public Set<Exam> exams;
	
	// Mr Duc
	@JsonIgnore
	@OneToMany(mappedBy = "users_creator", cascade = CascadeType.ALL)
	public Set<News> news_creator;
	
	@JsonIgnore
	@OneToMany(mappedBy = "users_confirm", cascade = CascadeType.ALL)
	public Set<News> news_confirm;

	@JsonIgnore
	@ManyToMany(fetch = FetchType.LAZY,cascade = { CascadeType.PERSIST, CascadeType.MERGE })
	@JoinTable(name="users_role", joinColumns=@JoinColumn(name="users_Id")
			, inverseJoinColumns = @JoinColumn(name="role_Id"))
	private Set<Role> role;
	
	public Set<News> getNews_creator() {
		return news_creator;
	}



	public void setNews_creator(Set<News> news_creator) {
		this.news_creator = news_creator;
	}



	public Set<News> getNews_confirm() {
		return news_confirm;
	}



	public void setNews_confirm(Set<News> news_confirm) {
		this.news_confirm = news_confirm;
	}

	// Mr Duc

	public Set<Exam> getExams() {
		return exams;
	}



	public void setExams(Set<Exam> exams) {
		this.exams = exams;
	}



	public Set<Exam_User> getExam_Users() {
		return exam_Users;
	}



	public void setExam_Users(Set<Exam_User> exam_Users) {
		this.exam_Users = exam_Users;
	}



	public Set<User_Group> getUser_Groups() {
		return user_Groups;
	}



	public void setUser_Groups(Set<User_Group> user_Groups) {
		this.user_Groups = user_Groups;
	}



	public String getImg() {
		return img;
	}



	public void setImg(String img) {
		this.img = img;
	}



	public String getBirthday() {
		return birthday;
	}



	public void setBirthday(String birthday) {
		this.birthday = birthday;
	}



	public String getAddress() {
		return address;
	}



	public void setAddress(String address) {
		this.address = address;
	}



	public String getPhone() {
		return phone;
	}



	public void setPhone(String phone) {
		this.phone = phone;
	}
	
	public int getId() {
		return id;
	}



	public void setId(int id) {
		this.id = id;
	}



	public String getFullname() {
		return fullname;
	}



	public void setFullname(String fullname) {
		this.fullname = fullname;
	}



	public String getEmail() {
		return email;
	}



	public void setEmail(String email) {
		this.email = email;
	}



	public String getPassword() {
		return password;
	}



	public void setPassword(String password) {
		this.password = password;
	}



	public int getStatus() {
		return status;
	}



	public void setStatus(int status) {
		this.status = status;
	}



	public Set<Role> getRole() {
		return role;
	}



	public void setRole(Set<Role> role) {
		this.role = role;
	}



	public void addRole(Role role) {
		this.role.add(role);
		role.addUsers(this); 
	}		






	public boolean isTest() {
		return isTest;
	}



	public void setTest(boolean isTest) {
		this.isTest = isTest;
	}



	public java.util.Date getLoggingTime() {
		return loggingTime;
	}



	public void setLoggingTime(java.util.Date loggingTime) {
		this.loggingTime = loggingTime;
	}



	/**
	 * 
	 */
	public Users() {
		super();
	}


	// CONGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
	
	public Users(String fullname, String email, String password, int status, String img, String birthday,
			String address, String phone) {
		super();
		this.fullname = fullname;
		this.email = email;
		this.password = password;
		this.status = status;
		this.img = img;
		this.birthday = birthday;
		this.address = address;
		this.phone = phone;	
	}
	 public Users(String fullName,String email,String password,int status) {
		 this.fullname=fullName;
		 this.email=email;
		 this.password=password;
		 this.status=status;
	 }
	public void removeRole(Role role) {
        // TODO Auto-generated method stub
        this.role.remove(role);
        role.getUsers().remove(this);
	}

	public List<GrantedAuthority> getAuthorities() {
		List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
		for (Role role : role) {
			authorities.add(new SimpleGrantedAuthority(role.getName()));
		}
		return authorities;

	}
	
}
