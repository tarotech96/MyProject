package global.testingsystem.util;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class ExamSettingDto {
	private int chapter_id;
	private String chapterName;
	private int domain_id;
	private String domainName;
	private int questionNum;

	public ExamSettingDto() {
		super();
		// TODO Auto-generated constructor stub
	}

	public ExamSettingDto(int chapter_id, String chapterName, int domain_id, String domainName, int questionNum) {
		super();
		this.chapter_id = chapter_id;
		this.chapterName = chapterName;
		this.domain_id = domain_id;
		this.domainName = domainName;
		this.questionNum = questionNum;
	}
	@JsonProperty
	public int getChapter_id() {
		return chapter_id;
	}

	public void setChapter_id(int chapter_id) {
		this.chapter_id = chapter_id;
	}
	@JsonProperty
	public String getChapterName() {
		return chapterName;
	}

	public void setChapterName(String chapterName) {
		this.chapterName = chapterName;
	}
	@JsonProperty
	public int getDomain_id() {
		return domain_id;
	}

	public void setDomain_id(int domain_id) {
		this.domain_id = domain_id;
	}
	@JsonProperty
	public String getDomainName() {
		return domainName;
	}

	public void setDomainName(String domainName) {
		this.domainName = domainName;
	}
	@JsonProperty
	public int getQuestionNum() {
		return questionNum;
	}

	public void setQuestionNum(int questionNum) {
		this.questionNum = questionNum;
	}
}
