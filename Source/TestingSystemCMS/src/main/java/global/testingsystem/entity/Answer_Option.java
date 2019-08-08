package global.testingsystem.entity;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@Table(name="Answer_Options")
@JsonIdentityInfo( 
		generator = ObjectIdGenerators.PropertyGenerator.class,
		property="id")
public class Answer_Option {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", columnDefinition = "int", nullable = false)
	private int id;
	@Column(name = "content", columnDefinition = "text")
	private String content;
	@Column(name = "media", columnDefinition = "varchar(256)")
	private String media;
	@Column(name = "correct", columnDefinition = "boolean")
	private boolean correct;
	@Column(name = "created_at", columnDefinition = "DateTime")
	private Date created_at;
	@Column(name = "updated_at", columnDefinition = "DateTime")
	private Date updated_at;
	@JsonBackReference
	@ManyToOne(cascade= {CascadeType.PERSIST, CascadeType.MERGE,CascadeType.REFRESH})
	@JoinColumn(name = "question_id", referencedColumnName = "id")
	private Question question;

	public int getId() {
		return id;
	}
	
	public Answer_Option() {
		super();
		// TODO Auto-generated constructor stub
	}

	public void setId(int id) {
		this.id = id;
	}
	
	public Answer_Option(String content, boolean correct) {
		super();
		this.content = content;
		this.correct = correct;
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
	public boolean isCorrect() {
		return correct;
	}
	public void setCorrect(boolean correct) {
		this.correct = correct;
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
	public Question getQuestion() {
		return question;
	}
	public void setQuestion(Question question) {
		this.question = question;
	}
	public void removeQuestion() {
		this.setQuestion(null);
	}
	
}
