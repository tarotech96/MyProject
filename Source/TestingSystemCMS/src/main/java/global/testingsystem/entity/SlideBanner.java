package global.testingsystem.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * @author tiepnv
 *
 */
@Entity
@Table(name="SlideBar")
public class SlideBanner {
	@Id
	@Column(name = "Id")
	@GeneratedValue(strategy =GenerationType.IDENTITY)
	private int id;
	
	@Column(name = "Img",nullable=false, length=225,columnDefinition = "NVARCHAR(225)")
	private String img;
	
	@Column(name = "Slogan",nullable=false, length=260, columnDefinition = "NVARCHAR(260)")
	private String slogan;
	
	@Column(name = "Title",nullable=false, length=60, columnDefinition = "NVARCHAR(60)")
	private String title;
	
	@Column(name = "IsShow")
	private boolean show;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getImg() {
		return img;
	}

	public void setImg(String img) {
		this.img = img;
	}

	public String getSlogan() {
		return slogan;
	}

	public void setSlogan(String slogan) {
		this.slogan = slogan;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public boolean isShow() {
		return show;
	}

	public void setShow(boolean show) {
		this.show = show;
	}

    /**
     * @param img
     * @param slogan
     * @param title
     * @param isShow
     */
    public SlideBanner( String title,String img, String slogan, boolean show) {
        super();
        this.img = img;
        this.slogan = slogan;
        this.title = title;
        this.show = show;
    }

    /**
     * @param id
     * @param img
     * @param slogan
     * @param title
     * @param isShow
     */
    public SlideBanner(int id, String img, String slogan, String title, boolean show) {
        super();
        this.id = id;
        this.img = img;
        this.slogan = slogan;
        this.title = title;
        this.show = show;
    }

    /**
     * @param id
     * @param img
     * @param slogan
     * @param title
     */
    public SlideBanner(int id, String title, String img, String slogan) {
        super();
        this.id = id;
        this.img = img;
        this.slogan = slogan;
        this.title = title;
    }

    /**
     * 
     */
    public SlideBanner() {
        super();
    }
	
	
}
