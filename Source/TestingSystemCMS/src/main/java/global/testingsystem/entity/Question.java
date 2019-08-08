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

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "questions")
public class Question implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	public Question(String title, String code, String content,String explantion, String media, Date created_at, int status) {
		super();
		this.title = title;
		this.code = code;
		this.content = content;
		this.explantion = explantion;
		this.media = media;
		this.created_at = created_at;
		this.status = status;
	}
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", columnDefinition = "int", nullable = false)
	private int id;
	@Column(name = "title", columnDefinition = "nvarchar(256)", nullable = false)
	private String title;
	@Column(name="time", columnDefinition="int default 0",nullable=false)
	private int time;
	@Column(name = "code", columnDefinition = "nvarchar(20)", nullable = false)
	private String code;
	@Column(name = "content", columnDefinition = "text", nullable = false)
	private String content;
	@Column(name = "media", columnDefinition = "nvarchar(256)", nullable = true)
	private String media;
	@Column(name = "created_at", columnDefinition = "DateTime")
	private Date created_at;
	@Column(name = "updated_at", columnDefinition = "DateTime")
	private Date updated_at;
	@Column(name = "status", columnDefinition = "int")
	private int status;
	@Column(name="explantion", columnDefinition="nvarchar(500)",nullable=true)
	private String explantion;
	public String getExplantion() {
		return explantion;
	}

	public void setExplantion(String explantion) {
		this.explantion = explantion;
	}
	@Column(name = "creator_id", columnDefinition = "int")
	private int creator_id;
	@NotFound(action = NotFoundAction.IGNORE)
	@ManyToOne
	@JoinColumn(name = "subject_id", referencedColumnName = "id",columnDefinition="default 0")
	private Subject subject;
	
	@JsonManagedReference
	@NotFound(action = NotFoundAction.IGNORE)
	@ManyToOne
	@JoinColumn(name = "chapter_id", referencedColumnName = "id", columnDefinition="default 0")
	private Chapter chapter;
	
	@JsonManagedReference
	@NotFound(action = NotFoundAction.IGNORE)
	@ManyToOne
	@JoinColumn(name = "domain_id", referencedColumnName = "id", columnDefinition="default 0")
	private Domain domain;
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
	@JsonManagedReference
	@OneToMany(targetEntity = Answer_Option.class, mappedBy = "question",cascade=CascadeType.ALL)
	private Set<Answer_Option> answer_Options;
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
	@JsonManagedReference
	@OneToMany(targetEntity = Exam_Question.class, mappedBy = "question_id")
	private Set<Exam_Question> exam_Questions;
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
	@JsonManagedReference
	@OneToMany(targetEntity = Exam_Answer.class, mappedBy = "question_id")
	private Set<Exam_Answer> exam_Answers;

	public Set<Exam_Answer> getExam_Answers() {
		return exam_Answers;
	}

	public void setExam_Answers(Set<Exam_Answer> exam_Answers) {
		this.exam_Answers = exam_Answers;
	}

	public Set<Exam_Question> getExam_Questions() {
		return exam_Questions;
	}

	public void setExam_Questions(Set<Exam_Question> exam_Questions) {
		this.exam_Questions = exam_Questions;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public int getTime() {
		return time;
	}

	public void setTime(int time) {
		this.time = time;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getMedia() {
		return media;
	}

	public void setMedia(String media) {
		this.media = media;
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

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public int getCreator_id() {
		return creator_id;
	}

	public Question() {
		super();
	}

	public Question(String title, String code, String content, String media, Date created_at, Date updated_at,
			int status) {
		super();
		this.title = title;
		this.code = code;
		this.content = content;
		this.media = media;
		this.created_at = created_at;
		this.updated_at = updated_at;
		this.status = status;
	}

	public Question(String title2, String code2, String content2,String explantion2, Date createDate, String media2, int status2) {
		this.title=title2;
		this.code=code2;
		this.content=content2;
		this.explantion=explantion2;
		this.created_at=createDate;
		this.media=media2;
		this.status=status2;
		// TODO Auto-generated constructor stub
	}

	public void setCreator_id(int creator_id) {
		this.creator_id = creator_id;
	}

	public Subject getSubject() {
		return subject;
	}

	public void setSubject(Subject subject) {
		this.subject = subject;
	}

	public Chapter getChapter() {
		return chapter;
	}

	public void setChapter(Chapter chapter) {
		this.chapter = chapter;
	}

	public Domain getDomain() {
		return domain;
	}

	public void setDomain(Domain domain) {
		this.domain = domain;
	}

	public Set<Answer_Option> getAnswer_Options() {
		return answer_Options;
	}

	public void setAnswer_Options(Set<Answer_Option> answer_Options) {
		this.answer_Options = answer_Options;
	}

}
