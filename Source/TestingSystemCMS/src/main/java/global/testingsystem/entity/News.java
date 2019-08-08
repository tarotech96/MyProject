/**
 * 
 */
package global.testingsystem.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.json.JSONObject;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * @author User
 *
 */
@Entity
@Table(name = "news")
public class News {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id")
	private int newsId;

	@Column(name = "title", columnDefinition = "NTEXT")
	private String title;

	@Column(name = "theDescription",columnDefinition = "NTEXT")
	private String description;

	@Column(name = "content", columnDefinition = "NTEXT")
	private String content;

	@Column(name = "createDate", columnDefinition = "DateTime")
	private Date createDate;

	@Column(name = "confirmDate",columnDefinition = "DateTime")
	private Date confirmDate;

	@Column(name = "pinned", columnDefinition = "INT(11) default 0")
	private boolean pinned;

	@Column(name = "activeStatus", columnDefinition = "INT(11) default 1")
	private boolean active;

	@Column(name = "upStatus",columnDefinition = "VARCHAR(255) default 'pending'")
	private String upStatus;
	
	@Column(name = "imgUrl", columnDefinition = "NTEXT")
	private String imgUrl;

	@ManyToMany(fetch = FetchType.LAZY, cascade = { CascadeType.PERSIST, CascadeType.MERGE })
	@JoinTable(name = "news_tags", joinColumns = { @JoinColumn(name = "newsid") }, inverseJoinColumns = {
			@JoinColumn(name = "tagsid") })
	private List<Tag> tags = new ArrayList<>();

