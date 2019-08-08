package global.testingsystem.entity;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="Exams")
public class Exam implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", columnDefinition = "int", nullable = false)
	private int id;
	@Column(name = "name", columnDefinition = "nvarchar(50)", nullable = false)
	private String name;
	@Column(name = "title", columnDefinition = "varchar(256)")
	private String title;
	@Column(name = "code", columnDefinition = "varchar(20)", nullable = false)
	private String code;
	@Column(name = "decription", columnDefinition = "text")
	private String decription;
	@Column(name = "media", columnDefinition = "varchar(256)")
	private String media;
	@Column(name = "start_date", columnDefinition = "DateTime")
	private Date start_date;
	@Column(name = "end_date", columnDefinition = "DateTime")
	private Date end_date;
	@Column(name = "time", columnDefinition = "int", nullable = false)
	private int time;
	@Column(name = "created_at", columnDefinition = "DateTime",nullable=true)
	private Date created_at;
	@Column(name = "updated_at", columnDefinition = "DateTime",nullable=true)
	private Date updated_at;
	@Column(name="create_type",columnDefinition="int")
	private int create_type;
	@Column(name = "percent_passing", columnDefinition = "int")
	private int percent_passing;
	@Column(name = "max_attempt", columnDefinition = "int")
	private int max_attempt;	
	@Column(name = "status", columnDefinition = "tinyInt", nullable = false)
	private int status;
	@Column(name = "question_num", columnDefinition = "int", nullable = false)
	private int question_num;
	@Column(name = "type", columnDefinition = "tinyInt",nullable = false)
	private int type;
	@JsonIgnore
	@OneToMany(targetEntity = Exam_Group.class, mappedBy="exam_id", fetch=FetchType.EAGER, cascade = CascadeType.ALL)
	private Set<Exam_Group> exam_Groups;
	@JsonIgnore
	@OneToMany(targetEntity = Exam_User.class, mappedBy="exam_id", fetch=FetchType.EAGER, cascade = CascadeType.ALL)
	private Set<Exam_User> exam_Users;
	@JsonIgnore
	@OneToMany(targetEntity= Domain_Exam.class, mappedBy="exam_id", fetch=FetchType.EAGER, cascade = CascadeType.ALL)
	private Set<Domain_Exam> domain_Exams;
	@JsonIgnore
	@OneToMany(targetEntity= Chapter_Exam.class, mappedBy="exam_id", fetch=FetchType.EAGER, cascade = CascadeType.ALL)
	private Set<Chapter_Exam> chapter_Exams;
	@JsonIgnore
	@OneToMany(targetEntity= Exam_Question.class, mappedBy = "exam_id", fetch=FetchType.EAGER, cascade = CascadeType.ALL)
	private Set<Exam_Question> exam_Questions;
	public int getCreate_type() {
		return create_type;
	}

	public void setCreate_type(int create_type) {
		this.create_type = create_type;
	}

	@JsonIgnore
	@NotFound(action = NotFoundAction.IGNORE)
	@ManyToOne
	@JoinColumn(name="creator_id", referencedColumnName = "id")
	private Users users;
	
	@JsonIgnore
	@NotFound(action = NotFoundAction.IGNORE)
	@ManyToOne
	@JoinColumn(name = "subject_id", referencedColumnName = "id")
	private Subject subject;
	
	

	public Users getUsers() {
		return users;
	}

	public void setUsers(Users users) {
		this.users = users;
	}

	public Subject getSubject() {
		return subject;
	}

	public void setSubject(Subject subject) {
		this.subject = subject;
	}

	public Set<Exam_Question> getExam_Questions() {
		return exam_Questions;
	}

	public void setExam_Questions(Set<Exam_Question> exam_Questions) {
		this.exam_Questions = exam_Questions;
	}

	public Set<Chapter_Exam> getChapter_Exams() {
		return chapter_Exams;
	}

	public void setChapter_Exams(Set<Chapter_Exam> chapter_Exams) {
		this.chapter_Exams = chapter_Exams;
	}

	public Set<Domain_Exam> getDomain_Exams() {
		return domain_Exams;
	}

	public void setDomain_Exams(Set<Domain_Exam> domain_Exams) {
		this.domain_Exams = domain_Exams;
	}

	public Set<Exam_User> getExam_Users() {
		return exam_Users;
	}

	public void setExam_Users(Set<Exam_User> exam_Users) {
		this.exam_Users = exam_Users;
	}

	public Set<Exam_Group> getExam_Groups() {
		return exam_Groups;
	}

	public void setExam_Groups(Set<Exam_Group> exam_Groups) {
		this.exam_Groups = exam_Groups;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public int getQuestion_num() {
		return question_num;
	}

	public void setQuestion_num(int question_num) {
		this.question_num = question_num;
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

	public String getDecription() {
		return decription;
	}

	public void setDecription(String decription) {
		this.decription = decription;
	}

	public String getMedia() {
		return media;
	}

	public void setMedia(String media) {
		this.media = media;
	}

	

	public Date getStart_date() {
		return start_date;
	}

	public void setStart_date(Date start_date) {
		this.start_date = start_date;
	}

	public Date getEnd_date() {
		return end_date;
	}

	public void setEnd_date(Date end_date) {
		this.end_date = end_date;
	}

	public int getTime() {
		return time;
	}

	public void setTime(int time) {
		this.time = time;
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

	public int getPercent_passing() {
		return percent_passing;
	}

	public void setPercent_passing(int percent_passing) {
		this.percent_passing = percent_passing;
	}

	public int getMax_attempt() {
		return max_attempt;
	}

	public void setMax_attempt(int max_attempt) {
		this.max_attempt = max_attempt;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}
	


	
}
