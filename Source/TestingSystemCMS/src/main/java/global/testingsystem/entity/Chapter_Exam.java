package global.testingsystem.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

import global.testingsystem.util.CompositeExamChapterId;

@Entity
@Table(name="Chapter_Exam")
@IdClass(CompositeExamChapterId.class)
public class Chapter_Exam implements Serializable {
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
	private int chapter_id;
	@Column(name = "percentage", columnDefinition = "int")
	private int percentage;
	public int getId() {
		return id;
	}
	public int getExam_id() {
		return exam_id;
	}

	public void setExam_id(int exam_id) {
		this.exam_id = exam_id;
	}

	public int getChapter_id() {
		return chapter_id;
	}

	public void setChapter_id(int chapter_id) {
		this.chapter_id = chapter_id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Chapter_Exam() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Chapter_Exam(int id, int exam_id, int chapter_id, int percentage) {
		this.id = id;
		this.exam_id = exam_id;
		this.chapter_id = chapter_id;
		this.percentage = percentage;
	}

	public int getPercentage() {
		return percentage;
	}

	public void setPercentage(int percentage) {
		this.percentage = percentage;
	}
	
}
