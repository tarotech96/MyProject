package global.testingsystem.util;

import java.io.Serializable;

public class CompositeExamSettingId implements Serializable {
    private int exam_id;
    private int domain_id;
    private int chapter_id;
	public CompositeExamSettingId(int exam_id, int domain_id, int chapter_id) {
		super();
		this.exam_id = exam_id;
		this.domain_id = domain_id;
		this.chapter_id = chapter_id;
	}
	public CompositeExamSettingId() {
		super();
		// TODO Auto-generated constructor stub
	}
	
}
