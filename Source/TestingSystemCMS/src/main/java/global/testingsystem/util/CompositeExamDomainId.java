package global.testingsystem.util;

import java.io.Serializable;
import java.util.Objects;

public class CompositeExamDomainId implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int exam_id;
    private int domain_id;
    
	public CompositeExamDomainId() {
		super();
		// TODO Auto-generated constructor stub
	}

	public CompositeExamDomainId(int exam_id, int domain_id) {
		super();
		this.exam_id = exam_id;
		this.domain_id = domain_id;
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

	@Override
	  public boolean equals(Object o) {
	      if (this == o) return true;
	      if (o == null || getClass() != o.getClass()) return false;
	      CompositeExamDomainId taskId1 = (CompositeExamDomainId) o;
	      if (exam_id != taskId1.exam_id) return false;
	      return domain_id == taskId1.domain_id;
	  }

	  @Override
	  public int hashCode() {
	      return Objects.hash(exam_id, domain_id);
	  }
}
