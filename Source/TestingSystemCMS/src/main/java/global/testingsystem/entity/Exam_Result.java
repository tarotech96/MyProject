/**
 * 
 */
package global.testingsystem.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * @author USER
 *
 */
@Entity
@Table(name="Exam_Result")
public class Exam_Result implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", columnDefinition = "int", nullable = false)
	private int id;
	
	@Column(name = "by_chapter", columnDefinition = "int", nullable = false)
	private int by_chapter;
	
	@Column(name = "by_domain", columnDefinition = "int", nullable = false)
	private int by_domain;
	
	@Column(name = "start_date" )
	private Date start_date;
	
	@Column(name = "end_date")
	private Date end_date;
	
	@Column(name = "total_score", columnDefinition = "float", nullable = false)
	private float total_score;

	@Column(name = "correct_num", columnDefinition = "int", nullable = false)
	private int correct_num;
	
	@Column(name = "created_at", nullable = false)
	private Date created_at;
	
	@Column(name = "update_at")
	private Date update_at;
	
	@Column(name = "completed")
	private int completed;
	
	public int getCompleted() {
		return completed;
	}

	public void setCompleted(int completed) {
		this.completed = completed;
	}
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name = "exam_id", referencedColumnName = "id")
	private Exam exam;
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name = "user_id", referencedColumnName = "id")
	private Users users;
	@Column(name = "time", columnDefinition = "nvarchar(10)", nullable = true)
	private String time;
	
	// 0 is failed, 1 is pass
	@Column(name = "pass", columnDefinition = "tinyint", nullable = false)
	private boolean pass;

//	@OneToMany(targetEntity = Exam_Answer.class, mappedBy = "result_id")
//	private Set<Exam_Answer> exam_Answers;
//
//	public Set<Exam_Answer> getExam_Answers() {
//		return exam_Answers;
//	}
//
//	public void setExam_Answers(Set<Exam_Answer> exam_Answers) {
//		this.exam_Answers = exam_Answers;
//	}



	public boolean isPass() {
		return pass;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public void setPass(boolean pass) {
		this.pass = pass;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getBy_chapter() {
		return by_chapter;
	}

	public void setBy_chapter(int by_chapter) {
		this.by_chapter = by_chapter;
	}

	public int getBy_domain() {
		return by_domain;
	}

	public void setBy_domain(int by_domain) {
		this.by_domain = by_domain;
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

	public float getTotal_score() {
		return total_score;
	}

	public void setTotal_score(float total_score) {
		this.total_score = total_score;
	}

	public int getCorrect_num() {
		return correct_num;
	}

	public void setCorrect_num(int correct_num) {
		this.correct_num = correct_num;
	}



	public Date getCreated_at() {
		return created_at;
	}

	public void setCreated_at(Date created_at) {
		this.created_at = created_at;
	}

	public Date getUpdate_at() {
		return update_at;
	}

	public void setUpdate_at(Date update_at) {
		this.update_at = update_at;
	}

	public Exam getExam() {
		return exam;
	}

	public void setExam(Exam exam) {
		this.exam = exam;
	}

	public Users getUsers() {
		return users;
	}

	public void setUsers(Users users) {
		this.users = users;
	}
	
	
}
