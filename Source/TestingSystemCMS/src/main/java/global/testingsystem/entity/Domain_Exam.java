package global.testingsystem.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

import global.testingsystem.util.CompositeExamDomainId;

@Entity
@Table(name="Domain_Exam")
@IdClass(CompositeExamDomainId.class)
public class Domain_Exam implements Serializable {
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
	private int domain_id;
	
	@Column(name = "percentage", columnDefinition = "int")
	private int percentage;
	public int getPercentage() {
		return percentage;
	}

	public Domain_Exam() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Domain_Exam(int id, int exam_id, int domain_id, int percentage) {
		this.id = id;
		this.exam_id = exam_id;
		this.domain_id = domain_id;
		this.percentage = percentage;
	}

	public void setPercentage(int percentage) {
		this.percentage = percentage;
	}

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

	public int getDomain_id() {
		return domain_id;
	}

	public void setDomain_id(int domain_id) {
		this.domain_id = domain_id;
	}
	
}
