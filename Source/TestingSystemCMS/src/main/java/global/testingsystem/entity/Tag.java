/**
 * 
 */
package global.testingsystem.entity;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * @author User
 *
 */
@Entity
@Table(name = "tags")
public class Tag {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id")
	private int tagId;

	@Column(name = "name")
	private String tagName;
	
	@JsonIgnore
	@ManyToMany(fetch = FetchType.LAZY, cascade = { CascadeType.PERSIST, CascadeType.MERGE }, mappedBy = "tags")
	private List<News> news = new ArrayList<>();

	/**
	 * 
	 */
	public Tag() {
		super();
	}

	/** 
	 * @author tgnghia 
	 * @created date Nov 15, 2018 
	 * @modified date Nov 15, 2018 
	 * @version 1.0 
	 * @description 
	 * @return
	 */
	public List<News> getNews() {
		return news;
	}

	/** 
	 * @author tgnghia 
	 * @created date Nov 15, 2018 
	 * @modified date Nov 15, 2018 
	 * @version 1.0 
	 * @description 
	 * @param news
	 */
	public void setNews(List<News> news) {
		this.news = news;
	}

	/** 
	 * @author tgnghia 
	 * @created date Nov 15, 2018 
	 * @modified date Nov 15, 2018 
	 * @version 1.0 
	 * @description 
	 * @param news
	 */
	public void addNews(News news) {
		this.news.add(news);
	}

	/** 
	 * @author tgnghia 
	 * @created date Nov 15, 2018 
	 * @modified date Nov 15, 2018 
	 * @version 1.0 
	 * @description 
	 * @return
	 */
	public int getTagId() {
		return tagId;
	}

	/** 
	 * @author tgnghia 
	 * @created date Nov 15, 2018 
	 * @modified date Nov 15, 2018 
	 * @version 1.0 
	 * @description 
	 * @param tagId
	 */
	public void setTagId(int tagId) {
		this.tagId = tagId;
	}

	/** 
	 * @author tgnghia 
	 * @created date Nov 15, 2018 
	 * @modified date Nov 15, 2018 
	 * @version 1.0 
	 * @description 
	 * @return
	 */
	public String getTagName() {
		return tagName;
	}

	/** 
	 * @author tgnghia 
	 * @created date Nov 15, 2018 
	 * @modified date Nov 15, 2018 
	 * @version 1.0 
	 * @description 
	 * @param tagName
	 */
	public void setTagName(String tagName) {
		this.tagName = tagName;
	}

}
