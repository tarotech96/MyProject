package global.testingsystem.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

import global.testingsystem.util.CompositeExamSettingId;
@Entity
@Table(name="Exam_Setting")
@IdClass(CompositeExamSettingId.class)
public class Exam_Setting implements Serializable {
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
	@Id
	private int domain_id;
	@Column(name = "question_num", columnDefinition = "int")
	private int percentage;
	public int getId() {
		return id;
	}
	public Exam_Setting(int exam_id, int chapter_id, int domain_id, int percentage) {
		super();
		this.exam_id = exam_id;
		this.chapter_id = chapter_id;
		this.domain_id = domain_id;
		this.percentage = percentage;
	}
	public Exam_Setting() {
		super();
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
	public int getChapter_id() {
		return chapter_id;
	}
	public void setChapter_id(int chapter_id) {
		this.chapter_id = chapter_id;
	}
	public int getDomain_id() {
		return domain_id;
	}
	public void setDomain_id(int domain_id) {
		this.domain_id = domain_id;
	}
	public int getPercentage() {
		return percentage;
	}
	public void setPercentage(int percentage) {
		this.percentage = percentage;
	}
	

}