	//Mr Duc
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name="creator", referencedColumnName = "id")
	private Users users_creator;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name="confirmLeader", referencedColumnName = "id")
	private Users users_confirm;
	
		
	//Mr Duc



	public Users getUsers_creator() {
		return users_creator;
	}


	public void setUsers_creator(Users users_creator) {
		this.users_creator = users_creator;
	}


	public Users getUsers_confirm() {
		return users_confirm;
	}


	public void setUsers_confirm(Users users_confirm) {
		this.users_confirm = users_confirm;
	}


	public List<Tag> getTags() {
		return tags;
	}


	public void setTags(List<Tag> tags) {
		this.tags = tags;
	}

	public void addTags(Tag tag) {
		this.tags.add(tag);
		tag.addNews(this);
	}

	public News() {
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
	public int getNewsId() {
		return newsId;
	}

	/** 
	 * @author tgnghia 
	 * @created date Nov 15, 2018 
	 * @modified date Nov 15, 2018 
	 * @version 1.0 
	 * @description 
	 * @param newsId
	 */
	public void setNewsId(int newsId) {
		this.newsId = newsId;
	}

	/** 
	 * @author tgnghia 
	 * @created date Nov 15, 2018 
	 * @modified date Nov 15, 2018 
	 * @version 1.0 
	 * @description 
	 * @return
	 */
	public String getTitle() {
		return title;
	}

	/** 
	 * @author tgnghia 
	 * @created date Nov 15, 2018 
	 * @modified date Nov 15, 2018 
	 * @version 1.0 
	 * @description 
	 * @param title
	 */
	public void setTitle(String title) {
		this.title = title;
	}

	/** 
	 * @author tgnghia 
	 * @created date Nov 15, 2018 
	 * @modified date Nov 15, 2018 
	 * @version 1.0 
	 * @description 
	 * @return
	 */
	public String getDescription() {
		return description;
	}

	/** 
	 * @author tgnghia 
	 * @created date Nov 15, 2018 
	 * @modified date Nov 15, 2018 
	 * @version 1.0 
	 * @description 
	 * @param description
	 */
	public void setDescription(String description) {
		this.description = description;
	}

	/** 
	 * @author tgnghia 
	 * @created date Nov 15, 2018 
	 * @modified date Nov 15, 2018 
	 * @version 1.0 
	 * @description 
	 * @return
	 */
	public String getContent() {
		return content;
	}

	/** 
	 * @author tgnghia 
	 * @created date Nov 15, 2018 
	 * @modified date Nov 15, 2018 
	 * @version 1.0 
	 * @description 
	 * @param content
	 */
	public void setContent(String content) {
		this.content = content;
	}

	/** 
	 * @author tgnghia 
	 * @created date Nov 15, 2018 
	 * @modified date Nov 15, 2018 
	 * @version 1.0 
	 * @description 
	 * @return
	 */
	public Date getCreateDate() {
		return createDate;
	}

	/** 
	 * @author tgnghia 
	 * @created date Nov 15, 2018 
	 * @modified date Nov 15, 2018 
	 * @version 1.0 
	 * @description 
	 * @param createDate
	 */
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	/** 
	 * @author tgnghia 
	 * @created date Nov 15, 2018 
	 * @modified date Nov 15, 2018 
	 * @version 1.0 
	 * @description 
	 * @return
	 */
	public Date getConfirmDate() {
		return confirmDate;
	}

	/** 
	 * @author tgnghia 
	 * @created date Nov 15, 2018 
	 * @modified date Nov 15, 2018 
	 * @version 1.0 
	 * @description 
	 * @param confirmDate
	 */
	public void setConfirmDate(Date confirmDate) {
		this.confirmDate = confirmDate;
	}

	/** 
	 * @author tgnghia 
	 * @created date Nov 15, 2018 
	 * @modified date Nov 15, 2018 
	 * @version 1.0 
	 * @description 
	 * @return
	 */
	public boolean isPinned() {
		return pinned;
	}

	/** 
	 * @author tgnghia 
	 * @created date Nov 15, 2018 
	 * @modified date Nov 15, 2018 
	 * @version 1.0 
	 * @description 
	 * @param pinned
	 */
	public void setPinned(boolean pinned) {
		this.pinned = pinned;
	}

	/** 
	 * @author tgnghia 
	 * @created date Nov 15, 2018 
	 * @modified date Nov 15, 2018 
	 * @version 1.0 
	 * @description 
	 * @return
	 */
	public boolean isActive() {
		return active;
	}

	/** 
	 * @author tgnghia 
	 * @created date Nov 15, 2018 
	 * @modified date Nov 15, 2018 
	 * @version 1.0 
	 * @description 
	 * @param active
	 */
	public void setActive(boolean active) {
		this.active = active;
	}

	/** 
	 * @author tgnghia 
	 * @created date Nov 15, 2018 
	 * @modified date Nov 15, 2018 
	 * @version 1.0 
	 * @description 
	 * @return
	 */
	public String getUpStatus() {
		return upStatus;
	}
	
	/** 
	 * @author tgnghia 
	 * @created date Nov 15, 2018 
	 * @modified date Nov 15, 2018 
	 * @version 1.0 
	 * @description 
	 * @param upStatus
	 */
	public void setUpStatus(String upStatus) {
		this.upStatus = upStatus;
	}
	


	/** 
	 * @author tgnghia 
	 * @created date Nov 15, 2018 
	 * @modified date Nov 15, 2018 
	 * @version 1.0 
	 * @description 
	 * @return
	 */
	public String getImgUrl() {
		return imgUrl;
	}

	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}

	/** 
	 * @author tgnghia 
	 * @created date Nov 15, 2018 
	 * @modified date Nov 15, 2018 
	 * @version 1.0 
	 * @description 
	 * @return
	 */
	public JSONObject convertToJson() {
		JSONObject obj = new JSONObject();
		obj.put("id", newsId + "");
		obj.put("title", title + "");
		obj.put("description", description + "");
		obj.put("content", content + "");
		obj.put("createDate", createDate + "");
		obj.put("confirmDate", (null != confirmDate ? confirmDate : "") + "");
		obj.put("pinned", pinned + "");
		obj.put("upStatus", upStatus + "");
		obj.put("activeStatus", active + "");
		obj.put("creator", (null != users_creator ? users_creator.getFullname() : "") + "");
		obj.put("confirmLeader", (null != users_confirm ? users_confirm.getFullname() : "") + "");
		obj.put("linkimage",imgUrl+"" );
		StringBuilder tags = new StringBuilder();
		for(Tag t : this.getTags()) {
			tags.append(t.getTagName()).append(",");
		}
		if(tags.length() > 0) {
			tags.setLength(tags.length()-1);
		}
		obj.put("tags",tags.toString());
		return obj;
	}

}
