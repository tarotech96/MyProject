
package global.testingsystem.util;

import java.io.Serializable;
import java.util.Objects;

public class CompositeExamGroupId implements Serializable {
	 
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int exam_id;
	    private int group_id;
		public CompositeExamGroupId() {
			super();
			// TODO Auto-generated constructor stub
		}
		public CompositeExamGroupId(int examId, int groupId) {
			super();
			this.exam_id = examId;
			this.group_id = groupId;
		}
		@Override
		  public boolean equals(Object o) {
		      if (this == o) return true;
		      if (o == null || getClass() != o.getClass()) return false;
		      CompositeExamGroupId taskId1 = (CompositeExamGroupId) o;
		      if (exam_id != taskId1.exam_id) return false;
		      return group_id == taskId1.group_id;
		  }

		  @Override
		  public int hashCode() {
		      return Objects.hash(exam_id, group_id);
		  }
}
