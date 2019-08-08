 package global.testingsystem.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

import global.testingsystem.util.CompositeExamAnswerId;

@Entity
@Table(name = "Exam_Answer")
@IdClass(CompositeExamAnswerId.class)
public class Exam_Answer implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", columnDefinition = "int", nullable = false)
	private int id;
	@Id
	private int result_id;
	@Id
	private int question_id;
	@Column(name = "choose_answer", columnDefinition = "nvarchar(20)")
	private String choose_answer;
	
	public String getChoose_answer() {
		return choose_answer;
	}
	public void setChoose_answer(String choose_answer) {
		this.choose_answer = choose_answer;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getResult_id() {
		return result_id;
	}
	public void setResult_id(int result_id) {
		this.result_id = result_id;
	}
	public int getQuestion_id() {
		return question_id;
	}
	public void setQuestion_id(int question_id) {
		this.question_id = question_id;
	}
}
