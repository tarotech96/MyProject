package global.testingsystem.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

import global.testingsystem.util.CompositeExamQuestionId;

@Entity
@Table(name="Exam_Questions")
@IdClass(CompositeExamQuestionId.class)
public class Exam_Question implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", columnDefinition = "int", nullable = false)
	private int id;
	
	@Id
	private int exam_id;
	
	@Id
	private int question_id;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getExam_id() {
		return exam_id;
	}

	public void setExam_id(int exam_id) {
		this.exam_id = exam_id;
	}

	public int getQuestion_id() {
		return question_id;
	}

	public void setQuestion_id(int question_id) {
		this.question_id = question_id;
	}

	public Exam_Question(int id, int exam_id, int question_id) {
		super();
		this.id = id;
		this.exam_id = exam_id;
		this.question_id = question_id;
	}

	public Exam_Question() {
		super();
		// TODO Auto-generated constructor stub
	}

	
	
}
