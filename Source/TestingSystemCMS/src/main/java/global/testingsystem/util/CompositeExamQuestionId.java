package global.testingsystem.util;

import java.io.Serializable;
import java.util.Objects;

public class CompositeExamQuestionId implements Serializable {
	    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
		private int exam_id;
	    private int question_id;
		public CompositeExamQuestionId() {
			super();
			// TODO Auto-generated constructor stub
		}
		public CompositeExamQuestionId(int examId, int questionId) {
			super();
			this.exam_id = examId;
			this.question_id = questionId;
		}
		@Override
		  public boolean equals(Object o) {
		      if (this == o) return true;
		      if (o == null || getClass() != o.getClass()) return false;
		      CompositeExamQuestionId taskId1 = (CompositeExamQuestionId) o;
		      if (exam_id != taskId1.exam_id) return false;
		      return question_id == taskId1.question_id;
		  }

		  @Override
		  public int hashCode() {
		      return Objects.hash(exam_id, question_id);
		  }
}
