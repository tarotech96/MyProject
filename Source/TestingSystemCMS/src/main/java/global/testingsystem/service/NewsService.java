package global.testingsystem.service;

import java.util.List;

import global.testingsystem.entity.News;

public interface NewsService {
	List<Object> findPageNewsNews();
	List<Object> findAllPinnedNews();
	public List<News> searchAllNewsCMS(String keyword);
	/** 
	 * @author tgnghia 
	 * @created date Nov 15, 2018 
	 * @modified date Nov 15, 2018 
	 * @version 1.0 
	 * @description 
	 * @param title
	 * @param description
	 * @param content
	 * @param creator
	 * @param allTags
	 * @return
	 */
	public News addNews(String title, String description, String content, int creator, String allTags, String imgUrl);
	/** 
	 * @author tgnghia 
	 * @created date Nov 15, 2018 
	 * @modified date Nov 15, 2018 
	 * @version 1.0 
	 * @description 
	 * @param newsId
	 * @param title
	 * @param description
	 * @param content
	 * @param allTags
	 * @return
	 */
	public News updateNews(int newsId, String title, String description, String content, String allTags, String imgUrl, boolean activeStatus, String upStatus, boolean pinned);
	/** 
	 * @author tgnghia 
	 * @created date Nov 15, 2018
	 * @modified date Nov 15, 2018 
	 * @version 1.0 
	 * @description 
	 * @param id
	 * @return
	 */
	public News deleteNews(int id);
	/** 
	 * @author tgnghia 
	 * @created date Nov 15, 2018 
	 * @modified date Nov 15, 2018 
	 * @version 1.0 
	 * @description 
	 * @return
	 */
	public List<News> getAllNewsByOrderByNewsIdDesc();
	/** 
	 * @author tgnghia 
	 * @created date Nov 15, 2018 
	 * @modified date Nov 15, 2018 
	 * @version 1.0 
	 * @description 
	 * @param keyword
	 * @return
	 */
	public List<News> searchNews(String keyword);
	/** 
	 * @author tgnghia 
	 * @created date Nov 15, 2018 
	 * @modified date Nov 15, 2018 
	 * @version 1.0 
	 * @description 
	 * @param id
	 * @return
	 */
	public News findNewsById(int id);
	/** 
	 * @author tgnghia 
	 * @created date Nov 15, 2018 
	 * @modified date Nov 15, 2018 
	 * @version 1.0 
	 * @description 
	 * @param index
	 * @param typeSort
	 * @return
	 */
	public List<News> sortByProperty(int index,int typeSort,String keySearch);
	
	/** 
	 * @author tgnghia 
	 * @created date Nov 15, 2018 
	 * @modified date Nov 15, 2018 
	 * @version 1.0 
	 * @description 
	 * @param newsId
	 * @return
	 */
	public boolean pinNews(int newsId);
	// MR DUC thêm ngày 13.01.2018 ** START **
	public void updateNewActiveStatus(int status,int news_id);
	// MR DUC thêm ngày 13.01.2018 ** END **
}
