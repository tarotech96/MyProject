/**
 * 
 */
package global.testingsystem.util;

import java.io.Serializable;
import java.util.Objects;

/**
 * @author USER
 *
 */
public class CompositeExamUserId implements Serializable {
	
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int exam_id;
    private int user_id;
	public CompositeExamUserId() {
		super();
		// TODO Auto-generated constructor stub
	}
	public CompositeExamUserId(int examId, int userId) {
		super();
		this.exam_id = examId;
		this.user_id = userId;
	}
	@Override
	  public boolean equals(Object o) {
	      if (this == o) return true;
	      if (o == null || getClass() != o.getClass()) return false;
	      CompositeExamUserId taskId1 = (CompositeExamUserId) o;
	      if (exam_id != taskId1.exam_id) return false;
	      return user_id == taskId1.user_id;
	  }

	  @Override
	  public int hashCode() {
	      return Objects.hash(exam_id, user_id);
	  }

}
