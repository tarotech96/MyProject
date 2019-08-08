package global.testingsystem.util;

import java.io.Serializable;
import java.util.Objects;

public class CompositeExamAnswerId implements Serializable{
	private static final long serialVersionUID = 1L;
		private int result_id;
	    private int question_id;
	    
	    
		public CompositeExamAnswerId() {
		}

		public CompositeExamAnswerId(int result_id, int question_id) {
			this.result_id = result_id;
			this.question_id = question_id;
		}

		@Override
		  public boolean equals(Object o) {
		      if (this == o) return true;
		      if (o == null || getClass() != o.getClass()) return false;
		      CompositeExamAnswerId taskId1 = (CompositeExamAnswerId) o;
		      if (result_id != taskId1.result_id) return false;
		      return question_id == taskId1.question_id;
		  }

		  @Override
		  public int hashCode() {
		      return Objects.hash(result_id, question_id);
		  }
}
