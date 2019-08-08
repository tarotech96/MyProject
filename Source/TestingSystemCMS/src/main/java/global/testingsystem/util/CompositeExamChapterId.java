package global.testingsystem.util;

import java.io.Serializable;
import java.util.Objects;

public class CompositeExamChapterId implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int exam_id;
    private int chapter_id;
    
	public CompositeExamChapterId() {
		super();
		// TODO Auto-generated constructor stub
	}

	public CompositeExamChapterId(int exam_id, int chapter_id) {
		super();
		this.exam_id = exam_id;
		this.chapter_id = chapter_id;
	}

	@Override
	  public boolean equals(Object o) {
	      if (this == o) return true;
	      if (o == null || getClass() != o.getClass()) return false;
	      CompositeExamChapterId taskId1 = (CompositeExamChapterId) o;
	      if (exam_id != taskId1.exam_id) return false;
	      return chapter_id == taskId1.chapter_id;
	  }

	  @Override
	  public int hashCode() {
	      return Objects.hash(exam_id, chapter_id);
	  }
}
